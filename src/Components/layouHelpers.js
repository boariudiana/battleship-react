export const BOARD_ROWS = 10;
export const BOARD_COLUMNS = 10;

export const coordsToIndex = coordinates => {
    const { x, y } = coordinates;
  
    return y * BOARD_ROWS + x;
};
  
export const indexToCoords = index => {
    return {
      x: index % BOARD_ROWS,
      y: Math.floor(index / BOARD_ROWS),
    };
};

export const CELL_STATE = {
    empty: 'empty',
    full: 'full',
    hit: 'hit',
    miss: 'miss',
    ship_sunk: 'ship-sunk',
    forbidden: 'forbidden',
};
const getCharacter = number => String.fromCharCode(number+ 65);

export const generateEmptyLayout = () => {
        const result = [];


        for(let i = 0; i<=9; i++){
        for (let j = 0; j <= 9; j++){
            const numberChar = i+1;
            const letterCharacter = getCharacter(j);
            result.push({value : `${numberChar.toString()}${letterCharacter}`, cellStatus: CELL_STATE.empty});
        }
        };
        return result;
};

export const SHIPS = {
    warship : 'warship',
    distroyer1 : 'distroyer1',
    distroyer2 : 'distroyer2',
}

export const ALLSHIPS = [SHIPS.warship, SHIPS.distroyer1, SHIPS.distroyer2]

const generateRandomNumber = (min, max) =>  {
    return Math.floor(Math.random() * (max - min) + min);
      };

const generateShip = (isShipPlaced, cells, cellNumbers) => {
    const point = generateRandomNumber(0, 99);
    const direction = generateRandomNumber(0, 99) % 2 === 0 ? 'horizontal' : 'vertical';

    const coord = indexToCoords(point);

        if(direction === 'horizontal'){
            const isPointOustide = coord.x + cellNumbers > BOARD_ROWS
            if (isPointOustide) {
                    
                    return {
                        placed: false,
                        newCells : cells,
                    };
                };
            
            const shipCells= cells.filter((cell, indexOfCell)=> (indexOfCell >= point && indexOfCell < point + cellNumbers) )
            
            const arePointsUnavailable = shipCells.filter(item => item.cellStatus !== CELL_STATE.empty).length > 0;

            if (arePointsUnavailable) {
                return {
                    placed: false,
                        newCells : cells,
                };
            }
            };
            
            if(direction === 'vertical'){
                const isPointOustide = coord.y + cellNumbers > BOARD_COLUMNS
                if (isPointOustide) {
                    return {
                        placed: false,
                        newCells : cells,
                    };
                }
                let incrementer = 0;
                let iteration = 0

                const shipCells = cells.filter((cell, indexOfCell) => {
                    if ( indexOfCell === point + incrementer && iteration < cellNumbers){
                        incrementer = incrementer + 10;
                        iteration ++ ;
                        return true;
                    }
                    return false;
                 });
                
            
                const arePointsUnavailable = shipCells.filter(item => item.cellStatus !== CELL_STATE.empty).length > 0;
        
                if (arePointsUnavailable) {
                    return {
                        placed: false,
                        newCells : cells,
                    };
                }
    
            };
    //can place ship
    if (direction ==='horizontal') {
        const newCellStatus = cells.map((cell, cellIndex) => {
            if (cellIndex >= point && cellIndex < point + cellNumbers) {
                return {...cell, cellStatus: CELL_STATE.full,  };
            }
            return cell;
        })
        return {
            placed: true,
            newCells : newCellStatus,
        }; 
         
    } else {
        let incrementer = 0;
        let iteration = 0
        const newCellStatus = cells.map((cell, cellIndex) => {
            if (cellIndex === point + incrementer && iteration < cellNumbers) {
                incrementer = incrementer + 10;
                iteration ++;
                return {...cell, cellStatus: CELL_STATE.full,  };
            }
            return cell;
        })
        return {
            placed: true,
            newCells : newCellStatus,
        };
    };
    

}

export const generateComputerShips = () => {
    let cells = [...generateEmptyLayout()];
    let isShipPlaced = false;
    while(isShipPlaced === false ) {
        const {placed, newCells} = generateShip(isShipPlaced, cells, 5)
        console.log(placed)
        isShipPlaced = placed;
        if(isShipPlaced === true) {
            cells = [...newCells];
        }
    }

    isShipPlaced  = false;
    while(isShipPlaced === false ) {
        const {placed, newCells} = generateShip(isShipPlaced, cells, 4)
        isShipPlaced = placed;
        if(isShipPlaced === true) {
            cells = [...newCells];
        }
    }

    isShipPlaced  = false;
    while(isShipPlaced === false ) {
        const {placed, newCells} = generateShip(isShipPlaced, cells, 4)
        isShipPlaced = placed;
        if(isShipPlaced) {
            cells = [...newCells];
        }
    }
  console.log(cells)
    return [...cells]
}
   