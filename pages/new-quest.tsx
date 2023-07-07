import { Box, Container } from "@mui/material"
import { FormStepper } from "components/FormStepper"
import { Header } from "components/Header"
import { SideNav } from "components/SideNav"
import React from "react"
import { useUser } from "reactfire"

export default function NewQuestPage() {
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
      <Container sx={{ pt: 10 }}>
        <FormStepper steps={[1, 2, 3, 4, 5]} activeStep={2} />
      </Container>
    </Box>
  )
}
