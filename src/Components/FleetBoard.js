import React, {useEffect, useState} from 'react';
import Board from './Board';
import SelectShipDropDown from './SelectShipDropDown'
import DirectionDropDown from './DirectionDropdown';
import Alert from './CustomAlert';
import { indexToCoords , BOARD_COLUMNS, BOARD_ROWS, generateEmptyLayout, CELL_STATE, SHIPS, ALLSHIPS } from './layouHelpers';
import { Button } from '@mui/material';


const FleetBoard = props => {

    const [direction, setDirection] = useState('horizontal')
    const [placedShips, setPlacedShips] = useState([]);
    const [availableShips, setAvailableShips] = useState(ALLSHIPS)
    const [ship, setShip] = useState(SHIPS.warship);
    const [isAlertOpen, setAlertOpen] = useState(false)
    const [disabledShips, setDisabledShips] = useState([])
    const [alertMessage, setAlertMessage] = useState('')
    const [boardCellStatus, setBoardCellStatus] = useState(generateEmptyLayout())

    useEffect(() => {
        if(availableShips.length === 0){
            setShip('')
        }else{
            setShip(availableShips[0]);
        }
    },[availableShips]);

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
             
        }else {
            let incrementer = 0;
            let iteration = 0
            const newCellStatus = boardCellStatus.map((cell, cellIndex) => {
                if (cellIndex === shipFirstCell + incrementer && iteration < cellNr) {
                    incrementer = incrementer + 10;
                    iteration ++;
                    return {...cell, cellStatus: CELL_STATE.full,  };
                }
                return cell;
            })
            setBoardCellStatus(newCellStatus);
             
        };
        
        setPlacedShips(prevPlasedShips => prevPlasedShips.concat(ship));
        setAvailableShips(prevShips => prevShips.filter(item => item !== ship));
        setDisabledShips(prevPlasedShips => prevPlasedShips.concat(ship));
    }

    const handleCellClick = (index) => {
        const cellNumbers = ship === 'warship' ? 5 : 4;

        const coord = indexToCoords(index);

        if(direction === 'horizontal'){
            const isPointOustide = coord.x + cellNumbers > BOARD_ROWS
            if (isPointOustide) {
                    setAlertOpen(true);
                    setAlertMessage(`Could not place ${ship} in horizontal direction. Please chose another cell or another direction`);
                    
                    return;
                };
            
            const shipCells= boardCellStatus.filter((cell, indexOfCell)=> (indexOfCell >= index && indexOfCell < index + cellNumbers) )
            
            const arePointsUnavailable = shipCells.filter(item => item.cellStatus !== CELL_STATE.empty).length > 0;

            if (arePointsUnavailable) {
                setAlertOpen(true);
                    setAlertMessage(`Could not place ${ship}. Please chose another cell or another direction`)
                return;
            }
            };
            
            if(direction === 'vertical'){
                const isPointOustide = coord.y + cellNumbers > BOARD_COLUMNS
                if (isPointOustide) {
                        setAlertOpen(true);
                        setAlertMessage(`Could not place ${ship} to verticaldirection. Please chose another cell or another direction`)
                        
                        return;
                    }
                let incrementer = 0;
                let iteration = 0

                const shipCells = boardCellStatus.filter((cell, indexOfCell) => {
                    if ( indexOfCell === index + incrementer && iteration < cellNumbers){
                        incrementer = incrementer + 10;
                        iteration ++ ;
                        return true;
                    }
                    return false;
                 });
                
            
                const arePointsUnavailable = shipCells.filter(item => item.cellStatus !== CELL_STATE.empty).length > 0;
        
                if (arePointsUnavailable) {
                    setAlertOpen(true);
                        setAlertMessage(`Could not place ${ship}. Please chose another cell or another direction`)
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
                disabledShips={disabledShips}
                availableShips={availableShips}
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
                disabledClick = {placedShips.length === 3}
                />
            <Button variant='contained'>Start Game</Button>
        </React.Fragment>
    )}

export default FleetBoard;