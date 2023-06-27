import Link from "next/link"
import { Stack, Typography } from "@mui/material"
import { PrimaryButton } from "components/PrimaryButton"
import { SecondaryButton } from "components/SecondaryButton"

export function BackToSearch() {
  return (
    <Stack
      direction={{ xs: "column", sm: "column", md: "row" }}
      py="4rem"
      height="fit-content"
      bgcolor="primary.dark"
      borderRadius="1.5rem"
      justifyContent="space-around"
      alignItems={{ xs: "center", sm: "center", md: "top" }}
      spacing={3}
    >
      <Stack
        spacing={2}
        textAlign={{ xs: "center", sm: "center", md: "start" }}
      >
        <Typography variant="h4" color="primary.light" fontWeight={500} noWrap>
          Go back to search
        </Typography>
        <Typography variant="body1" color="primary.light">
          Not quite your thing? Go back to your search results
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1.5} justifyContent="flex-start">
        <Link href="quests" style={{ textDecoration: "none" }}>
          <SecondaryButton label="View all quests" />
        </Link>
        <Link href="search-quest" style={{ textDecoration: "none" }}>
          <PrimaryButton width="fit-content" label="Go back to search" />
        </Link>
      </Stack>
    </Stack>
  )
}
