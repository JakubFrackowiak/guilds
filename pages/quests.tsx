import { Header } from "../components/Header"
import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { Container, Box, Grid, Typography } from "@mui/material"
import { Footer } from "../components/Footer"
import { PageHeader } from "../components/PageHeader"
import Link from "next/link"
import Image from "next/image"
import {
  useUser,
  useFirestore,
  useFirestoreCollectionData,
  StorageImage,
} from "reactfire"
import { collection, query, where } from "firebase/firestore"

const QuestThumbnail = styled(StorageImage)({
  objectFit: "cover",
  height: "296px",
  width: "100%",
})

export default function Quests() {
  const firestore = useFirestore()
  const { data: user } = useUser()

  const [currentQuests, setCurrentQuests] = useState([])

  useEffect(() => {
    if (user?.uid) {
      const questsCollection = collection(firestore, `quests`)
      const questsQuery = query(
        questsCollection,
        where("creatorId", "==", user?.uid)
      )
      const { data: quests } = useFirestoreCollectionData(questsQuery)
      setCurrentQuests(quests)
    }
  }, [user])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <PageHeader
        greenSubtitle="Let's get to work"
        header="Quests"
        greySubtitle="Your current quests"
      />
      <Container>
        <Grid container columnSpacing={4} rowSpacing={4} sx={{ mb: 20 }}>
          <Grid item xs={4}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: "100%",
                backgroundColor: "#C01048",
                height: "296px",
              }}
            >
              <Image
                src="/search-white.svg"
                width={180}
                height={180}
                alt="Search"
              />
            </Box>
            <Typography
              sx={{
                my: 0.5,
                fontWeight: 500,
                fontSize: "1.25rem",
                lineHeight: "1.875rem",
              }}
            >
              Find a new quest
            </Typography>
            <Typography
              sx={{
                color: "#C01048",
                fontWeight: 400,
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
              }}
            >
              Explore all available quests
            </Typography>
          </Grid>

          {user?.uid && currentQuests?.length ? (
            <>
              {currentQuests.map((hit, idx) => (
                <Grid item xs={4}>
                  <QuestThumbnail
                    storagePath={`general/${hit?.image}`}
                    alt="quest picture"
                  />
                  <Typography
                    sx={{
                      my: 0.5,
                      fontWeight: 500,
                      fontSize: "1.25rem",
                      lineHeight: "1.875rem",
                    }}
                  >
                    {hit?.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#C01048",
                      fontWeight: 400,
                      fontSize: "1.125rem",
                      lineHeight: "1.75rem",
                    }}
                  >
                    status: {hit?.status}
                  </Typography>
                </Grid>
              ))}
            </>
          ) : (
            <Grid item xs={8}>
              <Box
                sx={{
                  width: "100%",
                  height: "296px",
                  border: "grey solid 2px",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  sx={{
                    my: 0.5,
                    fontWeight: 500,
                    fontSize: "1.25rem",
                    lineHeight: "1.875rem",
                  }}
                >
                  Please <Link href="/signin">sign in </Link> to view current
                  quests.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
      <Footer />
    </Box>
  )
}
