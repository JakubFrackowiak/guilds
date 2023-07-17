import { Chip } from "@mui/material"

interface ChipViewProps {
  option: string
}

export function ChipView({ option }: ChipViewProps) {
  return (
    <Chip
      size="small"
      variant="outlined"
      label={option}
      color="primary"
      sx={{
        width: "fit-content",
        bgcolor: "primary.light",
        color: "primary.dark",
      }}
    />
  )
}
