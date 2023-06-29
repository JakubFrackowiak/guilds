import Image from "next/image"
import { Divider, Stack, Typography } from "@mui/material"
import { collection, query, where } from "firebase/firestore"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { LancrData } from "./LancrData"

export function LancrStats() {
  const firestore = useFirestore()
  const heroesRef = collection(firestore, "heroes")
  const { data: heroes } = useFirestoreCollectionData(heroesRef)
  const questsRef = collection(firestore, "quests")
  const questsQuery = query(questsRef, where("status", "==", "completed"))
  const { data: completedQuests } = useFirestoreCollectionData(questsQuery)

  return (
    <Stack
      alignItems="center"
      justifyContent="space-around"
      spacing={7}
      width="100%"
    >
      <Stack alignItems="center" spacing={2}>
        <Image
          src="/lancr-logo-pastel.svg"
          width={56}
          height={56}
          alt="Lancr Logo Pastel"
        />
        <Typography variant="h3">Lancr history</Typography>
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          We've made quite the statement
        </Typography>
      </Stack>
      <Stack
        alignItems="center"
        direction={{ xs: "column", sm: "column", md: "row" }}
        justifyContent="center"
        spacing={{ xs: 2, sm: 2, md: 0 }}
        width="100%"
      >
        <LancrData value={heroes?.length.toLocaleString()} caption={"Heroes"} />
        <Divider orientation="vertical" flexItem />
        <LancrData value="£384,158" caption={"Earned by Heroes"} />
        <Divider orientation="vertical" flexItem />
        <LancrData
          value={completedQuests?.length.toLocaleString()}
          caption={"Quests completed"}
        />
      </Stack>
    </Stack>
  )
}
