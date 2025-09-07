import type { BigNumberish } from "ethers"

export interface Occasion {
  id: string | number
  name: string
  cost: BigNumberish
  maxTickets: BigNumberish
  date: string
  time: string
  location: string
}
