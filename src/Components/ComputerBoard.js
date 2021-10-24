import React from "react";
import { CELL_STATE } from "./layouHelpers";

import "../styles/Board.css";

const UserBoard = (props) => {
  const cells = props.boardCells.map((cell, index) => (
    <div
      key={index}
      className={cell.cellStatus === CELL_STATE.full ? "filledColor" : ""}
      onClick={() => props.onHandleClick(index)}
    >
      {cell.value}
    </div>
  ));
  return <div className={"board"}>{cells}</div>;
};

export default UserBoard;
