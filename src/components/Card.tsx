import { ethers } from "ethers";
import type { Occasion } from "../types/Occasion";

interface CardProps {
  occasion: Occasion;
  toggle: boolean;
  setToggle: (value: boolean) => void;
  setOccasion: (occasion: Occasion) => void;
}

const Card: React.FC<CardProps> = ({
  occasion,
  toggle,
  setToggle,
  setOccasion,
}) => {
  const togglePop = () => {
    setOccasion(occasion);
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  return (
    <div className="card">
      <div className="card__info">
        <p className="card__date">
          <strong>{occasion.date}</strong>
          <br />
          {occasion.time}
        </p>

        <h3 className="card__name">{occasion.name}</h3>

        <p className="card__location">
          <small>{occasion.location}</small>
        </p>

        <p className="card__cost">
          <strong>
            {ethers.formatUnits(occasion.cost.toString(), "ether")}
          </strong>
          ETH
        </p>

        {occasion.maxTickets.toString() === "0" ? (
          <button type="button" className="card__button--out" disabled>
            Sold Out
          </button>
        ) : (
          <button
            type="button"
            className="card__button"
            onClick={() => togglePop()}
          >
            View Seats
          </button>
        )}
      </div>

      <hr />
    </div>
  );
};

export default Card;
