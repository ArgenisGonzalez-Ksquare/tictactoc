import './App.css';
import { useState, handleOnClick } from 'react';

function determineWinner (board) {
    const winningPositions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ]

    for (let i = 0; i < winningPositions.length; i++){
      const [a,b,c] = winningPositions[i];
      
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }

  return null;
}

function App() {
  const [gameState, setGameState] = useState(new Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true);
  const winner = determineWinner(gameState);

  const handleOnClick = (i) =>{
    const newBoard = [...gameState];
    if(newBoard[i] || winner) return;
    newBoard[i] = isXNext ? 'X': "O";
    setIsXNext((prev) => !prev)
    setGameState(newBoard)
  }


  const list = gameState.map((value, index) => <Tile value={value} idx={index} key={index} handleOnClick={handleOnClick} />)
  console.log(list)
return (
    <div className="App">
      <Title winner={winner} turn= {isXNext ? 'O':'X'}/>
        <main className='Board'>
          
          {list}
        </main>
    </div>
  );
}


function Tile ({value, handleOnClick, idx}) { 

  return( 
     <button className= 'Tile' onClick={() => {
      handleOnClick(idx);
     }}>
        {value}
     </button>
     )
}


function Title({ winner, turn }) {
  console.log(winner, turn)
   return(
     <h5>
       {winner ? 'Winner: ': 'Tic Tac Toe'} {winner && turn}
    </h5>
    )
} 

export default App;


