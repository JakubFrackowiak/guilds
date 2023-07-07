import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Container, Box } from "@mui/material"
import { FAQs } from "components/FAQs"
import { GetItDone } from "components/GetItDone"
import { BusinessHeroes } from "components/BusinessHeroes"
import FeaturedCompanies from "components/FeaturedCompanies"
import { HirerHeading } from "components/HirerHeading"
import { Slider } from "components/Slider"
import { useUser, useFirestore, useFirestoreCollectionData } from "reactfire"
import { collection, query, where } from "firebase/firestore"
import { SideNav } from "components/SideNav"

export default function Home() {
  const firestore = useFirestore()
  const { data: user } = useUser()
  const heroesRef = collection(firestore, "heroes")
  const heroesQuery = query(heroesRef, where("isVerified", "==", true))
  const { data: heroes } = useFirestoreCollectionData(heroesQuery)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {user ? <SideNav /> : <Header />}
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
            items={heroes}
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
