import { Divider, Stack, Typography } from "@mui/material"
import { formatDate } from "formatters"
import BusinessIcon from "@mui/icons-material/Business"
import { Experience } from "types/hero"

interface ExperienceCardProps {
  experience: Experience
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Stack
      sx={{
        border: "1px solid",
        borderColor: (theme) => theme.palette.grey[200],
        borderRadius: "0.5rem",
        flexGrow: 1,
        flex: 1,
        boxShadow: "0px 1px 3px 0px #1018281A",
      }}
      justifyContent="space-between"
      height="100%"
    >
      <Stack p={2} spacing={2} height="100%" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          <BusinessIcon sx={{ fontSize: 50 }} />
          <Stack>
            <Typography variant="h6">{experience.position}</Typography>
            <Typography
              variant="body1"
              color={(theme) => theme.palette.grey[600]}
              noWrap
            >
              {experience.company}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="body1" color={(theme) => theme.palette.grey[600]}>
          {formatDate(experience.startDate)}
          {" - "}
          {formatDate(experience.endDate)}
        </Typography>
      </Stack>
      <Divider />
      <Stack p={2}>
        <Typography
          alignSelf="flex-end"
          color="primary.dark"
          fontWeight={500}
          sx={{ cursor: "pointer" }}
        >
          View project
        </Typography>
      </Stack>
    </Stack>
  )
}
