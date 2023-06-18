import Image from "next/image"
import { Stack, Container, Typography } from "@mui/material"
import { PrimaryButton } from "components/PrimaryButton"

export function StillHaveQuestions() {
  return (
    <Container
      sx={{ borderRadius: 3, backgroundColor: "background.paper", p: 3 }}
    >
      <Stack alignItems="center">
        <Image
          src="/rounded-face-pics.svg"
          alt="Rounded face pics"
          height={100}
          width={140}
        />
        <Typography variant="h6" sx={{ mb: 1 }}>
          Still have questions?
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 2, fontSize: "1rem" }}
        >
          Can't find the answers you're looking for? Please reach out to our
          friendly team.
        </Typography>
        <PrimaryButton width="fit-content" label="Get in touch" />
      </Stack>
    </Container>
  )
}
