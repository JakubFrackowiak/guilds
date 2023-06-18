import Link from "next/link"
import { Stack, Typography } from "@mui/material"
import { PrimaryButton } from "components/PrimaryButton"
import { SecondaryButton } from "components/SecondaryButton"

export function BackToSearch() {
  return (
    <Stack
      height="12rem"
      bgcolor="primary.main"
      borderRadius="1.5rem"
      justifyContent="center"
      px="5rem"
      sx={{ my: 15 }}
      spacing={1}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" color="background.default" fontWeight={500}>
          Go back to search
        </Typography>
        <Stack direction="row" spacing={1.5}>
          <Link href="quests" style={{ textDecoration: "none" }}>
            <SecondaryButton label="View all quests" />
          </Link>
          <Link href="search-quest" style={{ textDecoration: "none" }}>
            <PrimaryButton label="" />
          </Link>
        </Stack>
      </Stack>
      <Typography variant="body1" color="primary.light">
        Not quite your thing? Go back to your search results
      </Typography>
    </Stack>
  )
}
