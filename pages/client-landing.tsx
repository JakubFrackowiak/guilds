import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Container, Box } from "@mui/material"
import { FAQs } from "components/FAQs"
import { GetItDone } from "components/GetItDone"
import { BusinessHeroes } from "components/BusinessHeroes"
import FeaturedCompanies from "components/FeaturedCompanies"
import { HirerHeading } from "components/HirerHeading"
import { Slider } from "components/Slider"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { collection } from "firebase/firestore"

export default function Home() {
  const firestore = useFirestore()
  const heroesRef = collection(firestore, "heroes")
  const { data: hero } = useFirestoreCollectionData(heroesRef)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Container>
        <Box mt="2rem">
          <HirerHeading />
        </Box>
        <Box my="10rem">
          <FeaturedCompanies />
        </Box>
        <Box marginY="10rem">
          <BusinessHeroes />
        </Box>
        <Box marginY="10rem">
          <Slider
            variant="hero"
            status={"success"}
            items={hero}
            variantId={""}
          />
        </Box>
      </Container>
      <Box bgcolor="primary.dark">
        <GetItDone />
      </Box>
      <Container>
        <Box my="10rem">
          <FAQs />
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}
