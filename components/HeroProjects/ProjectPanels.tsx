import { Grid } from "@mui/material"
import React, { useState } from "react"
import { Project } from "./Project"

export interface ProjectType {
  image: string
  name: string
  id: number
}

interface SubjectType {
  subject: string
  projects: ProjectType[]
}

interface ProjectPanelsProps {
  projects: SubjectType[]
  subject: string
}

export function ProjectPanels({ projects, subject }: ProjectPanelsProps) {
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <Grid container p="-1rem">
      {subject === "View all"
        ? projects.map((subject: SubjectType, index) => (
            <React.Fragment key={index}>
              {subject.projects.map((project: ProjectType, idx) => (
                <Project
                  key={idx}
                  project={project}
                  hoveredProject={hoveredProject}
                  setHoveredProject={setHoveredProject}
                />
              ))}
            </React.Fragment>
          ))
        : projects
            .filter((sub: SubjectType) => sub.subject == subject)[0]
            .projects.map((project: ProjectType, idx) => (
              <Project
                key={idx}
                project={project}
                hoveredProject={hoveredProject}
                setHoveredProject={setHoveredProject}
              />
            ))}
    </Grid>
  )
}
