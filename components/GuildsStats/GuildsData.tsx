import { Stack, Typography, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"

interface GuildsDataProps {
  value: number | string
  caption: string
}

export function GuildsData({ value, caption }: GuildsDataProps) {
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
