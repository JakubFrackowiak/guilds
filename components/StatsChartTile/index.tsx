import { Box, Stack, Typography } from "@mui/material"
import { StatsChart, StatsChartProps } from "./StatsChart"

interface StatsChartTileProps extends StatsChartProps {
  heading: string
  subheading?: string
  info?: string
  pr?: string
}

export function StatsChartTile({
  percentage,
  heading,
  subheading,
  info,
  pr = "1.5rem",
}: StatsChartTileProps) {
  return (
    <Stack
      py="1.5rem"
      pl="1.5rem"
      pr={pr}
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "fit-content",
        height: "100%",
        border: "1px solid",
        borderColor: (theme) => theme.palette.grey[200],
        borderRadius: "0.5rem",
        boxShadow: "0px 1px 3px 0px #1018281A",
      }}
    >
      <Stack direction="row" spacing={3}>
        <StatsChart percentage={percentage} />
        <Stack>
          <Box height="33%" justifyContent="top">
            <Typography variant="h6">{heading}</Typography>
          </Box>
          <Box height="33%" pt="0.9rem">
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{
                color: (theme) => theme.palette.grey[700],
              }}
            >
              {subheading}
            </Typography>
          </Box>
          <Box height="33%">
            <Typography variant="h4" fontWeight={500}>
              {info}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}
