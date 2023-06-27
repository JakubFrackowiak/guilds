import Link from "next/link"
import styled from "@emotion/styled"
import { Divider, Stack, Typography } from "@mui/material"
import { Hero } from "types/hero"
import { PrimaryButton } from "components/PrimaryButton"
import { SecondaryButton } from "components/SecondaryButton"

const CaseStudyLink = styled(Link)`
  text-decoration: none;
`

interface CaseStudyInfoProps {
  hero: Hero
  type: string
}

export function CaseStudyInfo({ hero, type }: CaseStudyInfoProps) {
  return (
    <Stack width="100%" spacing={5} mb={{ xs: "2rem", sm: "2rem", md: "2rem" }}>
      <Stack spacing={2} mb="2rem">
        <Typography variant="body1" fontWeight={600} color="primary.main">
          Case study
        </Typography>
        <Typography variant="h3">
          About the {type == "team" ? "team leader" : "quest creator"}
        </Typography>
      </Stack>
      <Divider />
      <Typography lineHeight="1.8rem" color="text.secondary">
        {hero?.bio}
      </Typography>
      <Stack direction="row" spacing={2}>
        <CaseStudyLink href="#">
          <SecondaryButton label="View full profile" />
        </CaseStudyLink>
        <CaseStudyLink href="#">
          <PrimaryButton label="Message" />
        </CaseStudyLink>
      </Stack>
    </Stack>
  )
}
