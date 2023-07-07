import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import ApprenticeTableHead from "./ApprenticeTableHead"
import { ApprenticeHits } from "../ApprenticeHits"
import { Paper } from "@mui/material"

interface ApprenticeTableProps {
  selectedApprentice: string
  setSelectedApprentice: (value: string) => void
}

export function ApprenticeTable({
  selectedApprentice,
  setSelectedApprentice,
}: ApprenticeTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ tableLayout: "fixed", width: "100%", overflow: "scroll" }}>
        <ApprenticeTableHead />
        <ApprenticeHits
          selectedApprentice={selectedApprentice}
          setSelectedApprentice={setSelectedApprentice}
        />
      </Table>
    </TableContainer>
  )
}
