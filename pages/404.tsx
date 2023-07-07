import { Container, Box } from "@mui/material"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { UnderMaintenance } from "components/UnderMaintenance"
import { useUser } from "reactfire"
import { SideNav } from "components/SideNav"

export default function Login() {
  const { data: user } = useUser()

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {user ? <SideNav /> : <Header />}
      <Container sx={{ mt: "3rem", mb: "15rem" }}>
        <UnderMaintenance />
      </Container>
      <Footer />
    </Box>
  )
}
