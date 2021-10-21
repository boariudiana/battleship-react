import React from "react";

import '../styles/Board.css'

const getCharacter = number => String.fromCharCode(number+ 65);

const getCellStrings = () => {
    const result = [];


    for(let i = 0; i<=9; i++){
     for (let j = 0; j <= 9; j++){
         const numberChar = i+1;
         const letterCharacter = getCharacter(j)
         result.push(`${numberChar.toString()}${letterCharacter}`)
     }
    };
    return result;
}



const Board = props => {
    const cells = getCellStrings().map((cell, index) => <div key={index}>{cell}</div>);

    return (<div className={'board'}>
                {cells}
            </div>)

};

export default Board;