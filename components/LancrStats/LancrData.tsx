import { Stack, Typography, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"

interface LancrDataProps {
  value: number | string
  caption: string
}

export function LancrData({ value, caption }: LancrDataProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Stack spacing={isMobile ? -1 : 0} alignItems="center" width="calc(100%/3)">
      <Typography fontWeight={600} variant="h3" sx={{ color: "primary.main" }}>
        {value}
      </Typography>
      <Typography textAlign="center" variant="body1">
        {caption}
      </Typography>
    </Stack>
  )
}
