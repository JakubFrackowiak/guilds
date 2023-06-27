import { connectCurrentRefinements } from "react-instantsearch-dom"
import {
  CurrentRefinementsProvided,
  Refinement,
} from "react-instantsearch-core"
import { Stack } from "@mui/material"
import { CurrentRefinement } from "./CurrentRefinement"
import { useEffect, useMemo, useState } from "react"

interface CurrentRefinementsProps {
  items: Refinement[]
  refine: CurrentRefinementsProvided["refine"]
}

function CustomCurrentRefinements({ items, refine }: CurrentRefinementsProps) {
  const [filteredItems, setFilteredItems] = useState<Refinement[]>([])

  useMemo(() => {
    const filterItems = (items: Refinement[]) => {
      const uniqueItems = items.reduce(
        (accumulator: Refinement[], current: Refinement) => {
          if (
            !accumulator.find(
              (item: Refinement) => item.attribute === current.attribute
            )
          ) {
            accumulator.push(current)
          }
          return accumulator
        },
        []
      )

      const filteredItems = uniqueItems.filter(
        (item) =>
          item.attribute !== "isApprentice" &&
          item.attribute !== "apprentice.favoriteTo"
      )
      setFilteredItems(filteredItems)
    }
    filterItems(items)
  }, [items])

  return (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      {filteredItems.map((item) => (
        <CurrentRefinement item={item} refine={refine} />
      ))}
    </Stack>
  )
}
export const CurrentRefinements = connectCurrentRefinements(
  CustomCurrentRefinements
)
