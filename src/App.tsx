import './App.css'
import { useEffect, useState, useContext, useRef, useReducer, useMemo, useCallback } from 'react';
import ShincodeContext from './main';
import Somechild from './Somechild';

import useLocalStorage from './useLocalStorage';

const reducer = (state: number, action: any): number => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}

function App(): JSX.Element {

  const [count, setCount] = useState(0);
  const shincodeInfo = useContext(ShincodeContext);
  const ref = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(reducer, 0);

  const handleClick = (): void => {
    setCount(count + 1);
  }

  useEffect((): void => {
    console.log("hello world");
  }, [count]);

  const handleRef = () => {
    console.log(ref);
  }

  //useMemo　[]内が発火すると第一引数が実行される
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  const square = useMemo(() => {
    let i = 0;
    while (i < 2000000000) {
      i++;
    }
    console.log("クリックされました");
    return count02 * count02;
  }, [count02]);

  //useCallback 関数のメモ化
  const [counter, setCounter] = useState(0);

  const showCount = useCallback(() => {
    alert('これは重い処理です。')
  }, [counter]);

  //カスタムフック
  const [age, setAge] = useLocalStorage("age", 24);


  return (
    <div className="App">
      <h1>useState useEffect</h1>
      <button onClick={handleClick}>＋</button>

      <hr />
      <h1>useContext</h1>
      <p>{shincodeInfo.name}</p>
      <p>{shincodeInfo.age}</p>

      <hr />
      <h1>useRef</h1>
      <input type='text' ref={ref} />
      <button onClick={handleRef}>useRef</button>

      <hr />
      <h1>useReducer</h1>
      <p>カウント : {state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>＋</button>
      <button onClick={() => dispatch({ type: "decrement" })}>−</button>

      <hr />
      <h1>useMemo</h1>
      <div>カウント１ : {count01}</div>
      <div>カウント２ : {count02}</div>
      <div>結果:{square}</div>
      <button onClick={() => setCount01(count01 + 1)}>＋</button>
      <button onClick={() => setCount02(count02 + 1)}>＋</button>

      <hr />
      <h1>useCallback</h1>
      <Somechild showCount={showCount} />

      <hr />
      <h1>カスタムフック</h1>
      <p>{age}</p>
      <button onClick={() => setAge(80)}>年齢</button>
    </div>
  )
}

export default App
