import { MenuItem, Typography } from "@mui/material"
import { RefinementListProvided } from "react-instantsearch-core"

interface RefinementListItem {
  count: number
  label: string
  value: string[]
  isRefined: boolean
}

interface SelectItemProps {
  item: RefinementListItem
  refine: RefinementListProvided["refine"]
}

export function SelectItem({ item, refine }: SelectItemProps) {
  return (
    <MenuItem
      key={item.label}
      value={item.value}
      onClick={() => refine(item.value)}
      sx={{
        bgcolor: item.isRefined ? "primary.main" : "white",
        color: item.isRefined ? "white" : "black",
        ":hover": {
          bgcolor: "primary.main",
          color: "white",
          opacity: 0.7,
        },
      }}
    >
      <Typography>{item.label}</Typography>
    </MenuItem>
  )
}
