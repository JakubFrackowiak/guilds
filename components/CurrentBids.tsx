import React, { useState } from "react"
import { Stack, Typography, Grid, CircularProgress } from "@mui/material"
import { Bids } from "../components/Bids"
import { Bid, Quest } from "../types/quest"
import { SecondaryButton } from "./SecondaryButton"
import { PrimaryButton } from "./PrimaryButton"
import { MakeBidModal } from "./MakeBidModal"
import { formatBid } from "formatters"

interface CurrentBidsProps {
  bids: Bid[]
  quest: Quest
}

export function CurrentBids({ bids, quest }: CurrentBidsProps) {
  const [makeBidModalOpen, setMakeBidModalOpen] = useState(false)
  const bestBid = bids && bids.length > 0 ? bids[0] : null

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
      {bids && bids.length > 0 ? (
        <Grid container spacing={5}>
          <Grid item md={4}>
            <Stack spacing={2} mb={4}>
              <Stack spacing={2}>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  color="primary.main"
                >
                  Current best bid - {formatBid(bestBid)}
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
            <Bids bids={bids as Bid[]} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={6}>
          <Grid item md={4}>
            <Stack spacing={2} mb={4}>
              <Stack spacing={2}>
                <Typography variant="h3">Be the first one to bid</Typography>
              </Stack>
              <Stack spacing={4}>
                <Typography color="text.secondary">
                  Currently there are no heroes bidding on this quest.
                </Typography>
                <PrimaryButton
                  label="Make a new bid"
                  width="fit-content"
                  onClick={() => setMakeBidModalOpen(true)}
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Stack>
  )
}
