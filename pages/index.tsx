import { NoSsr } from "@mui/material"
import FeaturedCompanies from "components/FeaturedCompanies"
import { Box, Container } from "@mui/material"
import { FAQs } from "components/FAQs"
import { collection, doc } from "firebase/firestore"
import { Footer } from "components/Footer"
import { Header } from "components/Header"
import {
  useAuth,
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
  useUser,
} from "reactfire"
import { Slider } from "components/Slider"
import { HeroHeader } from "components/HeroHeader"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import { SideNav } from "components/SideNav"
import { LancrStats } from "components/LancrStats"
import { Hero } from "types/hero"

export default function index() {
  const firestore = useFirestore()
  const router = useRouter()
  const { mode, oobCode } = router.query
  const questsRef = collection(firestore, "quests")
  const { data: quests } = useFirestoreCollectionData(questsRef, {
    idField: "id",
  })
  const heroesRef = collection(firestore, "heroes")
  const { data: heroes } = useFirestoreCollectionData(heroesRef)
  const teamsRef = collection(firestore, "teams")
  const { data: teams } = useFirestoreCollectionData(teamsRef)
  const auth = useAuth()
  const { data: user } = useUser()
  const heroRef = doc(firestore, `heroes/${user?.uid}` || "")
  const { data: hero } = useFirestoreDocData(heroRef)

  const verifyPhone = async () => {
    try {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn")
        if (!email) {
          email = window.prompt("Please provide your email for confirmation")
        }
        await signInWithEmailLink(auth, email, window.location.href)
        window.localStorage.removeItem("emailForSignIn")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (mode == "verifyPhone") {
      verifyPhone()
      router.push({
        pathname: "/find-quest",
        query: { oobCode: oobCode },
      })
    }
    if (mode == "resetPassword") {
      router.push({
        pathname: "/reset-password",
        query: { oobCode: oobCode },
      })
    }
  }, [mode])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {user ? <SideNav hero={hero as Hero} /> : <Header />}
      <NoSsr>
        <Container>
          <Box marginTop={{ xs: "2rem", sm: "2rem", md: "0rem" }}>
            <HeroHeader />
          </Box>
          <Box marginY="5rem">
            <FeaturedCompanies />
          </Box>
          <Box marginY="10rem">
            <LancrStats />
          </Box>
          <Box my="15rem">
            <Slider
              variant="quest"
              status="success"
              items={quests}
              variantId=""
            />
          </Box>
          <Box my="15rem">
            <Slider
              variant="hero"
              status="success"
              items={heroes}
              variantId=""
            />
          </Box>
          <Box my="15rem">
            <Slider
              variant="team"
              status="success"
              items={teams}
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
