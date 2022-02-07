import React, {useState} from 'react'
//  Components
import Navbar from './components/Navbar'
import Die from './components/Die'
import { nanoid } from 'nanoid'
// import Blop from './images/blop-scene3.svg'

function App() {
  const [dies, setDies] = useState(callNewDies());

  function callNewDies(){
    const newDies = []
    for(let i=0;i<10;i++){
      newDies.push({
        value: Math.floor(Math.random()*5+1),
        id: nanoid(),
        isHeld: false
      })
    }
    return newDies;
  }
  function toggleClick(){
    setDies(oldDies => oldDies.map(die => {
        if(die.isHeld){
          return die;
        }else{
          return {
            value: Math.floor(Math.random()*5+1),
            id: nanoid(),
            isHeld: false
          }
        }
    }))
  }

  function dieLock(id){
    setDies(oldDies => oldDies.map(die => {
      return die.id !== id ? die : {
        ...die,
        isHeld: !die.isHeld
      } 
    }))
  }

  const diesArray = dies.map(die => {
    return <Die 
      key={die.id} 
      id={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      dieLock={() => dieLock(die.id)}
    />
  })

  return (
    <>
     <div className="hero">
          <Navbar />
        <div className="dies">
          {diesArray}
        </div>
        <div className="button-time">
          <p className="chrono">Timer</p>
          <p className="best-time">Best Time= 00:00:00</p>
          <button className="btn" onClick={() => toggleClick()}>Roll</button>
        </div>
      </div>
    </>
  );
}

export default App;
