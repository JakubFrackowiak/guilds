import React, { useState, useEffect } from "react"
import { Stack, Typography, Grid, CircularProgress, Box } from "@mui/material"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { collection, limit, query } from "firebase/firestore"
import { Bids } from "../components/Bids"
import { Quest } from "../types/quest"
import { SecondaryButton } from "./SecondaryButton"
import { PrimaryButton } from "./PrimaryButton"
import { MakeBidModal } from "./MakeBidModal"

interface CurrentBidsProps {
  path: string
  quest: Quest
}

export function CurrentBids({ path, quest }: CurrentBidsProps) {
  const [makeBidModalOpen, setMakeBidModalOpen] = useState(false)
  const firestore = useFirestore()
  const bidsRef = collection(firestore, path)
  const bidsQuery = query(bidsRef, limit(6))
  const { status, data: bids } = useFirestoreCollectionData(bidsQuery)

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
    <Stack direction={{ lg: "row", xl: "row" }} alignItems="start">
      <MakeBidModal
        modalOpen={makeBidModalOpen}
        setModalOpen={setMakeBidModalOpen}
        questId={quest.id}
      />
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
            <Stack direction="row" spacing={2}>
              <SecondaryButton label="See all" width="fit-content" />
              <PrimaryButton
                label="Make a new bid"
                width="fit-content"
                onClick={() => setMakeBidModalOpen(true)}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item md={8}>
          <Bids bids={bids} />
        </Grid>
      </Grid>
    </Stack>
  )
}
