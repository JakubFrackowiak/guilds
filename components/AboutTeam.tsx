import { Typography, Stack, useMediaQuery } from "@mui/material"
import { Team } from "types/team"
import { useTheme } from "@mui/material/styles"

interface AboutTeamProps {
  team: Team
}

export function AboutTeam({ team }: AboutTeamProps) {
  const theme = useTheme()
  const isMedium = useMediaQuery(theme.breakpoints.down("lg"))

  return (
    <Stack spacing={4} alignItems="start" id="about-section">
      <Stack spacing={3} p={isMedium ? "1.5rem" : "0"}>
        <Stack spacing={1}>
          <Typography variant="body1" fontWeight={600} color="primary.main">
            Industry: {team.industry}
          </Typography>
          <Typography variant="h3" maxWidth="sm">
            About {team.title}
          </Typography>
        </Stack>
      </Stack>
      <Typography
        variant="body1"
        color="text.secondary"
        lineHeight="1.8rem"
        p={isMedium ? "1.5rem" : "0"}
        sx={{
          columnCount: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 },
          columnGap: 4,
          columnWidth: "50%",
          textAlign: "justify",
        }}
      >
        {team.description}
      </Typography>
    </Stack>
  )
}
