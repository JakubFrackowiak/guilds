import { Container, Box } from "@mui/material"

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { ForgotPassword } from "components/ForgotPassword"

export default function ForgotPasswordPage() {
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
        <ForgotPassword />
      </Container>
      <Footer />
    </Box>
  )
}
