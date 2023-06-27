import lookup from "country-code-lookup"
import Image from "next/image"
import { Button, Stack, Typography } from "@mui/material"
import { Refinement, RefinementValue } from "react-instantsearch-core"
import { formatHour, formatRate } from "formatters"

interface CurrentRefinementProps {
  item: Refinement
  refine: (
    refinement: RefinementValue | RefinementValue[] | Refinement[]
  ) => void
}

export function CurrentRefinement({ item, refine }: CurrentRefinementProps) {
  const getSelectLabel = (refinement: string | string[]) => {
    const firstCountry = lookup.byCountry(refinement[0])?.fips
    const secondCountry = lookup.byCountry(refinement[1])?.fips
    switch (refinement.length) {
      case 1:
        return firstCountry
      case 2:
        return firstCountry + ", " + secondCountry
      default:
        return (
          firstCountry + ", " + secondCountry + ", +" + (refinement.length - 2)
        )
    }
  }

  const getRangeLabel = (refinement: { min: number; max: number }) => {
    const { min, max } = refinement
    switch (item.attribute) {
      case "level":
        return "Level : " + min + " - " + max
      case "rating":
        return "Rating: " + min + " - " + max
      case "apprentice.rate":
        return "Rate: " + formatRate(min) + " - " + formatRate(max)
      case "apprentice.workingHours.start":
        return "Working from: " + formatHour(min)
      case "apprentice.workingHours.end":
        return "Working till: " + formatHour(max)
    }
  }
  return (
    <Button
      variant="outlined"
      key={item.label}
      onClick={() => {
        refine(item.value)
      }}
      sx={{
        height: "3rem",
        borderRadius: "0.6rem",
        borderColor: "transparent",
        bgcolor: "rgb(192,16,72, 0.1)",
        "&:hover": {
          backgroundColor: "rgb(192,16,72, 0.1)",
        },
      }}
    >
      {item.items ? (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Stack direction="row">
            <Typography
              fontWeight={500}
              color="primary.main"
              textAlign="center"
              textTransform="none"
            >
              {getSelectLabel(item.currentRefinement)}
            </Typography>
          </Stack>
          <Image src="/redx.svg" alt="x" width={15} height={15} />
        </Stack>
      ) : (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            fontWeight={500}
            color="primary.main"
            textAlign="center"
            textTransform="none"
          >
            {getRangeLabel(
              item.currentRefinement as unknown as { min: number; max: number }
            )}
          </Typography>
          <Image src="/redx.svg" alt="x" width={15} height={15} />
        </Stack>
      )}
    </Button>
  )
}
