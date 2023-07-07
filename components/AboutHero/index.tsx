import { Box, Stack, Typography } from "@mui/material"
import ReactCountryFlag from "react-country-flag"
import lookup from "country-code-lookup"
import { useState } from "react"
import { ArrowOutward } from "@mui/icons-material"
import Link from "next/link"
import { Hero } from "types/hero"

interface AboutHeroProps {
  hero: Hero
}

export function AboutHero({ hero }: AboutHeroProps) {
  const [readMore, setReadMore] = useState(false)
  const bioPreview = hero?.bio.split(" ").splice(0, 60).join(" ")

  return (
    <Stack direction="row" spacing={8}>
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography variant="h6" lineHeight="2rem">
            About me
          </Typography>
          <Typography
            variant="body1"
            color={(theme) => theme.palette.grey[600]}
          >
            {readMore ? hero?.bio : bioPreview + "..."}
          </Typography>
        </Stack>
        {hero?.bio !== bioPreview ? (
          <Box onClick={() => setReadMore(!readMore)}>
            <Typography
              color="primary.dark"
              fontWeight={500}
              sx={{ cursor: "pointer" }}
            >
              {readMore ? "Read less" : "Read more"}
            </Typography>
          </Box>
        ) : null}
      </Stack>
      <Stack spacing={6}>
        <Stack spacing={1}>
          <Typography
            lineHeight="2rem"
            color={(theme) => theme.palette.grey[600]}
          >
            Location
          </Typography>
          <Stack spacing={1} direction="row" alignItems="center">
            <ReactCountryFlag
              countryCode={lookup.byCountry(hero?.location.country)?.iso2}
              svg
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <Typography noWrap fontWeight={500}>
              {hero?.location.city}, {hero?.location.country}
            </Typography>
          </Stack>
        </Stack>
        {hero?.portfolio ? (
          <Stack spacing={1}>
            <Typography
              lineHeight="2rem"
              color={(theme) => theme.palette.grey[600]}
            >
              Porfolio
            </Typography>
            <Link href="#" style={{ textDecoration: "none" }}>
              <Stack direction="row" spacing={1}>
                <Typography noWrap color="primary.dark" fontWeight={500}>
                  {hero?.portfolio}
                </Typography>
                <ArrowOutward sx={{ color: "primary.dark" }} />
              </Stack>
            </Link>
          </Stack>
        ) : null}
      </Stack>
      <Stack spacing={6}>
        <Stack spacing={1}>
          <Typography
            lineHeight="2rem"
            color={(theme) => theme.palette.grey[600]}
          >
            Email
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography noWrap color="primary.dark" fontWeight={500}>
              {hero?.email}
            </Typography>
            <ArrowOutward sx={{ color: "primary.dark" }} />
          </Stack>
        </Stack>
        {hero?.website ? (
          <Stack spacing={1} onClick={null}>
            <Typography
              lineHeight="2rem"
              color={(theme) => theme.palette.grey[600]}
            >
              Website
            </Typography>
            <Link href={`/${hero?.website}`} style={{ textDecoration: "none" }}>
              <Stack direction="row" spacing={1}>
                <Typography noWrap color="primary.dark" fontWeight={500}>
                  {hero?.website}
                </Typography>
                <ArrowOutward sx={{ color: "primary.dark" }} />
              </Stack>
            </Link>
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  )
}
