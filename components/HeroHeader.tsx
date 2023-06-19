import Image from "next/image"
import styled from "@emotion/styled"
import { Box, Typography, Stack, Rating } from "@mui/material"
import {
  StorageImage,
  useFirestore,
  useFirestoreCollectionData,
} from "reactfire"
import { collection, limit, query } from "firebase/firestore"
import { Hero } from "types/hero"

const UserAvatar = styled(StorageImage)`
  width: 40px;
  height: 40px;
  border: 2.5px solid #ffffff;
  border-radius: 200px;
  margin: 0px -7px;
  object-fit: cover;
`

export function HeroHeader() {
  const firestore = useFirestore()
  const heroesRef = collection(firestore, "heroes")
  const heroesQuery = query(heroesRef, limit(6))
  const { data: heroes } = useFirestoreCollectionData(heroesQuery)

  return (
    <Stack
      direction={{ xs: "column", sm: "column", md: "row" }}
      spacing={{ xs: 8, sm: 8, md: 0 }}
    >
      <Stack alignItems={{ md: "flex-start", sm: "center", xs: "center" }}>
        <Stack width={{ sm: "90%", xs: "90%" }}>
          <Typography variant="h3" color="text.primary">
            Complete quests and rise through the ranks
          </Typography>
          <Typography width={{ md: "80%" }} variant="h5" sx={{ my: 2 }}>
            One-off jobs hosted by companies in need of a helping hand. Level up
            your experience by completing taks and earn income.
          </Typography>
          <Stack direction="row" spacing={{ xs: 2 }}>
            <Stack direction="row">
              {heroes?.map((hero: Hero, idx) => (
                <UserAvatar
                  key={hero.id}
                  alt="hero image"
                  storagePath={`general/${heroes[idx].profilePicture}`}
                />
              ))}
            </Stack>
            <Stack direction="column">
              <Stack direction="row">
                <Rating value={5} readOnly />
                <Typography variant="body1">5.0</Typography>
              </Stack>
              <Typography variant="body1" color="text.secondary">
                from 200+ reviews
              </Typography>
            </Stack>
          </Stack>
          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "none", lg: "block" },
              position: "relative",
              top: -100,
              left: 350,
            }}
          >
            <Image
              alt="header arrow"
              src="/HeaderArrow.svg"
              width={380}
              height={300}
            />
          </Box>
        </Stack>
      </Stack>
      <Stack alignItems="center">
        <Stack alignItems={{ xs: "center", sm: "end", md: "end" }}>
          <Image alt="header arrow" src="/login.svg" width={440} height={550} />
        </Stack>
      </Stack>
    </Stack>
  )
}
