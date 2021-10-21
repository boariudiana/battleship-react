import React from "react";

import '../styles/Board.css'

const getCharacter = number => String.fromCharCode(number+ 65);

const getCellStrings = () => {
    const result = [];


    for(let i = 0; i<=9; i++){
     for (let j = 0; j <= 9; j++){
         const letterCharacter = getCharacter(j)
         result.push(`${i}${letterCharacter}`)
     }
    };
    return result;
}



const Board = props => {
    const cells = getCellStrings().map((cell, index) => <div key={index}><span>{cell}</span></div>);

    return (<div className={'board'}>
                {cells}
            </div>)

};

export default Board;