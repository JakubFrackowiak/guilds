import styled from "@emotion/styled"
import { MoreHoriz } from "@mui/icons-material"
import { Box, Container, Stack, Typography } from "@mui/material"
import { SecondaryButton } from "components/SecondaryButton"
import { StorageImage } from "reactfire"
import { Hero } from "types/hero"

const UserAvatar = styled(StorageImage)`
  width: 160px;
  height: 160px;
  border: 4px solid #ffffff;
  border-radius: 200px;
  object-fit: cover;
`

interface IndividualHeroBannerProps {
  hero: Hero
}

export function IndividualHeroBanner({ hero }: IndividualHeroBannerProps) {
  return (
    <Stack>
      <Box
        width="100%"
        height="15rem"
        sx={{
          background:
            "conic-gradient(from 259.08deg at 50% 50%, #E31B54 0deg, rgba(227, 27, 84, 0) 360deg);",
        }}
      />
      <Container sx={{ transform: "translateY(-55px)" }}>
        <Stack direction="row" alignItems="end" spacing={3}>
          {hero?.profilePicture ? (
            <UserAvatar storagePath={`general/${hero?.profilePicture}` || ""} />
          ) : null}
          <Stack width="100%" pb="1rem">
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Typography variant="h4" lineHeight="3rem" noWrap>
                {hero?.name.first + " " + hero?.name.last}
              </Typography>
              <Stack direction="row" spacing={2}>
                <SecondaryButton width="fit-content">
                  <MoreHoriz />
                </SecondaryButton>
                <SecondaryButton label="View portfolio" width="fit-content" />
              </Stack>
            </Stack>
            <Typography color={(theme) => theme.palette.grey[600]}>
              I'm a {hero?.experience[0].position} based in{" "}
              {hero?.location.city}
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  )
}
