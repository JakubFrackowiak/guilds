import { Container, Box } from "@mui/material"

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { ResetPassword } from "components/ResetPassword"

export default function ResetPasswordPage() {
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
        <ResetPassword />
      </Container>
      <Footer />
    </Box>
  )
}
