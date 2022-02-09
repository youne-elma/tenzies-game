import React, {useState,useEffect} from 'react'
//  Components
import Navbar from './components/Navbar'
import Die from './components/Die'
import Timer from './components/Timer'
import { nanoid } from 'nanoid'
// import Blop from './images/blop-scene3.svg'
// import Confetti
import Confetti from 'react-confetti'

function App() {
  const [dies, setDies] = useState(callNewDies());
  const [tenzies, setTenzies] = useState(false);
  /** times variables */
  const [time,setTime] = useState({m:0, s:0, ms:0})

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

  useEffect(() => {
    const allHeld = dies.every(die => die.isHeld);
    const firstValue = dies[0].value;
    const allSameValue = dies.every(die => die.value === firstValue);

    if(allHeld && allSameValue){
      setTenzies(true);
      console.log("You won!")
    }
  },[dies]);




  function toggleClick(){
    if(tenzies){
      setTenzies(false);
      setDies(callNewDies());
    }else{
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


                            /** Time Functions u can skip this !! */
  

  return (
    <>
      {tenzies && <Confetti />}
      <div className="hero">
          <Navbar />
        <div className="dies">
          {diesArray}
        </div>
        <div className="button-time">
          <Timer time={time}/>
          <button className="btn" onClick={() => toggleClick()}>{tenzies ? "New Game" : "Roll"}</button>
        </div>
      </div>
    </>
  );
}

export default App;
