import Link from "next/link"
import styled from "@emotion/styled"
import Image from "next/image"
import { Grid, Box, Stack, Typography } from "@mui/material"
import { QuestTag } from "../QuestTag"
import { Tag, Quest, Bid } from "types/quest"
import LinesElipsis from "react-lines-ellipsis"
import {
  StorageImage,
  useFirestore,
  useFirestoreCollectionData,
} from "reactfire"
import { collection, limit, orderBy, query } from "firebase/firestore"
import { formatBid } from "formatters"

interface QuestHitProps {
  hit: Quest
}

const QuestThumbnail = styled(StorageImage)({
  objectFit: "cover",
  height: 240,
  width: "100%",
})

export function QuestHit({ hit }: QuestHitProps) {
  const firestore = useFirestore()
  const bidsRef = collection(firestore, `quests/${hit.id}/bids`)
  const bidsQuery = query(bidsRef, orderBy("amount", "asc"), limit(1))
  const { data: bids } = useFirestoreCollectionData(bidsQuery)
  const bestBid = bids && bids.length > 0 ? bids[0] : null

  return (
    <Grid item xs={12} md={12} lg={6}>
      <Box>
        <Stack spacing={1}>
          <QuestThumbnail
            storagePath={`general/${hit.image}`}
            alt="quest image"
          />
          {bestBid && (
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              {"Best bid - " + formatBid(bestBid as Bid)}
            </Typography>
          )}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">{hit?.title}</Typography>
            <Link href={`quest/${hit.id}`}>
              <Image
                src="/arrow-right-up.svg"
                alt="arrow-right-up"
                width={15}
                height={15}
              />
            </Link>
          </Stack>
          <Typography variant="body1">
            <LinesElipsis
              text={hit.description}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="words"
            />
          </Typography>
          <Grid container spacing={1}>
            <>
              {hit?.tags.map((tag: Tag, idx) => (
                <Grid item key={idx}>
                  <QuestTag value={tag} />
                </Grid>
              ))}
            </>
          </Grid>
        </Stack>
      </Box>
    </Grid>
  )
}
