import { Box, Container, Stack, Typography, useMediaQuery } from "@mui/material"
import { ScrollLeft, ScrollRight } from "components/ScrollButtons"
import { useRef, useState } from "react"
import { Hero } from "types/hero"
import { Team } from "types/team"
import { Quest } from "types/quest"
import { LatestTeam } from "components/LatestTeams/LatestTeam"
import { HeroAvatar } from "components/HeroAvatar"
import { LatestQuest } from "components/LatestQuests/LatestQuest"
import { SliderButtons } from "components/Slider/SliderButtons"
import { SliderHeader } from "components/Slider/SliderHeader"
import { Role } from "components/Role/Role"
import { Role as RoleType } from "types/team"
import { useTheme } from "@mui/material/styles"

export interface Variant {
  variant: "hero" | "quest" | "team" | "role"
}

interface ReusableSliderProps {
  variant: "hero" | "team" | "quest" | "role"
  status: "loading" | "success" | "error"
  items: Hero[] | Team[] | Quest[] | RoleType[]
  variantId: string
}

enum Status {
  loading = "loading",
  success = "success",
  error = "error",
}

enum SliderVariant {
  Hero = "hero",
  Team = "team",
  Quest = "quest",
  Role = "role",
}

export function Slider({
  items,
  status,
  variant,
  variantId,
}: ReusableSliderProps) {
  const [scrolledCard, setScrolledCard] = useState(0)
  const featuredCardsRefs = useRef([])
  const featuredCardsContainerRef = useRef()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const renderItem = (item: Hero | Team | Quest | RoleType) => {
    switch (variant) {
      case SliderVariant.Hero:
        return <HeroAvatar hero={item as Hero} size="small" />
      case SliderVariant.Team:
        return <LatestTeam team={item as Team} />
      case SliderVariant.Quest:
        return <LatestQuest quest={item as Quest} />
      case SliderVariant.Role:
        return <Role role={item as RoleType} teamId={variantId} />
    }
  }

  return (
    <Stack spacing={4} alignItems="center" sx={{ overflow: "clip" }}>
      <Container>
        <Stack spacing={6}>
          <Stack spacing={6}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <SliderHeader variant={variant} />
              {!isMobile && <SliderButtons variant={variant} />}
            </Stack>
            <Stack direction="row">
              <Stack
                direction="row"
                spacing={3}
                ref={featuredCardsContainerRef}
                sx={{
                  scrollBehavior: "smooth",
                  overflow: "scroll",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {status === Status.success ? (
                  items?.map((item: Hero | Team | Quest | RoleType, idx) => (
                    <Box
                      key={idx}
                      ref={(ref) => {
                        featuredCardsRefs.current[idx] = ref
                      }}
                    >
                      {renderItem(item)}
                    </Box>
                  ))
                ) : (
                  <Typography>Loading...</Typography>
                )}
              </Stack>
            </Stack>
            <Stack direction="row" spacing={3}>
              <ScrollLeft
                scrolledValue={scrolledCard}
                setScrolledValue={setScrolledCard}
                refs={featuredCardsRefs}
                containerRef={featuredCardsContainerRef}
              />
              <ScrollRight
                scrolledValue={scrolledCard}
                setScrolledValue={setScrolledCard}
                refs={featuredCardsRefs}
                containerRef={featuredCardsContainerRef}
              />
            </Stack>
            {isMobile && <SliderButtons variant={variant} />}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  )
}
