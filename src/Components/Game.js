import React, {useEffect, useState} from 'react';
import UserBoard from './UserBoard';
import ComputerBoard from './ComputerBoard'
import SelectShipDropDown from './SelectShipDropDown'
import DirectionDropDown from './DirectionDropdown';
import Alert from './CustomAlert';
import { indexToCoords , BOARD_COLUMNS, BOARD_ROWS, generateEmptyLayout, CELL_STATE, SHIPS, ALLSHIPS } from './layouHelpers';
import { Button } from '@mui/material';
import '../styles/Game.css';

const generateRandomNumber = (min, max) =>  {
    return Math.floor(Math.random() * (max - min) + min);
      };
const generateRandomPointAndDir = () => {
    const point = generateRandomNumber(0, 99);
    const direction = generateRandomNumber(0, 99) % 2 === 0 ? 'horizontal' : 'vertical';

    return {
        point,
        direction,
    }
}

const Game = props => {

    const [direction, setDirection] = useState('horizontal')
    const [placedShips, setPlacedShips] = useState([]);
    const [availableShips, setAvailableShips] = useState(ALLSHIPS)
    const [ship, setShip] = useState(SHIPS.warship);
    const [isAlertOpen, setAlertOpen] = useState(false)
    const [disabledShips, setDisabledShips] = useState([])
    const [alertMessage, setAlertMessage] = useState('')
    const [userCells, setUserCells] = useState(generateEmptyLayout());
    const [computerCells , setComputerCells] = useState(generateEmptyLayout());
    const [readyToStart, setReadyToStart] = useState(false);
    const [enableClickOnBoard, setEnableClickOnBoard] =useState(false);

    useEffect(() => {
        if(availableShips.length === 0){
            setShip('')
            setReadyToStart(true)
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

    const handleCompBoardClick = (index) => {
        
    };

    const generateShip = (availableShipNr, cellNumbers) => {
        const data = generateRandomPointAndDir();
        console.log('point', data.point)
        console.log('direction', data.direction)

        const coord = indexToCoords(data.point);

        if(data.direction === 'horizontal'){
            const isPointOustide = coord.x + cellNumbers > BOARD_ROWS
            if (isPointOustide) {
                    return availableShipNr;
                };
            
            const shipCells= computerCells.filter((cell, indexOfCell)=> (indexOfCell >= data.point && indexOfCell < data.point + cellNumbers) )
            
            const arePointsUnavailable = shipCells.filter(item => item.cellStatus !== CELL_STATE.empty).length > 0;

            if (arePointsUnavailable) {
                return availableShipNr;
            }
            };
        
            if(data.direction === 'vertical'){
                const isPointOustide = coord.y + cellNumbers > BOARD_COLUMNS
                if (isPointOustide) {
                        return availableShipNr;
                    }
                let incrementer = 0;
                let iteration = 0

                const shipCells = computerCells.filter((cell, indexOfCell) => {
                    if ( indexOfCell === data.point + incrementer && iteration < cellNumbers){
                        incrementer = incrementer + 10;
                        iteration ++ ;
                        return true;
                    }
                    return false;
                 });
                
                const arePointsUnavailable = shipCells.filter(item => item.cellStatus !== CELL_STATE.empty).length > 0;
        
                if (arePointsUnavailable) {
                    return availableShipNr;
                }
            }

                setComputerCells(prevState => {
                    if (data.direction ==='horizontal') {
                        const newCellStatus = prevState.map((cell, cellIndex) => {
                            if (cellIndex >= data.point && cellIndex < data.point + cellNumbers) {
                                return {...cell, cellStatus: CELL_STATE.full,  };
                            }
                            return cell;
                        })
                        return newCellStatus;
                         
                    } 
                    if(data.direction === 'vertical') {
                        let incrementer = 0;
                        let iteration = 0
                        const newCellStatus = prevState.map((cell, cellIndex) => {
                            if (cellIndex === data.point + incrementer && iteration < cellNumbers) {
                                incrementer = incrementer + 10;
                                iteration ++;
                                return {...cell, cellStatus: CELL_STATE.full};
                            }
                            return cell;
                        })
                            return newCellStatus; 
                    };


                })
                console.log('computerCells',computerCells)
                return availableShipNr + 1;

    }
    const placeComputerShips = () => {
        let warship = 0;
        while(warship <= 0){
            warship = generateShip(warship, 5);
        };

        let distroyer1 = 0;
        while(distroyer1 <= 0) {
            distroyer1 = generateShip(distroyer1, 4)
        };
        let distroyer2 = 0;
        while(distroyer2 <= 0) {
            distroyer2 = generateShip(distroyer2, 4)
        };

        return;
    }

    const handleStartGame = () => {
        placeComputerShips();
        setEnableClickOnBoard(true)
    };

    const placeShip = (shipFirstCell, direction, cellNr) => {

        if (direction ==='horizontal') {
            const newCellStatus = userCells.map((cell, cellIndex) => {
                if (cellIndex >= shipFirstCell && cellIndex < shipFirstCell + cellNr) {
                    return {...cell, cellStatus: CELL_STATE.full,  };
                }
                return cell;
            })
            setUserCells(newCellStatus); 
             
        } else {
            let incrementer = 0;
            let iteration = 0
            const newCellStatus = userCells.map((cell, cellIndex) => {
                if (cellIndex === shipFirstCell + incrementer && iteration < cellNr) {
                    incrementer = incrementer + 10;
                    iteration ++;
                    return {...cell, cellStatus: CELL_STATE.full,  };
                }
                return cell;
            })
                setUserCells(newCellStatus); 
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
            
            const shipCells= userCells.filter((cell, indexOfCell)=> (indexOfCell >= index && indexOfCell < index + cellNumbers) )
            
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
                        setAlertMessage(`Could not place ${ship} in vertical direction. Please chose another cell or another direction`)
                        
                        return;
                    }
                let incrementer = 0;
                let iteration = 0

                const shipCells = userCells.filter((cell, indexOfCell) => {
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
        <div className={'gameView'}>
            <Alert 
                message={alertMessage}
                onHandleClose={handleCloseAlert}
                isOpen={isAlertOpen}
            />
            <SelectShipDropDown 
                className={'select'}
                disabledShips={disabledShips}
                availableShips={availableShips}
                onHandleChange={handleShipChange}
                selectedShip={ship}
                />
            <DirectionDropDown
                className={'select'}
                onHandleChange = {handleDirectionChange}
                direction = {direction}
            />
            <div className={'boards'}>
            <UserBoard 
                onHandleClick={handleCellClick}
                boardCells={userCells}
                disabledClick = {placedShips.length === 3}
                />
            <ComputerBoard
                boardCells = {computerCells}
                onHandleClick = {enableClickOnBoard ? handleCompBoardClick : ()=>{}}/>
            </div>
            {readyToStart && <Button 
                variant='contained'
                onClick = {handleStartGame}>Start Game</Button>}
        </div>
    )}

export default Game;