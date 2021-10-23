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