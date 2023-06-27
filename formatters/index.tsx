export const formatHour = (hour) => {
  return hour >= 12 ? hour - 12 + "pm" : hour + "am"
}

export const formatRate = (rate) => {
  return Math.floor(rate * 100) + "%"
}
