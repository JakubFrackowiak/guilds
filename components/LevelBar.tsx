import { Typography, Container, Slider } from "@mui/material"
import styled from "@emotion/styled"
import { Hero } from "../types/hero"

const XpBar = styled(Slider)(() => ({
  "& .MuiSlider-thumb": {
    color: "white",
    border: "solid 2px #50915B",
  },
  "& .MuiSlider-rail": {
    color: "#EAECF0",
  },
  "& .MuiSlider-track": {
    color: "#50915B",
  },
}))

interface LevelBarProps {
  hero: Hero
}

export function LevelBar({ hero }: LevelBarProps) {
  console.log(hero.xp)
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="body1" fontWeight={600} color="primary.main">
        You are currently level {hero?.level}
      </Typography>
      <Typography variant="h3" sx={{ mt: 1 }}>
        {hero?.xp}XP
      </Typography>
      <XpBar disabled defaultValue={[0, Number(hero.xp)]} sx={{ mt: 2 }} />
    </Container>
  )
}
