import { Box, ListItemButton, Stack, Tabs, Typography } from "@mui/material"

export function ProjectTabs({ projects, setSubject, subject }) {
  const refinementItemStyle = (condition: boolean) => ({
    bgcolor: condition ? "primary.light" : "background.main",
    color: condition ? "primary.dark" : "text.secondary",
    borderRadius: "0.5rem",
  })

  return (
    <Tabs value={subject} aria-label="basic tabs example">
      <Stack spacing={2} direction="row">
        <Box onClick={() => setSubject("View all")}>
          <ListItemButton sx={refinementItemStyle("View all" == subject)}>
            <Typography variant="body1" fontWeight={500}>
              View all
            </Typography>
          </ListItemButton>
        </Box>
        {projects.map((project, idx) => (
          <Box onClick={() => setSubject(project.subject)} key={idx}>
            <ListItemButton
              sx={refinementItemStyle(project.subject == subject)}
            >
              <Typography variant="body1" fontWeight={500}>
                {project.subject}
              </Typography>
            </ListItemButton>
          </Box>
        ))}
      </Stack>
    </Tabs>
  )
}
