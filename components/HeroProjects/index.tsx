import { Stack, Typography } from "@mui/material"
import { useState } from "react"
import { ProjectPanels } from "./ProjectPanels"
import { ProjectTabs } from "./ProjectTabs"

export function HeroProjects() {
  const [subject, setSubject] = useState("View all")
  const heroProjects = [
    {
      subject: "Product design",
      projects: [
        { image: "/placeholder-project1.png", name: "Lancr", id: 0 },
        { image: "/placeholder-project2.png", name: "Lancr", id: 1 },
        { image: "/placeholder-project3.png", name: "Lancr", id: 2 },
      ],
    },
    {
      subject: "Web design",
      projects: [
        { image: "/placeholder-project2.png", name: "Lancr", id: 3 },
        { image: "/placeholder-project3.png", name: "Lancr", id: 4 },
        { image: "/placeholder-project1.png", name: "Lancr", id: 5 },
      ],
    },
    {
      subject: "App design",
      projects: [
        { image: "/placeholder-project3.png", name: "Lancr", id: 6 },
        { image: "/placeholder-project2.png", name: "Lancr", id: 7 },
        { image: "/placeholder-project1.png", name: "Lancr", id: 8 },
      ],
    },
    {
      subject: "UX research",
      projects: [
        { image: "/placeholder-project2.png", name: "Lancr", id: 9 },
        { image: "/placeholder-project1.png", name: "Lancr", id: 10 },
        { image: "/placeholder-project3.png", name: "Lancr", id: 11 },
      ],
    },
  ]
  return (
    <Stack spacing={3}>
      <Typography variant="h6">Projects</Typography>
      <ProjectTabs
        projects={heroProjects}
        setSubject={setSubject}
        subject={subject}
      />
      <ProjectPanels projects={heroProjects} subject={subject} />
    </Stack>
  )
}
