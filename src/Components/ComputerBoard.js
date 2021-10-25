import React from "react";
import { CELL_STATE } from "./layouHelpers";

import "../styles/Board.css";

const UserBoard = (props) => {
  const getColorClass = (cellStatus) => {
    if (cellStatus === CELL_STATE.full) {
      return "filledColor";
    } else if (cellStatus === CELL_STATE.hit) {
      return "hit";
    } else if (cellStatus === CELL_STATE.miss) {
      return "miss";
    } else {
      return "";
    }
  };

  const cells = props.boardCells.map((cell, index) => (
    <div
      key={index}
      className={getColorClass(cell.cellStatus)}
      onClick={() => props.onHandleClick(index)}
    >
      {cell.value}
    </div>
  ));
  return (
    <div>
      <h3>ComputerBoard</h3>
      <div className={"board"}>{cells} </div>
    </div>
  );
};

export default UserBoard;
