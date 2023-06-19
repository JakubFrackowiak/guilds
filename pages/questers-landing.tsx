import { NoSsr } from "@mui/material"
import FeaturedCompanies from "components/FeaturedCompanies"
import { Box, Container } from "@mui/material"
import { FAQs } from "components/FAQs"
import { collection } from "firebase/firestore"
import { Footer } from "components/Footer"
import { Header } from "components/Header"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { Slider } from "components/Slider"
import { GuildsStats } from "components/GuildsStats"
import { HeroHeader } from "components/HeroHeader"

export default function QuestersLanding() {
  const firestore = useFirestore()
  const questsRef = collection(firestore, "quests")
  const { data: quests } = useFirestoreCollectionData(questsRef, {
    idField: "id",
  })
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <NoSsr>
        <Container>
          <Box marginTop="5rem">
            <HeroHeader />
          </Box>
          <Box marginY="5rem">
            <FeaturedCompanies />
          </Box>
          <Box marginY="10rem">
            <GuildsStats />
          </Box>
          <Box>
            <Slider
              variant="quest"
              status="success"
              items={quests}
              variantId=""
            />
          </Box>
          <Box marginTop="10rem">
            <FAQs />
          </Box>
        </Container>
      </NoSsr>
      <Footer />
    </Box>
  )
}
