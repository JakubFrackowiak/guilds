import { Stack, Typography, Avatar, Box } from "@mui/material"
import { Hero } from "types/hero"
import { Team } from "types/team"
import styled from "@emotion/styled"
import { StorageImage } from "reactfire"

interface IndividualTeamBannerProps {
  hero: Hero
  team: Team
}

const TeamImage = styled(StorageImage)({
  objectFit: "cover",
  maxHeight: 590,
  aspectRatio: "7/8",
})

const UserAvatar = styled(StorageImage)`
  width: 60px;
  height: 60px;
  border: 2.5px solid #ffffff;
  border-radius: 200px;
  margin: 0px -7px;
  object-fit: cover;
`

export function IndividualTeamBanner({
  hero,
  team,
}: IndividualTeamBannerProps) {
  return (
    <Stack
      direction={{ lg: "row", xl: "row" }}
      justifyContent="space-between"
      alignItems={{
        xs: "flex-start",
        sm: "flex-start",
        md: "flex-start",
        lg: "center",
      }}
      spacing={3}
    >
      <Stack mb={{ xs: "2rem", sm: "2rem", md: "2rem" }}>
        <Stack spacing={2} mb="2rem">
          <Typography variant="h1">{team?.title}</Typography>
        </Stack>
        <Typography
          sx={{
            color: "#667085",
            fontWeight: 400,
            fontSize: "1.25rem",
            lineHeight: "1.875rem",
          }}
        >
          {team?.highlight}
        </Typography>
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{ my: 3 }}
        >
          <Box pr="1rem">
            <UserAvatar storagePath={`general/${hero?.profilePicture}`} />
          </Box>
          <Stack>
            <Typography>
              {hero?.name.first} {hero?.name.last}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                size: "1rem",
                lineHeight: "1.5rem",
                color: "#667085",
              }}
            >
              Created 14th July 2022
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack width={{ xs: "100%", sm: "100%", md: "100%", lg: 510 }}>
        <TeamImage
          storagePath={`general/${team?.image}`}
          alt={`${team?.title} team image`}
        />
      </Stack>
    </Stack>
  )
}
