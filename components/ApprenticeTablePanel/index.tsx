import Image from "next/image"
import { ApprenticeTable } from "../ApprenticeTable"
import { heroesSearchClient } from "typesense/instantsearch"
import { Configure, InstantSearch } from "react-instantsearch-dom"
import { Pagination, RefinementList, SearchBox } from "../SearchComponents"
import {
  Stack,
  Divider,
  Box,
  useMediaQuery,
  Popover,
  Paper,
} from "@mui/material"
import { ApprenticeFilters } from "../ApprenticeFilters"
import { CurrentRefinements } from "../ApprenticeCurrentRefinements"
import { useState } from "react"
import { useUser } from "reactfire"
import { SecondaryButton } from "components/SecondaryButton"
import { PrimaryButton } from "components/PrimaryButton"
import { useTheme } from "@mui/material/styles"

interface Item {
  count: number
  value: string[]
  label: string
  isRefined: boolean
}

interface ApprenticeTablePanelProps {
  tab: number
  index: number
  displayButtons: boolean
  setStage: (value: number) => void
  setSelectedApprentice: (value: string) => void
  selectedApprentice: string
}

export function ApprenticeTablePanel({
  tab,
  index,
  displayButtons,
  setStage,
  setSelectedApprentice,
  selectedApprentice,
}: ApprenticeTablePanelProps) {
  const [showFilters, setShowFilters] = useState(false)
  const { data: user } = useUser()
  const theme = useTheme()
  const isMedium = useMediaQuery(theme.breakpoints.down("lg"))

  const transformItems = (items: Item[]) => {
    const filteredItems = items.filter(
      (element: Item) => element.label == user?.uid
    )
    if (filteredItems.length) {
      filteredItems[0].label = "Favorites"
    } else {
      filteredItems.push({
        count: 1,
        value: [user?.uid],
        label: "Favorites",
        isRefined: false,
      })
    }
    return filteredItems
  }

  return (
    <Box hidden={tab !== index} height="100%">
      <InstantSearch
        searchClient={heroesSearchClient}
        indexName="heroes"
        refresh
      >
        <Configure filters="isApprentice:true" clickAnalytics />
        <Stack height="100%" justifyContent="space-between">
          <Stack spacing={2} direction={{ md: "column", lg: "row" }}>
            <Stack spacing={2} mb={{ xs: "1rem" }}>
              <RefinementList
                attribute="apprentice.favoriteTo"
                label={null}
                transformItems={(items) => transformItems(items)}
                defaultLabel="All apprentices"
              />
              {isMedium ? (
                <Popover
                  open={showFilters}
                  onClose={() => setShowFilters(false)}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Paper sx={{ p: 4 }}>
                    <ApprenticeFilters showFilters={showFilters} />
                  </Paper>
                </Popover>
              ) : (
                <ApprenticeFilters showFilters={showFilters} />
              )}
            </Stack>
            <Stack height="100%" sx={{ overflowY: "scroll" }}>
              <Stack
                direction={{ xs: "row", sm: "row", md: "row", lg: "row" }}
                spacing={2}
                justifyContent="space-between"
                mb="1rem"
              >
                <Stack direction="row" spacing={1}>
                  <CurrentRefinements />
                  <SecondaryButton
                    label={showFilters ? "Hide filters" : "More filters"}
                    onClick={() => setShowFilters(!showFilters)}
                    width="10rem"
                  >
                    <Image
                      src="/filter-lines.svg"
                      width={25}
                      height={25}
                      alt="more filters"
                    />
                  </SecondaryButton>
                </Stack>
                <Box alignSelf="flex-start">
                  <SearchBox />
                </Box>
              </Stack>
              <ApprenticeTable
                selectedApprentice={selectedApprentice}
                setSelectedApprentice={setSelectedApprentice}
              />
            </Stack>
          </Stack>
          <Stack spacing={3}>
            <Divider orientation="horizontal" component={Box} />
            <Pagination />
            {displayButtons ? (
              <Stack direction="row" spacing={2}>
                <Box flexBasis="50%">
                  <SecondaryButton
                    label="Go back"
                    onClick={() => setStage(2)}
                  />
                </Box>
                <Box flexBasis="50%">
                  <PrimaryButton
                    label="Confirm selection"
                    onClick={() => setStage(4)}
                    disabled={selectedApprentice == null ? true : false}
                  />
                </Box>
              </Stack>
            ) : null}
          </Stack>
        </Stack>
      </InstantSearch>
    </Box>
  )
}
