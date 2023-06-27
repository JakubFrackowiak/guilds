import { Container } from "@mui/material"
import { RefinementList, SearchBox } from "./SearchComponents"
import { InstantSearch } from "react-instantsearch-dom"
import { TextField, Stack } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"

interface FilterSearchBarProps {
  filterName: string
  handleFilter: (params: string) => void
  searchClient: object
  filterOptions: string[]
  filterSelection: string
}

export function FilterSearchBar({
  filterName,
  handleFilter,
  searchClient,
  filterOptions,
  filterSelection,
}: FilterSearchBarProps) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        m: 2,
      }}
    >
      <Autocomplete
        disablePortal
        inputValue={filterSelection}
        onInputChange={(event, newInputValue) => {
          handleFilter(newInputValue)
        }}
        id={`${filterName}-filter-dropdown`}
        options={filterOptions}
        renderInput={(params) => (
          <TextField placeholder={`Filter ${filterName}`} {...params} />
        )}
        sx={{ width: 300 }}
      />
      <InstantSearch searchClient={searchClient} indexName={filterName}>
        <Stack direction="column" spacing={4}>
          <SearchBox />
          <RefinementList
            attribute="tags"
            label={`${filterName} categories`}
            defaultLabel="All tags"
          />
        </Stack>
      </InstantSearch>
    </Container>
  )
}
