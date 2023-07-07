import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Stack } from "@mui/material"

ChartJS.register(ArcElement, Tooltip, Legend)

export const data = {
  labels: ["Work in Progress", "In Review", "Pending", "Available"],
  datasets: [
    {
      label: "balance",
      data: [12, 19, 3, 5],
      backgroundColor: ["#A11043", "#C01048", "#E31B54", "#FFF1F3"],
      borderWidth: 0,
    },
  ],
}

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
}

export function DoughnutChart() {
  return (
    <Stack
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: (theme) => theme.palette.grey[200],
        borderRadius: "0.5rem",
        height: "10rem",
        alignItems: "center",
        boxShadow: "0px 1px 3px 0px #1018281A",
      }}
    >
      <Doughnut data={data} options={options} />
    </Stack>
  )
}
