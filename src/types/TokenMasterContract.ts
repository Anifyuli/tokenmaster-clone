import type { BigNumberish, Signer } from "ethers"
import type { Occasion } from "./Occasion"

export interface TokenMasterContract {
  // View functions
  totalOccasions: () => Promise<bigint>
  getOccasion: (id: BigNumberish) => Promise<Occasion>
  getSeatsTaken: (id: BigNumberish) => Promise<bigint[]>
  hasBought: (occasionId: BigNumberish, buyer: string) => Promise<boolean>
  seatTaken: (occasionId: BigNumberish, seat: BigNumberish) => Promise<string>

  // Write functions
  mint: (occasionId: BigNumberish, seat: BigNumberish, options: { value: BigNumberish }) => Promise<{ wait: () => Promise<unknown> }>;
  list: (
    name: string,
    cost: BigNumberish,
    maxTickets: BigNumberish,
    date: string,
    time: string,
    location: string
  ) => Promise<string | number>
  withdraw: () => Promise<string | number>

  // Properties
  connect: (signer: Signer) => TokenMasterContract;
  owner: () => Promise<string>
  totalSupply: () => Promise<bigint>
}
