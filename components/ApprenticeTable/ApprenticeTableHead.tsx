import { TableRow, TableHead, TableCell, Typography } from "@mui/material"

export default function ApprenticeTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ pl: "3rem", width: "15rem" }}>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Name
          </Typography>
        </TableCell>
        <TableCell sx={{ width: "6rem" }}>
          <Typography color="text.secondary" variant="body2" fontWeight={500}>
            Location
          </Typography>
        </TableCell>
        <TableCell sx={{ width: "7rem" }}>
          <Typography color="text.secondary" variant="body2" fontWeight={500}>
            Level
          </Typography>
        </TableCell>
        <TableCell sx={{ width: "5rem" }}>
          <Typography color="text.secondary" variant="body2" fontWeight={500}>
            Rate
          </Typography>
        </TableCell>
        <TableCell sx={{ width: "10rem" }}>
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
        <TableCell sx={{ width: "9rem" }}>
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
        <TableCell sx={{ pr: "3rem", width: "9rem" }}>
          <Typography color="text.secondary" variant="body2" fontWeight={500}>
            Avg rating
          </Typography>
        </TableCell>
        <TableCell sx={{ width: "12rem" }} />
      </TableRow>
    </TableHead>
  )
}
