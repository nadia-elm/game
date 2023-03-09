import {useState, useEffect} from 'react';
import axios from 'axios';

import './App.css';



function App() {
  const [deckId, setDeckId] = useState("")
  const [remainingCards, setRemainingCards] = useState(0)
  const [cardImage, setCardImage ] = useState("")
  const [isDrawing, setIsDrawing ] = useState(false)
  const [intervalId, setIntervalId] = useState(null)

  //get deck id from API
  useEffect(() => {
    const getDeckId = async () => {
      const res = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      setDeckId(res.data.deck_id)
      setRemainingCards(res.data.remaining)
    }
    getDeckId()
  }, [])

  // draw a card from deck
  const drawCard = async () => {
    if(remainingCards > 0){
      setIsDrawing(true);
      const id = setInterval( async() => {
      const response = await axios.get(
       `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
);
      
      
      setCardImage(response.data.cards[0].image)
        setRemainingCards(response.data.remaining)

        if(response.data.remaining == 0){
          clearInterval(intervalId)
          setIsDrawing(false)
        }
      }, 1000)
      setIntervalId(id)
    }else{
      alert("no cards remaining !")
    }
  }
  // stop drawing cards 
  const stopDrawing = () => {
    clearInterval(intervalId)
    setIsDrawing(false)
  }

  
  

  return (
    <div className="App">
      <div>
        <img src={cardImage} alt="image" />
      
      </div>
      {isDrawing ? (
         <button  onClick={stopDrawing}>Stop Drawing</button> 
      ) : (
         <button  onClick={drawCard}>Start Drawing</button> 
      )

      }
     

      
    </div>
  );

}

export default App;
