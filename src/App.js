import './App.css';
import { useState, handleOnClick, useEffect } from 'react';
import History from "./components/History";

function determineWinner(board) {
  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let e = 0; e < winningPositions.length; e++) {
    const [a, b, c] = winningPositions[e];

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }

  return null;
}

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [board, setBoard] = useState(history[history.length - 1]);
  const [isXNext, setIsXNext] = useState(true);
  const winner = determineWinner(board);

  useEffect(() => {
    setBoard(history[history.length - 1]);
  }, [history]);

  const handleOnClick = (index) => {
    const copiedHistory = [...history];
    const copiedBoard = [...board];
    if (copiedBoard[index] || winner) return;
    copiedBoard[index] = isXNext ? "X" : "O";
    setIsXNext(!isXNext);
    setHistory([...copiedHistory, copiedBoard]);
  }

  const handleReset = () => {
    setHistory([new Array(9).fill(null)]);
    setIsXNext(true);
  };

  const handleChangeBoard = (board) => {
    setBoard(board);
  };

  
  const list = board.map((value, index) => <Tile value={value} idx={index} key={index} handleOnClick={handleOnClick} />)
  return (
    <div className="App">
      <Title winner={winner} turn={isXNext ? 'O' : 'X'} />
      <main className='Board'>
        {list}
      </main>
      <Historial />
      <History moves={history} handleTimeTravel={handleChangeBoard} />
      {/* <button onClick={handleReset}>Play Again</button> */}  
    </div>
  );
}


function Tile({ value, handleOnClick, idx }) {
  console.log(value)

  return (
    <button className='Tile' onClick={() => {
      handleOnClick(idx);
    }}>
      {value}
    </button>
  )
}


function Title({ winner, turn }) {
  return (
    <h5 className='Title'>
      {winner ? 'Winner: ' : 'Tic Tac Toe'} {winner && turn}
    </h5>
  )
}

function Historial() {
 /*  console.log('props', props) */
  return (
    <div className='Historial'>
       {"Game Historial"} 
    </div>
  )

}

export default App;


