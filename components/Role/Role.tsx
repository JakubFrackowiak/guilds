import styled from "@emotion/styled"
import { Grid, Box, Stack, Typography, Button } from "@mui/material"
import LinesElipsis from "react-lines-ellipsis"
import {
  StorageImage,
  useFirestore,
  useFirestoreCollectionData,
} from "reactfire"
import { collection, limit, orderBy, query } from "firebase/firestore"
import { Role as RoleType } from "types/team"
import { SecondaryButton } from "components/SecondaryButton"

const RoleThumbnail = styled(StorageImage)({
  objectFit: "cover",
  height: 296,
  width: 280,
})

interface RoleProps {
  role: RoleType
  teamId: string | string[]
}

export function Role({ role, teamId }: RoleProps) {
  const { title, description, image, id: roleId } = role
  const firestore = useFirestore()
  const bidsRef = collection(firestore, `teams/${teamId}/roles/${roleId}/bids`)
  const bestBidQuery = query(bidsRef, orderBy("amount", "asc"), limit(1))
  const { data: bestBid } = useFirestoreCollectionData(bestBidQuery)

  const makeBid = () => {
    alert("make bid")
  }

  return (
    <Grid item xs={6} width="280px">
      <Box>
        <Stack spacing={4}>
          <RoleThumbnail storagePath={`general/${image}`} alt="role picture" />
          <Stack spacing={1}>
            <Typography variant="h6">{title}</Typography>
          </Stack>
          <Typography variant="body1">
            <LinesElipsis
              text={description}
              maxLine="1"
              ellipsis="..."
              trimRight
              basedOn="words"
            />
          </Typography>
          <SecondaryButton
            label="Make a bid"
            width="fit-content"
            onClick={() => makeBid()}
          />
        </Stack>
      </Box>
    </Grid>
  )
}
