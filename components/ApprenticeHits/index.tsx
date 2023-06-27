import { connectInfiniteHits } from "react-instantsearch-dom"
import { TableBody } from "@mui/material"
import { ApprenticeHit } from "./ApprenticeHit"
import { Hero } from "types/hero"

interface HitsProps {
  hits: Hero[]
  selectedApprentice: string
  setSelectedApprentice: (value: string) => void
}

function Hits({ hits, selectedApprentice, setSelectedApprentice }: HitsProps) {
  return (
    <TableBody>
      {hits.map((hit: Hero) => (
        <ApprenticeHit
          key={hit.id}
          hit={hit}
          selectedApprentice={selectedApprentice}
          setSelectedApprentice={setSelectedApprentice}
        />
      ))}
    </TableBody>
  )
}

export const ApprenticeHits = connectInfiniteHits(Hits)
