import styled from "@emotion/styled"
import { connectRefinementList } from "react-instantsearch-dom"
import { Box, ListItemButton, Stack, Typography } from "@mui/material"

interface Item {
  label: string
  value: string
  count: number
  isRefined: boolean
}

const CustomListItemButton = styled(ListItemButton)({
  borderRadius: "0.5rem",
})

function CustomRefinementList({
  items,
  refine,
  currentRefinement,
  label,
  defaultLabel,
}) {
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
  })

  const refinementItemStyle = (condition: boolean) => ({
    bgcolor: condition ? "primary.light" : "background.main",
    color: condition ? "primary.main" : "text.secondary",
    borderRadius: "0.5rem",
  })

  return (
    <Stack spacing={label == null ? 0 : 1}>
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, color: "primary.main" }}
        noWrap
      >
        {label}
      </Typography>
      <Stack spacing={2}>
        <Box sx={refinementItemStyle(!currentRefinement.length)}>
          <CustomListItemButton onClick={() => refine([])}>
            <Typography variant="body1">{defaultLabel}</Typography>
          </CustomListItemButton>
        </Box>
        {sortedItems.length > 0 &&
          sortedItems.map((item: Item, idx) => (
            <Box sx={refinementItemStyle(item.isRefined)} key={idx}>
              <CustomListItemButton onClick={() => refine(item.value)}>
                <Typography variant="body1">{item.label}</Typography>
              </CustomListItemButton>
            </Box>
          ))}
      </Stack>
    </Stack>
  )
}

export const RefinementList = connectRefinementList(CustomRefinementList)
