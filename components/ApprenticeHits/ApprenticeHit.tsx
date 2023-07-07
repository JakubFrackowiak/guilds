import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import Link from "next/link"
import lookup from "country-code-lookup"
import styled from "@emotion/styled"
import {
  Stack,
  Typography,
  Chip,
  Rating,
  TableRow,
  TableCell,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material"
import {
  StorageImage,
  useFirestore,
  useFirestoreDocData,
  useUser,
} from "reactfire"
import { SecondaryButton } from "../SecondaryButton"
import { Star } from "@mui/icons-material"
import { formatHour } from "formatters"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { heroesSearchClient } from "typesense/instantsearch"
import { withStyles } from "@material-ui/core"
import { useState } from "react"
import { Hero } from "types/hero"

const ProfilePicture = styled(StorageImage)({
  objectFit: "cover",
  height: 50,
  width: 50,
  borderRadius: "50%",
})

const ApprenticeTableCell = withStyles(() => ({
  root: {
    paddingTop: "0.8rem",
    paddingBottom: "0.8rem",
  },
}))(TableCell)

interface ApprenticeHitProps {
  hit: Hero
  selectedApprentice: string
  setSelectedApprentice: (value: string) => void
}

export function ApprenticeHit({
  hit,
  selectedApprentice,
  setSelectedApprentice,
}: ApprenticeHitProps) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  })
  const firestore = useFirestore()
  const { data: user } = useUser()
  const heroRef = doc(firestore, "heroes", hit.id)
  const { data: hero } = useFirestoreDocData(heroRef)

  async function toggleFavorite() {
    try {
      if (!hero.apprentice.favoriteTo?.includes(user.uid)) {
        await updateDoc(heroRef, {
          "apprentice.favoriteTo": arrayUnion(user.uid),
        })
        setSnackbar({
          open: true,
          message: "Apprentice added as favorite.",
          severity: "success",
        })
        heroesSearchClient.clearCache()
      }
      if (hero.apprentice.favoriteTo?.includes(user.uid)) {
        await updateDoc(heroRef, {
          "apprentice.favoriteTo": arrayRemove(user.uid),
        })
        setSnackbar({
          open: true,
          message: "Apprentice removed from favorites.",
          severity: "success",
        })
        heroesSearchClient.clearCache()
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Something went wrong.",
        severity: "error",
      })
    }
  }

  return (
    <TableRow sx={{ bgcolor: "background.default" }}>
      <ApprenticeTableCell sx={{ paddingLeft: "3rem" }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ProfilePicture
            storagePath={`general/${hit.profilePicture}`}
            alt="profile picute"
          />
          <Stack justifyContent="space-between" height="3rem">
            <Typography variant="body2" noWrap>
              {hit["name.first"] + " " + hit["name.last"]}
            </Typography>
            <Link
              href={"/"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography color="text.secondary" variant="body2">
                View profile
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </ApprenticeTableCell>
      <ApprenticeTableCell>
        <Typography variant="body2">
          {lookup.byCountry(hit["location.country"]).fips}
        </Typography>
      </ApprenticeTableCell>
      <ApprenticeTableCell>
        <Chip
          sx={{ bgcolor: "primary.light" }}
          label={
            <Typography color="primary.main" variant="body2">
              Level {hit.level}
            </Typography>
          }
        />
      </ApprenticeTableCell>
      <ApprenticeTableCell>
        <Typography variant="body2">
          {100 * hit["apprentice.rate"] + "%"}
        </Typography>
      </ApprenticeTableCell>
      <ApprenticeTableCell>
        <Typography variant="body2" whiteSpace="nowrap">
          {hit["apprentice.workingDays"]}
        </Typography>
      </ApprenticeTableCell>
      <ApprenticeTableCell>
        <Typography variant="body2" whiteSpace="nowrap">
          {formatHour(hit["apprentice.workingHours.start"]) +
            " - " +
            formatHour(hit["apprentice.workingHours.end"])}
        </Typography>
      </ApprenticeTableCell>
      <ApprenticeTableCell>
        <Rating
          readOnly
          value={hit.rating}
          precision={0.1}
          icon={<Star fontSize="inherit" color="primary" />}
        />
      </ApprenticeTableCell>
      <ApprenticeTableCell sx={{ paddingRight: "3rem" }}>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          spacing={1}
        >
          {hero?.apprentice.favoriteTo?.includes(user?.uid) ? (
            <FavoriteIcon onClick={() => toggleFavorite()} color="primary" />
          ) : (
            <FavoriteBorderIcon
              onClick={() => toggleFavorite()}
              color="primary"
            />
          )}

          <SecondaryButton
            onClick={() =>
              selectedApprentice == hit.id
                ? setSelectedApprentice(null)
                : setSelectedApprentice(hit.id)
            }
            label={selectedApprentice == hit.id ? "Unselect" : "Select"}
            width="6rem"
          />
        </Stack>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() =>
            setSnackbar({ open: false, message: "", severity: "" })
          }
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert severity={snackbar.severity as AlertColor}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </ApprenticeTableCell>
    </TableRow>
  )
}
