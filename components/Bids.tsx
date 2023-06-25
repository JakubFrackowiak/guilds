import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { collection, query } from "firebase/firestore"
import { Bid as BidType } from "types/quest"
import { UserCardBid } from "../components/UserCardBid"
import { Grid, CircularProgress, Typography } from "@mui/material"

export function Bids({ path }): JSX.Element {
  const firestore = useFirestore()
  const questsQuery = query(collection(firestore, path))
  const { data: bids } = useFirestoreCollectionData(questsQuery)

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
        bids.map((bid: BidType, idx) => <UserCardBid key={idx} value={bid} />)
      ) : (
        <Typography>no bids</Typography>
      )}
    </Grid>
  )
}
