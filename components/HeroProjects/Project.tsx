import { Grid, Stack, Typography } from "@mui/material"
import Image from "next/image"
import { ProjectType } from "./ProjectPanels"

interface ProjectProps {
  project: ProjectType
  hoveredProject: number
  setHoveredProject: (value: number) => void
}

export function Project({
  project,
  hoveredProject,
  setHoveredProject,
}: ProjectProps) {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      position="relative"
      sx={{ aspectRatio: "16 / 9" }}
      onMouseEnter={() => setHoveredProject(project.id)}
      onMouseLeave={() => setHoveredProject(null)}
    >
      <Image
        src={project.image}
        alt="project image"
        layout="fill"
        objectFit="cover"
        style={{ padding: "1rem" }}
      />
      {hoveredProject == project.id ? (
        <Stack
          position="absolute"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
          bgcolor="rgb(0,0,0,0.3)"
        >
          <Typography variant="h3" fontWeight={600} color="text.primary">
            {project.name}
          </Typography>
        </Stack>
      ) : null}
    </Grid>
  )
}
