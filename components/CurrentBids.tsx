import Link from "next/link"
import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { Stack, Typography, Grid, CircularProgress, Box } from "@mui/material"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { collection, query } from "firebase/firestore"
import { Bids } from "../components/Bids"
import { Quest } from "../types/quest"
import { SecondaryButton } from "./SecondaryButton"
import { PrimaryButton } from "./PrimaryButton"

interface CurrentBidsProps {
  path: string
  quest: Quest
}
const BidsLink = styled(Link)`
  text-decoration: none;
`

export function CurrentBids({ path, quest }: CurrentBidsProps) {
  const firestore = useFirestore()
  const questsQuery = query(collection(firestore, path))
  const { status, data: bids } = useFirestoreCollectionData(questsQuery)

  const [lowest, setLowest] = useState(0)
  const [highest, setHighest] = useState(0)

  useEffect(() => {
    if (bids?.length > 0) {
      const bidAmounts = bids?.map((bid) => Number(bid.amount))
      setLowest(Math.min(...bidAmounts))
      setHighest(Math.max(...bidAmounts))
    }
  }, [status])

  if (!bids) {
    return <CircularProgress />
  }

  return (
    <Stack
      direction={{ lg: "row", xl: "row" }}
      alignItems="start"
      id="current-bids-section"
    >
      <Grid container spacing={5}>
        <Grid item md={4}>
          <Stack spacing={2} mb={4}>
            <Stack spacing={2}>
              <Typography variant="body1" fontWeight={600} color="primary.main">
                Current lowest bid - £{lowest}
              </Typography>
              <Typography variant="h3">Current bids on this quest</Typography>
            </Stack>
            <Typography color="text.secondary">
              The current heroes that are bidding on this quest.
            </Typography>
            <Stack display="flex" flexDirection="row" sx={{ pb: 3 }}>
              <Typography display="inline" color="text.secondary">
                The best competitor price is currently{" "}
                <Box
                  component="span"
                  style={{ color: "#498553", fontWeight: 600 }}
                >
                  £{highest}.
                </Box>
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <BidsLink href="#">
                <SecondaryButton label="See all" />
              </BidsLink>
              <BidsLink href="#">
                <PrimaryButton label="Make a new bid" />
              </BidsLink>
            </Stack>
          </Stack>
        </Grid>
        <Grid item md={8}>
          <Bids path={path} />
        </Grid>
      </Grid>
    </Stack>
  )
}
