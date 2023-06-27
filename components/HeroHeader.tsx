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

import { SignIn } from "./SignIn"

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
      width="100%"
      spacing={{ xs: 5, sm: 5, md: -10 }}
    >
      <Stack justifyContent="center" alignItems="flex-start">
        <Typography variant="h1" color="text.primary">
          Complete quests and rise through the ranks
        </Typography>
        <Typography variant="h5" sx={{ my: 2 }} width="75%">
          One-off jobs hosted by companies in need of a helping hand. Level up
          your experience by completing taks and earn income.
        </Typography>
        <Stack direction="row" spacing={{ xs: 2 }} position="relative">
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
          <Box
            sx={{
              zIndex: 99,
              display: { xs: "none", sm: "none", md: "none", lg: "block" },
              position: "absolute",
              top: -100,
              left: 410,
            }}
          >
            <Image
              src="/HeaderArrow.svg"
              alt="arrow"
              width={290}
              height={240}
            />
          </Box>
        </Stack>
      </Stack>
      <Stack
        width="100%"
        py="1.5rem"
        borderRadius="1.5rem"
        bgcolor="background.paper"
        sx={{
          transform: { xs: "scale(1)", sm: "scale(1)", md: "scale(0.8)" },
          transformOrigin: { xs: "center", sm: "center", md: "right" },
        }}
      >
        <SignIn />
      </Stack>
    </Stack>
  )
}
