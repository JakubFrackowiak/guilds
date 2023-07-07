import { Bid, Bid as BidType } from "types/quest"
import { UserCardBid } from "../components/UserCardBid"
import { CircularProgress, Grid, Typography } from "@mui/material"

interface BidsProps {
  bids: Bid[]
}

export function Bids({ bids }: BidsProps) {
  if (!bids) {
    return <CircularProgress />
  }
  return (
    <Grid
      container
      columns={{ xs: 8, sm: 12, md: 12 }}
      columnSpacing={2}
      rowSpacing={4}
    >
      {bids?.length ? (
        bids.map((bid: BidType, idx) => <UserCardBid key={idx} bid={bid} />)
      ) : (
        <Typography>no bids</Typography>
      )}
    </Grid>
  )
}
