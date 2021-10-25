import React, { useCallback, useEffect, useState } from "react";
import UserBoard from "./UserBoard";
import ComputerBoard from "./ComputerBoard";
import SelectShipDropDown from "./SelectShipDropDown";
import DirectionDropDown from "./DirectionDropdown";
import Alert from "./CustomAlert";
import {
  indexToCoords,
  BOARD_COLUMNS,
  BOARD_ROWS,
  generateEmptyLayout,
  CELL_STATE,
  SHIPS,
  ALLSHIPS,
  generateComputerShips,
  generateRandomNumber,
} from "./layouHelpers";
import { Button } from "@mui/material";
import "../styles/Game.css";

const validateShut = (point, board) => {
  const target = board.find((item, index) => index === point);
  console.log(target);
  if (
    target.cellStatus === CELL_STATE.miss ||
    target.cellStatus === CELL_STATE.hit ||
    target.cellStatus === CELL_STATE.forbidden
  ) {
    return true;
  }
  return false;
};

const Game = (props) => {
  const [direction, setDirection] = useState("horizontal");
  const [placedShips, setPlacedShips] = useState([]);
  const [availableShips, setAvailableShips] = useState(ALLSHIPS);
  const [ship, setShip] = useState(SHIPS.warship);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [disabledShips, setDisabledShips] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [userCells, setUserCells] = useState(generateEmptyLayout());
  const [computerCells, setComputerCells] = useState(generateComputerShips());
  const [startButtonEnabled, setStartButtonEnabled] = useState(false);
  const [turn, setTurn] = useState("user");
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    if (availableShips.length === 0) {
      setShip("");
      setStartButtonEnabled(true);
    } else {
      setShip(availableShips[0]);
    }
  }, [availableShips]);

  const handleComputerShut = useCallback(() => {
    let shut = generateRandomNumber(0, 99);

    while (validateShut(shut, userCells)) {
      shut = generateRandomNumber(0, 99);
    }

    setUserCells((prevState) =>
      prevState.map((item, index) => {
        if (index === shut) {
          if (item.cellStatus === CELL_STATE.empty) {
            return { ...item, cellStatus: CELL_STATE.miss, value: "O" };
          } else if (item.cellStatus === CELL_STATE.full) {
            return { ...item, cellStatus: CELL_STATE.hit, value: "X" };
          } else {
            return { ...item, cellStatus: CELL_STATE.forbidden };
          }
        }
        return item;
      })
    );

    switchTurn();
  }, [userCells]);

  useEffect(() => {
    if (turn === "computer") {
      handleComputerShut();
    }
  }, [turn, handleComputerShut]);

  const handleShipChange = (event) => {
    setShip(event.target.value);
  };

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const switchTurn = () => {
    setTurn((prevState) => (prevState === "user" ? "computer" : "user"));
  };

  const handleShut = (point) => {
    //user turn

    if (validateShut(point, computerCells)) {
      return;
    }
    setComputerCells((prevState) =>
      prevState.map((item, index) => {
        if (index === point) {
          if (item.cellStatus === CELL_STATE.empty) {
            return { ...item, cellStatus: CELL_STATE.miss, value: "O" };
          } else if (item.cellStatus === CELL_STATE.full) {
            return { ...item, cellStatus: CELL_STATE.hit, value: "X" };
          } else {
            setAlertOpen(true);
            setAlertMessage(`Forbidden`);
            setTurn("user");
            return { ...item, cellStatus: CELL_STATE.forbidden };
          }
        }
        return item;
      })
    );

    switchTurn();
  };

  const handleStartGame = () => {
    setStartButtonEnabled(false);
    setIsGameStarted(true);
  };

  const placeShip = (shipFirstCell, direction, cellNr) => {
    if (direction === "horizontal") {
      const newCellStatus = userCells.map((cell, cellIndex) => {
        if (cellIndex >= shipFirstCell && cellIndex < shipFirstCell + cellNr) {
          return { ...cell, cellStatus: CELL_STATE.full };
        }
        return cell;
      });
      setUserCells(newCellStatus);
    } else {
      let incrementer = 0;
      let iteration = 0;
      const newCellStatus = userCells.map((cell, cellIndex) => {
        if (cellIndex === shipFirstCell + incrementer && iteration < cellNr) {
          incrementer = incrementer + 10;
          iteration++;
          return { ...cell, cellStatus: CELL_STATE.full };
        }
        return cell;
      });
      setUserCells(newCellStatus);
    }

    setPlacedShips((prevPlasedShips) => prevPlasedShips.concat(ship));
    setAvailableShips((prevShips) => prevShips.filter((item) => item !== ship));
    setDisabledShips((prevPlasedShips) => prevPlasedShips.concat(ship));
  };

  const handleCellClick = (index) => {
    const cellNumbers = ship === "warship" ? 5 : 4;

    const coord = indexToCoords(index);

    if (direction === "horizontal") {
      const isPointOustide = coord.x + cellNumbers > BOARD_ROWS;
      if (isPointOustide) {
        setAlertOpen(true);
        setAlertMessage(
          `Could not place ${ship} in horizontal direction. Please chose another cell or another direction`
        );

        return;
      }

      const shipCells = userCells.filter(
        (cell, indexOfCell) =>
          indexOfCell >= index && indexOfCell < index + cellNumbers
      );

      const arePointsUnavailable =
        shipCells.filter((item) => item.cellStatus !== CELL_STATE.empty)
          .length > 0;

      if (arePointsUnavailable) {
        setAlertOpen(true);
        setAlertMessage(
          `Could not place ${ship}. Please chose another cell or another direction`
        );
        return;
      }
    }

    if (direction === "vertical") {
      const isPointOustide = coord.y + cellNumbers > BOARD_COLUMNS;
      if (isPointOustide) {
        setAlertOpen(true);
        setAlertMessage(
          `Could not place ${ship} in vertical direction. Please chose another cell or another direction`
        );

        return;
      }
      let incrementer = 0;
      let iteration = 0;

      const shipCells = userCells.filter((cell, indexOfCell) => {
        if (indexOfCell === index + incrementer && iteration < cellNumbers) {
          incrementer = incrementer + 10;
          iteration++;
          return true;
        }
        return false;
      });

      const arePointsUnavailable =
        shipCells.filter((item) => item.cellStatus !== CELL_STATE.empty)
          .length > 0;

      if (arePointsUnavailable) {
        setAlertOpen(true);
        setAlertMessage(
          `Could not place ${ship}. Please chose another cell or another direction`
        );
        return;
      }
    }

    placeShip(index, direction, cellNumbers);
  };

  return (
    <div className={"gameView"}>
      <Alert
        message={alertMessage}
        onHandleClose={handleCloseAlert}
        isOpen={isAlertOpen}
      />
      <SelectShipDropDown
        className={"select"}
        disabledShips={disabledShips}
        availableShips={availableShips}
        onHandleChange={handleShipChange}
        selectedShip={ship}
      />
      <DirectionDropDown
        className={"select"}
        onHandleChange={handleDirectionChange}
        direction={direction}
      />
      <div className={"boards"}>
        <UserBoard
          onHandleClick={handleCellClick}
          boardCells={userCells}
          disabledClick={placedShips.length === 3}
        />
        <ComputerBoard
          boardCells={computerCells}
          onHandleClick={
            turn === "user" && isGameStarted ? handleShut : () => {}
          }
        />
      </div>
      {startButtonEnabled && (
        <Button variant="contained" onClick={handleStartGame}>
          Start Game
        </Button>
      )}
    </div>
  );
};

export default Game;
