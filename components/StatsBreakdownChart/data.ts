const dummyUser = {
  Stats: {
    SpeedEfficiency: 80,
    Comm: 60,
    Rating: 95,
    Attentiveness: 20,
    Jobs: 40,
    MentorRating: 85,
    HoursWorked: 40,
  },
}

const labels = [
  "Speed Efficiency",
  "Comm",
  "Rating",
  "Attentiveness",
  "Jobs",
  "M. Rating",
  "H. Worked",
]

export const data = {
  labels: labels,
  datasets: [
    {
      data: [
        dummyUser.Stats.SpeedEfficiency,
        dummyUser.Stats.Comm,
        dummyUser.Stats.Rating,
        dummyUser.Stats.Attentiveness,
        dummyUser.Stats.Jobs,
        dummyUser.Stats.MentorRating,
        dummyUser.Stats.HoursWorked,
      ],
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 99, 132)",
      pointBackgroundColor: "rgb(255, 99, 132)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(255, 99, 132)",
    },
  ],
}
