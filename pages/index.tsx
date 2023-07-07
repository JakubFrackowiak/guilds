import { Alert, AlertProps, NoSsr, Snackbar } from "@mui/material"
import FeaturedCompanies from "components/FeaturedCompanies"
import { Box, Container } from "@mui/material"
import { FAQs } from "components/FAQs"
import { collection, query, where } from "firebase/firestore"
import { Footer } from "components/Footer"
import { Header } from "components/Header"
import {
  useAuth,
  useFirestore,
  useFirestoreCollectionData,
  useUser,
} from "reactfire"
import { Slider } from "components/Slider"
import { HeroHeader } from "components/HeroHeader"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { applyActionCode } from "firebase/auth"
import { SideNav } from "components/SideNav"
import { LancrStats } from "components/LancrStats"

export default function index() {
  const [toast, setToast] = useState({
    severity: "success",
    message: "",
    open: false,
  })
  const firestore = useFirestore()
  const router = useRouter()
  const { mode, oobCode } = router.query
  const questsRef = collection(firestore, "quests")
  const { data: quests } = useFirestoreCollectionData(questsRef, {
    idField: "id",
  })
  const heroesRef = collection(firestore, "heroes")
  const heroesQuery = query(heroesRef, where("isVerified", "==", true))
  const { data: heroes } = useFirestoreCollectionData(heroesQuery)
  const teamsRef = collection(firestore, "teams")
  const { data: teams } = useFirestoreCollectionData(teamsRef)
  const auth = useAuth()
  const { data: user } = useUser()

  const verifyEmail = async () => {
    try {
      await applyActionCode(auth, oobCode as string)
      setToast({
        severity: "success",
        message: "Email verified! Log in to explore!",
        open: true,
      })
    } catch (error) {
      setToast({
        severity: "error",
        message: "Error verifying email!",
        open: true,
      })
    }
  }

  useEffect(() => {
    if (mode == "verifyEmail") {
      verifyEmail()
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
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={toast.severity as AlertProps["severity"]}>
          {toast.message}
        </Alert>
      </Snackbar>
      {user ? <SideNav /> : <Header />}
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
