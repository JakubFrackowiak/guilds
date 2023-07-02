import { Container, Box } from "@mui/material"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { UnderMaintenance } from "components/UnderMaintenance"
import { useFirestore, useFirestoreDocData, useUser } from "reactfire"
import { SideNav } from "components/SideNav"
import { doc } from "firebase/firestore"
import { Hero } from "types/hero"

export default function Login() {
  const { data: user } = useUser()
  const firestore = useFirestore()
  const heroRef = doc(firestore, `heroes/${user?.uid}` || "")
  const { data: hero } = useFirestoreDocData(heroRef)
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {user ? <SideNav hero={hero as Hero} /> : <Header />}
      <Container sx={{ mt: "3rem", mb: "15rem" }}>
        <UnderMaintenance />
      </Container>
      <Footer />
    </Box>
  )
}
