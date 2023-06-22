import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import { FeaturedApprenticesTableHead } from "./FeaturedApprenticesTableHead"
import { Paper } from "@mui/material"
import { FeaturedApprentices } from "./FeaturedApprentices"

interface FeaturedApprenticesTableProps {
  selectedApprentice: string
  setSelectedApprentice: (value: string) => void
}

export function FeaturedApprenticesTable({
  selectedApprentice,
  setSelectedApprentice,
}: FeaturedApprenticesTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <FeaturedApprenticesTableHead />
        <FeaturedApprentices
          selectedApprentice={selectedApprentice}
          setSelectedApprentice={setSelectedApprentice}
        />
      </Table>
    </TableContainer>
  )
}
