import { Chip, Stack, Typography } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export function NewFeatureChip() {
  return (
    <Chip
      size="medium"
      sx={{
        bgcolor: "primary.light",
        width: "fit-content",
      }}
      icon={
        <Chip
          size="small"
          sx={{ bgcolor: "white" }}
          label={<Typography color="primary.main">New feature</Typography>}
        />
      }
      label={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography color="primary">Check the team dashboard</Typography>
          <ArrowForwardIcon
            width={13}
            height={13}
            sx={{
              color: "primary.main",
            }}
          />
        </Stack>
      }
    />
  )
}
