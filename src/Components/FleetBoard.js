import React, {useState} from 'react';
import Board from './Board';
import SelectShipDropDown from './SelectShipDropDown'
import DirectionDropDown from './DirectionDropdown';
import Alert from './CustomAlert';
import { indexToCoords , BOARD_COLUMNS, BOARD_ROWS, generateEmptyLayout, CELL_STATE, SHIPS } from './layouHelpers';
import { Button } from '@mui/material';

const FleetBoard = props => {

    const [direction, setDirection] = useState('horizontal')
    const [ship, setShip] = useState(SHIPS.warship);
    const [placedShips, setPlacedShips] = useState([]);
    const [isAlertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [boardCellStatus, setBoardCellStatus] = useState(generateEmptyLayout())

    const handleShipChange = (event) => {
        setShip(event.target.value);
    };

    const handleDirectionChange = (event) => {
        setDirection(event.target.value);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setAlertOpen(false);
    };


    const placeShip = (shipFirstCell, direction, cellNr) => {

        if (direction ==='horizontal') {
            const newCellStatus = boardCellStatus.map((cell, cellIndex) => {
                if (cellIndex >= shipFirstCell && cellIndex < shipFirstCell + cellNr) {
                    return {...cell, cellStatus: CELL_STATE.full,  };
                }
                return cell;
            })
            setBoardCellStatus(newCellStatus);
             
        };
        setPlacedShips()
    }

    const handleCellClick = (index) => {
        const cellNumbers = ship === 'warship' ? 5 : 4;

        const coord = indexToCoords(index);

        if(direction === 'horizontal'){
            const isPointOustide = coord.x + cellNumbers > BOARD_ROWS
            if (isPointOustide) {
                    setAlertOpen(true);
                    setAlertMessage(`Could not place ${ship} in horizontal direction. Please chose another cell or another direction`)
                    
                    return;
                }
            }
            
            if(direction === 'vertical'){
                const isPointOustide = coord.y + cellNumbers > BOARD_COLUMNS
                if (isPointOustide) {
                        setAlertOpen(true);
                        setAlertMessage(`Could not place ${ship} to verticaldirection. Please chose another cell or another direction`)
                        
                        return;
                    }
    
            };

            placeShip(index, direction, cellNumbers)
    };

    return (
        <React.Fragment>
            <Alert 
                message={alertMessage}
                onHandleClose={handleCloseAlert}
                isOpen={isAlertOpen}
            />
            <SelectShipDropDown 
                availableShips={['warship', 'distroyer1', 'distroyer2']}
                onHandleChange={handleShipChange}
                selectedShip={ship}
                />
            <DirectionDropDown
                onHandleChange = {handleDirectionChange}
                direction = {direction}
            />
            <Board 
                onHandleClick={handleCellClick}
                boardCells={boardCellStatus}
                />
            <Button variant='contained'>Start Game</Button>
        </React.Fragment>
    )}

export default FleetBoard;