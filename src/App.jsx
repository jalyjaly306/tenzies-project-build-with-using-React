import { useState, usefRef, useEffect } from 'react';
import Die from '../components/Die';
import { nanoid } from 'nanoid';

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);

  const gameWon = dice.every(die => die.isHeld) &&
      dice.every(die => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  })


  function generateAllNewDice() {
    return new Array(10)
              .fill(0)
              .map(() => (
                // A diceObj = {value, isHeld, id}
                {value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
                }
              ));
    // const newDice = [];
    // for (let i = 0; i < 10; i++) {
    //   const randNum = Math.floor(Math.random() * 6);
    //   newDice.push(randNum);
    // }
    // return newDice;
  }

  function handleRoll() {
    if (!GameWon) {
      // setDice(generateAllNewDice());
      setDice(oldDice => oldDice.map(die =>
        die.isHeld ?
          die :
          {...die, value: Math.ceil(Math.random() * 6)}
      )) 
      } else {
        setDice(generateAllNewDice)
        }
    }

  function hold(id) {
    setDice(oldDice => {
      return oldDice.map(die => {
        return die.id === id ?
          {...die, isHeld: !die.isHeld} :
          die
      })
    })
  }

  const DiceElements = dice.map(diceObj => 
        <Die 
        key={diceObj.id} 
        value={diceObj.value} 
        isHeld={diceObj.isHeld}
        hold={() => hold(diceObj.id)}
        // id={diceObj.id}
        />)

  return (
  <>
    <main>
      <div aria-live='polite' className='sr-only'>
        {gameWon && 
        <p>Congratulation! You won! Press "New Game" to start again.</p>
        }
      </div>
      <h1 className='title'>Tenzies</h1>
      <p className="instructions">Roll all dice are the same. Click each dice to freeze
      it at its current value between rolls.</p>
      <div className='dice-container'>
        {DiceElements}
      </div>
      <button ref={buttonRef} onClick={handleRoll} className="roll-btn">{gameWon ? "New Game" : "Roll"}</button>
    </main>
    </>
  )
}

export default App
