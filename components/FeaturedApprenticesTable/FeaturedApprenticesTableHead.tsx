import { TableRow, TableHead, TableCell, Typography } from "@mui/material"

export function FeaturedApprenticesTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ pl: "3rem" }}>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Name
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="text.secondary" variant="body2" fontWeight={500}>
            Location
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="text.secondary" variant="body2" fontWeight={500}>
            Level
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="text.secondary" variant="body2" fontWeight={500}>
            Rate
          </Typography>
        </TableCell>
        <TableCell>
          <Typography
            color="text.secondary"
            variant="body2"
            fontWeight={500}
            textAlign="left"
            noWrap
          >
            Working days
          </Typography>
        </TableCell>
        <TableCell>
          <Typography
            color="text.secondary"
            variant="body2"
            fontWeight={500}
            textAlign="left"
            noWrap
          >
            Working hours
          </Typography>
        </TableCell>
        <TableCell sx={{ pr: "3rem" }}>
          <Typography color="text.secondary" variant="body2" fontWeight={500}>
            Avg rating
          </Typography>
        </TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
  )
}
