import { Bid } from "types/quest"

export const formatHour = (hour: number) => {
  return hour >= 12 ? hour - 12 + " p.m." : hour + " a.m."
}

export const formatRate = (rate: number) => {
  return Math.floor(rate * 100) + "%"
}

export const formatDate = (date) => {
  return date == "ongoing"
    ? "Present"
    : new Date(date as any).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      })
}

export const formatBid = (bid: Bid) => {
  const { currency, totalBidValue } = bid
  return currency == "%" ? totalBidValue + currency : currency + totalBidValue
}

export const formatColor = (percentage: number) => {
  const minRGB = [192, 16, 72]
  const maxRGB = [254, 163, 180]
  const rgb = minRGB.map((color, i) => {
    const diff = maxRGB[i] - color
    return Math.round(maxRGB[i] - (diff * percentage) / 100)
  })
  const h = rgb[0] * 0x10000 + rgb[1] * 0x100 + rgb[2] * 0x1
  return "#" + ("000000" + h.toString(16)).slice(-6)
}
