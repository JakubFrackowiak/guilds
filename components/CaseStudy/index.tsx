import { Stack } from "@mui/system"
import { HeroAvatar } from "components/HeroAvatar"
import { CaseStudyInfo } from "./CaseStudyInfo"
import { Hero } from "types/hero"
import { Box } from "@mui/material"

interface CaseStudyProps {
  hero: Hero
  type: string
}

export function CaseStudy({ hero, type }: CaseStudyProps) {
  return (
    <Stack spacing={5} direction={{ lg: "row", xl: "row" }} alignItems="start">
      <CaseStudyInfo type={type} hero={hero} />
      <Box width="100%" alignSelf="center">
        <HeroAvatar hero={hero} size="panoramicMedium" />
      </Box>
    </Stack>
  )
}
