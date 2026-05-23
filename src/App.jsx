import { useState } from 'react';
import Die from '../components/Die';
import { nanoid } from 'nanoid';

function App() {
  const [dice, setDice] = useState(generateAllNewDice());

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
    setDice(generateAllNewDice());
  }

  const DiceElements = dice.map(diceObj => 
        <Die 
        key={diceObj.id} 
        value={diceObj.value} 
        isHeld={diceObj.isHeld}
        />)

  return (
  <>
    <main>
      <div className='dice-container'>
        {DiceElements}
      </div>
      <button onClick={handleRoll} className="roll-btn">Roll</button>
    </main>
    </>
  )
}

export default App
