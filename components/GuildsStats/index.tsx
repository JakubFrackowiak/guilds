import Image from "next/image"
import { Divider, Stack, Typography, useMediaQuery } from "@mui/material"
import { collection } from "firebase/firestore"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { Container } from "@mui/system"
import { GuildsData } from "./GuildsData"
import { useTheme } from "@mui/material/styles"

export function GuildsStats() {
  const firestore = useFirestore()
  const heroesRef = collection(firestore, "heroes")
  const { data: heroes } = useFirestoreCollectionData(heroesRef)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Stack
      alignItems="center"
      justifyContent="space-around"
      spacing={7}
      width="100%"
    >
      <Stack alignItems="center" spacing={2}>
        <Image
          src="/guilds-logo-pastel.svg"
          width={56}
          height={56}
          alt="Guilds Logo Pastel"
        />
        <Typography variant="h4">Guilds history</Typography>
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          We've made quite the statement
        </Typography>
      </Stack>
      <Container maxWidth="md">
        <Stack
          alignItems="center"
          direction={isMobile ? "column" : "row"}
          justifyContent="space-around"
          width="100%"
          spacing={isMobile ? 3 : 0}
        >
          <GuildsData
            value={heroes?.length.toLocaleString()}
            caption={"Heroes"}
          />
          <Divider orientation="vertical" flexItem />
          <GuildsData value="£384,158" caption={"Earned by Heroes"} />
          <Divider orientation="vertical" flexItem />
          <GuildsData value="892,241" caption={"Quests completed"} />
        </Stack>
      </Container>
    </Stack>
  )
}
// lines 33 and 35 hardcoded for now
