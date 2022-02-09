import { useEffect, useState } from 'react';
import './App.css';
import Alert from './components/Alert';
import Card from './components/Card';

const card_data = [
  { src: "./img/card-1.png", is_matched: false },
  { src: "./img/card-2.png", is_matched: false },
  { src: "./img/card-3.png", is_matched: false },
  { src: "./img/card-4.png", is_matched: false },
  { src: "./img/card-5.png", is_matched: false },
  { src: "./img/card-6.png", is_matched: false }
];

function App() {
  const [cards, setCards] = useState([]);//卡牌顯示陣列
  const [count, setCount] = useState(0);//翻牌次數
  const [choiceOne, setChoiceOne] = useState(null);//選擇一
  const [choiceTwo, setChoiceTwo] = useState(null);//選擇二
  const [disabled, setDisabled] = useState(false);//可不可以翻牌
  const [isShowAlert, setIsShowAlert] = useState(false);//


  //一開始渲染
  useEffect(() => {
    do_shuffle_cards();
  }, []);

  // 初始，隨機卡牌產生
  const do_shuffle_cards = () => {
    const shuffled_cards = [...card_data, ...card_data].sort(() => Math.random() - 0.5).map((card) => ({
      ...card, id: Math.random()
    }));
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffled_cards);
    setCount(0);
    setIsShowAlert(false);
    document.querySelector('body').style.overflow="auto"
  }

  // 選擇卡牌
  const handle_choice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const handle_close_alert=(is_open)=>{
    setIsShowAlert(is_open)
    do_shuffle_cards();
  }

  useEffect(() => {
    const is_gameover = cards.every(item => item.is_matched === true);
    console.log(is_gameover)
    if (is_gameover && count!=0) {
      document.querySelector('body').style.overflow="hidden";
      setTimeout(() => {
        setIsShowAlert(true);
      }, 600);
    
    }
  });

  //比較兩張卡牌
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        // console.log('match')
        setCards(prev_cards => {
          return prev_cards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, is_matched: true };
            } else {
              return card;
            }
          })
        })
        reset_turn();
      } else {
        // console.log('do not match')
        setTimeout(() => {
          reset_turn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //重置選擇卡牌
  const reset_turn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setCount(prevcount => prevcount + 1);
    setDisabled(false);
  }


  return (
    <div className="App">
      <h1>Memory Game</h1>
      <p className="show_count">Count : {count}</p>
      <div className="card_grid">
        {cards.map(card => (
          <Card key={card.id} data={card} handle_choice={handle_choice} flipped={card === choiceOne || card === choiceTwo || card.is_matched} disabled={disabled} />
        ))}
      </div>
      <Alert show={isShowAlert} handle_close_alert={handle_close_alert} count={count}/>
    </div>
  );
}

export default App;
