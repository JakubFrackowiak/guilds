import { Container, Box, Grid } from "@mui/material"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { useFirestoreDocData, useFirestore, useUser } from "reactfire"
import { doc } from "firebase/firestore"
import { useRouter } from "next/router"
import { Experience, Hero } from "types/hero"
import { IndividualHeroBanner } from "components/IndividualHeroBanner"
import { HeroExperience } from "components/HeroExperience"
import { AboutHero } from "components/AboutHero"
import { ExperienceCard } from "components/ExperienceCard"
import { HeroProjects } from "components/HeroProjects"
import { SideNav } from "components/SideNav"

export default function HeroPage() {
  const router = useRouter()
  const { data: user } = useUser()
  const { hid } = router.query

  const firestore = useFirestore()
  const heroRef = doc(firestore, `heroes/${hid}`)
  const { data: hero } = useFirestoreDocData(heroRef)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {user ? <SideNav /> : <Header />}
      <IndividualHeroBanner hero={hero as Hero} />
      <Container>
        <HeroExperience />
        <Box mt={3}>
          <AboutHero hero={hero as Hero} />
        </Box>
        <Grid container spacing={2} mt={10}>
          {hero?.experience.map((experience: Experience, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <ExperienceCard experience={experience} />
            </Grid>
          ))}
        </Grid>
        <Box my={10}>
          <HeroProjects />
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}
