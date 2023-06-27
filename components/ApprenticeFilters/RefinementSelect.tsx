import { connectRefinementList } from "react-instantsearch-dom"
import { RefinementListProvided } from "react-instantsearch-core"
import { Checkbox, Stack, Typography } from "@mui/material"

function CustomRefinementSelect({ items, refine }) {
  const sortedItems = items.sort((a, b) => {
    const labelA = a.label.toUpperCase()
    const labelB = b.label.toUpperCase()
    if (labelA < labelB) {
      return -1
    }
    if (labelA > labelB) {
      return 1
    }
    return 0
  }) as RefinementListProvided["items"]

  return (
    <Stack spacing={-1} height="7rem" overflow="scroll">
      {sortedItems.map((item) => (
        <Stack direction="row" alignItems="center">
          <Checkbox
            checked={item.isRefined}
            onChange={() => refine(item.value)}
            size="small"
          />
          <Typography>{item.label}</Typography>
        </Stack>
      ))}
    </Stack>
  )
}

export const RefinementSelect = connectRefinementList(CustomRefinementSelect)
