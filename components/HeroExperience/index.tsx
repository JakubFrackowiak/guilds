import { MoreVert } from "@mui/icons-material"
import { Divider, IconButton, Stack, Typography } from "@mui/material"

export function HeroExperience() {
  return (
    <Stack position="relative">
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant="h6">Experience</Typography>
          <Typography
            variant="body1"
            color={(theme) => theme.palette.grey[600]}
          >
            I specialise in UX/UI design, brand strategy, and Webflow
            development.
          </Typography>
        </Stack>
        <Divider />
      </Stack>
      <IconButton sx={{ position: "absolute", top: 0, right: 0 }}>
        <MoreVert />
      </IconButton>
    </Stack>
  )
}
