import { Bid } from "types/quest"

export const formatHour = (hour: number) => {
  return hour >= 12 ? hour - 12 + " p.m." : hour + " a.m."
}

export const formatRate = (rate: number) => {
  return Math.floor(rate * 100) + "%"
}

export const formatBid = (bid: Bid) => {
  const { currency, totalBidValue } = bid
  return currency == "%" ? totalBidValue + currency : currency + totalBidValue
}
