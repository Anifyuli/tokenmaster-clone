// Assets
import { MoveDown } from "lucide-react";

const Sort = () => {
  return (
    <div className="sort">
      <div className="sort__select">
        <p>Select Your Genre</p>
        <MoveDown />
      </div>

      <div className="sort__select">
        <p>Select Your Dates</p>
        <MoveDown />
      </div>

      <div className="sort__select">
        <p>Select Your Distance</p>
        <MoveDown />
      </div>
    </div>
  );
};

export default Sort;
