import { Box, Tab, Tabs, Stack, Typography } from "@mui/material"

export function ApprenticeTabs({ tab, setTab }) {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    }
  }
  return (
    <Stack spacing={2} my={2}>
      <Typography variant="h4">Lancer Apprentices</Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange} aria-label="apprentice tabs">
          <Tab
            label="Overview"
            {...a11yProps(0)}
            sx={{ textTransform: "none" }}
          />
          <Tab label="Table" {...a11yProps(1)} sx={{ textTransform: "none" }} />
          <Tab
            label="List view"
            {...a11yProps(2)}
            sx={{ textTransform: "none" }}
          />
          <Tab
            label="Segment"
            {...a11yProps(3)}
            sx={{ textTransform: "none" }}
          />
          <Tab
            label="Custom"
            {...a11yProps(4)}
            sx={{ textTransform: "none" }}
          />
        </Tabs>
      </Box>
    </Stack>
  )
}
