interface SeatProps {
  i: number;
  step: number;
  columnStart: number;
  maxColumns: number;
  rowStart: number;
  maxRows: number;
  seatsTaken: bigint[];
  buyHandler: (seat: number) => void;
}

export const Seat: React.FC<SeatProps> = ({
  i,
  step,
  columnStart,
  maxColumns,
  rowStart,
  maxRows,
  seatsTaken,
  buyHandler,
}) => {
  const seatNumber = i + step;
  const isTaken = seatsTaken.includes(BigInt(seatNumber));

  return (
    <div
      onClick={() => buyHandler(seatNumber)}
      className={isTaken ? "occasion__seats--taken" : "occasion__seats"}
      style={{
        gridColumn: `${((i % maxColumns) + 1) + columnStart}`,
        gridRow: `${Math.ceil((i + 1) / maxRows) + rowStart}`,
      }}
    >
      {seatNumber}
    </div>
  );
};

export default Seat;
