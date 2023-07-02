import { Container, Box } from "@mui/material"

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { VerifyPhoneNumber } from "components/VerifyPhoneNumber"

export default function VerifyPhonePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Container sx={{ mt: "3rem", mb: "15rem" }}>
        <VerifyPhoneNumber />
      </Container>
      <Footer />
    </Box>
  )
}
