import { Quest, Bid } from "./quest"
import { URL, Email, ISODateString, UUID } from "./common"

export interface Hero {
  id?: string
  profilePicture?: URL
  email?: Email // only readable by signed in users
  name?: Name
  location?: Location
  userName?: string
  bio?: string
  twitter?: URL
  linkedin?: URL
  website?: URL
  bids?: Bid[]
  quests?: Quest[] // only readable by signed in users
  portfolio?: URL[]
  experience?: Experience[]
  rating?: number
  isMentor?: boolean
  mentor?: Mentor
  isApprentice?: boolean
  apprentice: Apprentice
  xp?: string
  level?: string
}

export type Mentor = {
  bio: string
  skill: string
  maxRate: string
  minRate: string
}

export interface Apprentice {
  rate: number
  workingHours: {
    start: number
    end: number
  }
  mentor: string
  favoriteTo: string[]
}

export type Location = {
  city: string
  country: string
}

export type Experience = {
  position: string
  company: string
  startDate: ISODateString
  endDate: ISODateString
}

export type Name = {
  first: string
  second: string
  last: string
}

export interface Transaction {
  id: UUID
  amount: string
  userId: UUID
  description: string
  date: Date
}
