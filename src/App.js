import {useState } from "react";
import musicFile from "./assets/water-drop-sound-fx.wav";
import "./App.css";

function App() {
  const input = [64, 34, 25, 90, 12, 22, 11, 6, 5, 21, 55];
  const [arr, setArr] = useState(input);
  const[isSorted,setIsSorted] = useState(false);
  const[disabled,setIsDisabled] = useState(false);
  const[color,setColor] = useState(getRandomColor());

  function play() {
    new Audio(musicFile).play();
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSortHandler = async () => {
    let array = [...arr];
    array.sort((a, b) => a - b);
    if (array.join() !== arr.join()) {
      setIsDisabled(true);
      const currArr = [...arr];
      for (let i = 0; i < currArr.length; i++) {
        for (let j = 0; j < currArr.length - i - 1; j++) {
          if (currArr[j] > currArr[j + 1]) {
            const temp = currArr[j];
            currArr[j] = currArr[j + 1];
            currArr[j + 1] = temp;

            setArr([...currArr]);
            play();
            await sleep(200);
          }
        }
      }
      setIsSorted(true);
      setIsDisabled(false);
    }
  };

  const quickSortHandler = async () => {
    let array = [...arr];
    array.sort((a, b) => a - b);
    if (array.join() !== arr.join()) {
      setIsDisabled(true);
      const arrayToSort = [...arr];
      await quickSort(arrayToSort, 0, arrayToSort.length - 1);
      console.log(arrayToSort);
      setIsSorted(true);
      setIsDisabled(false);
      //setArr([...arrayToSort]);

      async function quickSort(arr, low, high) {
        if (low < high) {
          // pi is the partitioning index, arr[pi] is now at the right place
          let pi = await partition(arr, low, high);

          // Separately sort elements before partition and after partition
          await quickSort(arr, low, pi - 1);
          await quickSort(arr, pi + 1, high);
        }
      }

      async function partition(arr, low, high) {
        // Choosing the pivot
        let pivot = arr[high];

        // Index of smaller element and indicates the right position of pivot found so far
        let i = low - 1;

        for (let j = low; j <= high - 1; j++) {
          // If current element is smaller than the pivot
          if (arr[j] < pivot) {
            // Increment index of smaller element
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
            setArr([...arr]);
            play();
            await sleep(200);
          }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot to its correct position
        setArr([...arr]);
        play();
        await sleep(200);
        return i + 1; // Return the partition index
      }
    }
  };

  const shuffle = () => {
    let array = arr;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setArr([...array]);
    setIsSorted(false);
    setColor(getRandomColor);
  };
  function getRandomColor() {
    // Generate a random hexadecimal color code
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

  return (
    <div className="App">
      <div className="container">
        {arr.map((item, idx) => {
          return (
            <div key={idx} className="bar" style={{ height: `${5 * item}px`,backgroundColor:isSorted?`rgb(65 222 208)`:`${color}` }}>
              {item}
            </div>
          );
        })}
      </div>

      <button disabled={disabled} onClick={quickSortHandler}>QuickSort</button>
      <button disabled={disabled} onClick={bubbleSortHandler}>BubbleSort</button>
      <button disabled={disabled} onClick={shuffle}>Shuffle</button>
    </div>
  );
}

export default App;
