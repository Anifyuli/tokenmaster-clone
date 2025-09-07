import { useEffect, useState } from "react";
import Seat from "./Seat";
import { X } from "lucide-react";
import type { Occasion } from "../types/Occasion";
import type { TokenMasterContract } from "../types/TokenMasterContract";
import type { BigNumberish, Signer} from "ethers";

interface TokenMaster extends TokenMasterContract {
  getSeatsTaken: (id: BigNumberish) => Promise<bigint[]>;
  mint: (occasionId: BigNumberish, seat: BigNumberish, options: { value: BigNumberish }) => Promise<{ wait: () => Promise<unknown> }>;
  getOccasion: (id: BigNumberish) => Promise<Occasion>;
  totalOccasions: () => Promise<bigint>;
}

interface Provider {
  getSigner: () => Promise<Signer>;
}

interface SeatChartProps {
  occasion: Occasion;
  tokenMaster: TokenMaster;
  provider: Provider;
  setToggle: (value: boolean) => void;
}

const SeatChart: React.FC<SeatChartProps> = ({
  occasion,
  tokenMaster,
  provider,
  setToggle,
}) => {
  const [seatsTaken, setSeatsTaken] = useState<bigint[] | false>(false);
  const [hasSold, setHasSold] = useState<boolean>(false);

  // Debug logging
  console.log("SeatChart received occasion:", occasion);
  console.log("Occasion name:", occasion.name);
  console.log("Occasion id:", occasion.id);

  const getSeatsTaken = async (): Promise<void> => {
    try {
      const seatsTaken = await tokenMaster.getSeatsTaken(occasion.id);
      setSeatsTaken(seatsTaken);
    } catch (error) {
      console.error("Error fetching seats taken:", error);
      setSeatsTaken([]);
    }
  };

  const buyHandler = async (seat: number): Promise<void> => {
    try {
      setHasSold(false);

      const signer = await provider.getSigner();
      const contractWithSigner = tokenMaster.connect(signer);
      const transaction = await contractWithSigner.mint(occasion.id, seat, { 
        value: occasion.cost 
      });
      
      await transaction.wait();
      setHasSold(true);
    } catch (error) {
      console.error("Error buying seat:", error);
    }
  };

  useEffect(() => {
    getSeatsTaken();
  }, [hasSold, getSeatsTaken]);

  // Calculate middle section seats with validation
  const maxTickets = Number(occasion.maxTickets);
  const middleSectionSeats = Math.max(0, maxTickets - 50); // Ensure non-negative

  // Add debug logging
  console.log("SeatChart received occasion:", occasion);
  console.log("maxTickets:", maxTickets);
  console.log("middleSectionSeats:", middleSectionSeats);

  // Handle case where maxTickets is 0 or invalid
  if (maxTickets <= 50) {
    console.warn("maxTickets is too small or invalid:", maxTickets);
    return (
      <div className="occasion">
        <div className="occasion__seating">
          <h1>{occasion.name} Seating Map</h1>
          <button onClick={() => setToggle(false)} className="occasion__close">
            <X />
          </button>
          <p>No seats available for this occasion.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="occasion">
      <div className="occasion__seating">
        <h1>{occasion.name} Seating Map</h1>

        <button onClick={() => setToggle(false)} className="occasion__close">
          <X />
        </button>

        <div className="occasion__stage">
          <strong>STAGE</strong>
        </div>

        {seatsTaken &&
          Array(25)
            .fill(1)
            .map((e, i) => (
              <Seat
                i={i}
                step={1}
                columnStart={0}
                maxColumns={5}
                rowStart={2}
                maxRows={5}
                seatsTaken={seatsTaken}
                buyHandler={buyHandler}
                key={i}
              />
            ))}

        <div className="occasion__spacer--1 ">
          <strong>WALKWAY</strong>
        </div>

        {seatsTaken &&
          middleSectionSeats > 0 &&
          Array(middleSectionSeats)
            .fill(1)
            .map((e, i) => (
              <Seat
                i={i}
                step={26}
                columnStart={6}
                maxColumns={15}
                rowStart={2}
                maxRows={15}
                seatsTaken={seatsTaken}
                buyHandler={buyHandler}
                key={i}
              />
            ))}

        <div className="occasion__spacer--2">
          <strong>WALKWAY</strong>
        </div>

        {seatsTaken &&
          Array(25)
            .fill(1)
            .map((e, i) => (
              <Seat
                i={i}
                step={Math.max(1, maxTickets - 24)} // Ensure positive step
                columnStart={22}
                maxColumns={5}
                rowStart={2}
                maxRows={5}
                seatsTaken={seatsTaken}
                buyHandler={buyHandler}
                key={i}
              />
            ))}
      </div>
    </div>
  );
};

export default SeatChart;
