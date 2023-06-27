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
} from "@mui/material"
import { StorageImage } from "reactfire"
import { SecondaryButton } from "../SecondaryButton"
import { Star } from "@mui/icons-material"
import { Hero } from "types/hero"
import { withStyles } from "@material-ui/core"

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

interface FeaturedApprenticeProps {
  apprentice: Hero
  selectedApprentice: string
  setSelectedApprentice: (value: string) => void
}

export function FeaturedApprentice({
  apprentice,
  selectedApprentice,
  setSelectedApprentice,
}: FeaturedApprenticeProps) {
  return (
    <TableRow sx={{ bgcolor: "background.default" }}>
      <ApprenticeTableCell sx={{ paddingLeft: "3rem" }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ProfilePicture
            storagePath={`general/${apprentice?.profilePicture}`}
            alt="profile picute"
          />
          <Stack justifyContent="space-between" height="3rem">
            <Typography variant="body2" noWrap>
              {apprentice?.name.first + " " + apprentice?.name.last}
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
          {lookup.byCountry(apprentice?.location.country)?.fips}
        </Typography>
      </ApprenticeTableCell>
      <ApprenticeTableCell>
        <Chip
          sx={{ bgcolor: "primary.light" }}
          label={
            <Typography color="primary.main" variant="body2">
              Level {apprentice?.level}
            </Typography>
          }
        />
      </ApprenticeTableCell>
      <ApprenticeTableCell>
        <Typography variant="body2">
          {100 * apprentice?.apprentice.rate + "%"}
        </Typography>
      </ApprenticeTableCell>
      <ApprenticeTableCell>
        <Typography variant="body2" whiteSpace="nowrap">
          {apprentice?.apprentice.workingHours.start +
            " - " +
            apprentice?.apprentice.workingHours.end}
        </Typography>
      </ApprenticeTableCell>
      <ApprenticeTableCell>
        <Rating
          readOnly
          value={apprentice?.rating}
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
          <SecondaryButton
            onClick={() =>
              selectedApprentice == apprentice?.id
                ? setSelectedApprentice(null)
                : setSelectedApprentice(apprentice?.id)
            }
            label={selectedApprentice == apprentice?.id ? "Unselect" : "Select"}
            width="6rem"
          />
        </Stack>
      </ApprenticeTableCell>
    </TableRow>
  )
}
