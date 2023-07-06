import {
  Chart,
  Colors,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { Box, Stack, Typography } from "@mui/material"

Chart.register(ArcElement, Filler, Colors, Title, Tooltip, Legend)

export interface StatsChartProps {
  percentage: number
}

export function StatsChart({ percentage }: StatsChartProps) {
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        label: "My First Dataset",
        data: [percentage, 100 - percentage],
        backgroundColor: ["#475467", "#F2F4F7"],
        hoverOffset: 4,
      },
    ],
  }

  const options = {
    type: "doughnut",
    data: data,
    cutout: "70%",
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  }
  return (
    <Stack>
      <Box height="10rem" width="10rem" position="relative">
        <Doughnut data={data} options={options} />
        <Typography
          top="50%"
          left="50%"
          variant="h6"
          sx={{ position: "absolute", transform: "translate(-50%, -50%)" }}
        >
          {percentage}%
        </Typography>
      </Box>
    </Stack>
  )
}
