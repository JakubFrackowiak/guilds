import Image from "next/image"
import { ApprenticeTable } from "../ApprenticeTable"
import { heroesSearchClient } from "typesense/instantsearch"
import { Configure, InstantSearch } from "react-instantsearch-dom"
import { Pagination, RefinementList, SearchBox } from "../SearchComponents"
import { Stack, Divider, Box } from "@mui/material"
import { ApprenticeFilters } from "../ApprenticeFilters"
import { CurrentRefinements } from "../ApprenticeCurrentRefinements"
import { useState } from "react"
import { useUser } from "reactfire"
import { SecondaryButton } from "components/SecondaryButton"
import { PrimaryButton } from "components/PrimaryButton"

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

  const transformItems = (items: Item[]) => {
    items.filter((element: Item) => element.value.includes(user?.uid))
    if (items.length) {
      items[0].label = "Favorites"
    } else {
      items.push({
        count: 1,
        value: [user?.uid],
        label: "Favorites",
        isRefined: false,
      })
    }
    return items
  }

  return (
    <Box hidden={tab !== index} height="100%" sx={{ overflowY: "scroll" }}>
      <InstantSearch
        searchClient={heroesSearchClient}
        indexName="heroes"
        refresh
      >
        <Configure filters="isApprentice:true" clickAnalytics />
        <Stack direction="row" spacing={8} height="100%">
          <Stack spacing={4} maxWidth="15%">
            <RefinementList
              attribute="apprentice.favoriteTo"
              label={null}
              transformItems={(items) => transformItems(items)}
              defaultLabel="All apprentices"
            />
            <Box overflow="scroll">
              <ApprenticeFilters showFilters={showFilters} />
            </Box>
          </Stack>
          <Stack sx={{ flexGrow: 1 }} overflow="scroll">
            <Stack height="100%">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-end"
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
                <Box alignSelf="flex-start" height="3rem">
                  <SearchBox />
                </Box>
              </Stack>
              <Stack
                height="100%"
                sx={{ overflow: "scroll" }}
                spacing={2}
                justifyContent="space-between"
              >
                <ApprenticeTable
                  selectedApprentice={selectedApprentice}
                  setSelectedApprentice={setSelectedApprentice}
                />
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
            </Stack>
          </Stack>
        </Stack>
      </InstantSearch>
    </Box>
  )
}
