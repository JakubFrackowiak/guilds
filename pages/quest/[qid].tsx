import { Container, Box, CircularProgress } from "@mui/material"
import { Header } from "../../components/Header"
import { BackToSearch } from "../../components/BackToSearch"
import { Footer } from "../../components/Footer"
import { CurrentBids } from "../../components/CurrentBids"
import { IndividualQuestBanner } from "../../components/IndividualQuestBanner"
import { useFirestoreDocData, useFirestore } from "reactfire"
import { doc } from "firebase/firestore"
import { AboutGig } from "../../components/AboutGig"
import { LevelBar } from "../../components/LevelBar"
import { CaseStudy } from "../../components/CaseStudy"
import { useRouter } from "next/router"
import { Hero } from "types/hero"

export default function Quest() {
  const router = useRouter()
  const { qid } = router.query

  const firestore = useFirestore()
  const questRef = doc(firestore, `quests/${qid}`)

  const { status: questStatus, data: quest } = useFirestoreDocData(questRef)
  const heroRef = doc(firestore, `heroes/${quest?.creatorId}`)
  const { status: heroStatus, data: hero } = useFirestoreDocData(heroRef)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Container>
        {quest && hero ? (
          <>
            <IndividualQuestBanner hero={hero as Hero} quest={quest} />
            <AboutGig quest={quest} />
            <LevelBar hero={hero as Hero} />
            <CaseStudy type="quest" hero={hero as Hero} />
            <CurrentBids
              quest={quest}
              path="quests/0FdxGoe3fcy6v8Rd37VZ/bids"
            />
          </>
        ) : (
          <CircularProgress />
        )}
        <BackToSearch />
      </Container>
      <Footer />
    </Box>
  )
}
