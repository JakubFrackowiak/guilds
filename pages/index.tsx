import { Header } from "../components/Header"
import { Container, Box } from "@mui/material"
import { Footer } from "../components/Footer"
import { useState } from "react"
import { ApprenticesModal } from "components/ApprenticesModal"

export default function Home() {
  const [modalOpen, setModalOpen] = useState(true)

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
        <ApprenticesModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </Container>
      <Footer />
    </Box>
  )
}
