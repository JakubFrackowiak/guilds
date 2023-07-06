import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  RadialLinearScale,
  Colors,
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
} from "chart.js"
import { data } from "./data"
import { Radar } from "react-chartjs-2"
import { Box, Divider, Stack, Typography } from "@mui/material"
import { SecondaryButton } from "components/SecondaryButton"
import Link from "next/link"

Chart.register(
  LineController,
  LineElement,
  PointElement,
  RadialLinearScale,
  CategoryScale,
  Filler,
  Colors,
  Title,
  Tooltip,
  Legend
)

export function StatsBreakdownChart() {
  const scales: object = {
    r: {
      beginAtZero: true,
      ticks: {
        backdropColor: "#F2F4F7",
        color: "#344054",
        font: {
          size: 14,
          weight: 400,
        },
        stepSize: 20,
        max: 100,
        min: 0,
      },
      grid: {
        color: "#F2F4F7",
      },
      pointLabels: {
        color: "#667085",
        padding: 10,
        font: {
          weight: 500,
          size: 14,
        },
      },
    },
  }

  const options = {
    type: "radar",
    data: data,
    options: {
      responsive: true,
      radius: 0,
      padding: 20,
      maintainAspectRatio: false,
    },
    scales: scales,
    plugins: {
      legend: {
        display: false,
      },
    },
  }
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "fit-content",
        height: "100%",
        border: "1px solid",
        borderColor: (theme) => theme.palette.grey[200],
        borderRadius: "0.5rem",
        boxShadow: "0px 1px 3px 0px #1018281A",
      }}
    >
      <Box mt="2rem" ml="2rem" alignSelf="flex-start">
        <Typography variant="h6">Stats Breakdown</Typography>
      </Box>
      <Box width="25rem" height="25rem">
        <Radar data={data} options={options} />
      </Box>
      <Divider
        sx={{
          width: "100%",
        }}
      />
      <Box alignSelf="flex-end" py="1rem" px="1.5rem">
        <Link href="/stats">
          <SecondaryButton label="View full report" width="fit-content" />
        </Link>
      </Box>
    </Stack>
  )
}
