import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { faker } from "@faker-js/faker"
import { Box } from "@mui/material"
import { formatColor } from "formatters"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  radius: 0,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      title: {
        display: true,
        text: "Hourly Rate",
        font: {
          size: 14,
          family: "Plus Jakarta Sans",
        },
      },
      ticks: {
        callback: function (value, index) {
          return index % 2 === 0 ? labels[index] : ""
        },
      },
    },
    y: {
      grid: {
        display: false,
      },
      title: {
        display: true,
        text: "Similar Jobs @ this level",
        font: {
          size: 14,
          family: "Plus Jakarta Sans",
        },
      },
      ticks: {
        display: false,
      },
    },
  },
}

const labels = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  100, 105, 110, 115, 120,
]

const values = labels.map(() => faker.datatype.number({ min: 0, max: 1000 }))

const colors = values.map((value) => {
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const range = maxValue - minValue
  const percentage = (value - minValue) / range
  return formatColor(percentage * 100)
})

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 2",
      data: values,
      backgroundColor: colors,
      borderRadius: 6,
    },
  ],
}

export function BarChart() {
  // Define the query to filter jobs with similar skill levels

  return (
    <Box
      sx={{
        position: "relative",
        height: "18rem",
      }}
    >
      <Bar options={options} data={data} />
    </Box>
  )
}
