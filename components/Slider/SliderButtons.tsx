import Link from "next/link"
import { Stack } from "@mui/material"
import { Variant } from "components/Slider"
import { PrimaryButton } from "components/PrimaryButton"
import { SecondaryButton } from "components/SecondaryButton"

function HeroesSliderButtons() {
  return (
    <Stack direction="row" spacing={2} justifyContent={{ xs: "space-between" }}>
      <Link href="/heroes" style={{ textDecoration: "none" }}>
        <SecondaryButton label="Our customers" />
      </Link>
      <Link href="/signup" style={{ textDecoration: "none" }}>
        <PrimaryButton label="Create account" />
      </Link>
    </Stack>
  )
}

function QuestsSliderButtons() {
  return (
    <Stack sx={{ "& > *": { width: "100%" } }}>
      <Link href="/quests" style={{ textDecoration: "none" }}>
        <PrimaryButton label="View all quests" />
      </Link>
    </Stack>
  )
}

function TeamsSliderButtons() {
  return (
    <Stack sx={{ "& > *": { width: "100%" } }}>
      <Link href="/teams" style={{ textDecoration: "none" }}>
        <PrimaryButton label="View all teams" />
      </Link>
    </Stack>
  )
}

export function SliderButtons({ variant }: Variant) {
  switch (variant) {
    case "hero":
      return <HeroesSliderButtons />
    case "quest":
      return <QuestsSliderButtons />
    case "team":
      return <TeamsSliderButtons />
    case "role":
      return null
  }
}
