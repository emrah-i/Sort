import React, { useEffect, useState, useRef } from "react";
import Nav from "./components/nav";
import SortBtns from "./components/sort-btns";
import Display from "./components/display";
import Disclaimer from "./components/disclaimer";


function App(){

    const [ numbArray, setNumbArray ] = useState([])
    const [ sortType, setSortType ] = useState("bubble")
    const [ arrayLength, setArrayLength ] = useState(25)
    const [ breakLength, setBreakLength ] = useState(50)
    const [ working, setWorking ] = useState(false)
    const barsRef = useRef([])
    const prevCountRef = useRef(numbArray);

    const clearHighlights = () => {
        barsRef.current.forEach(element => {
            if (element) {
                element.classList.remove("selected-bar", "second-bar", "third-bar");
            }
        });
    };

    const generateArray = () => {
        const array = Array.from({ length: arrayLength }, () => Math.floor(Math.random() * 651));
        setNumbArray(array);
        clearHighlights();
        barsRef.current = [];
    };

    const mainSort = async (method) => {
        switch (method) {
            case 'bubble':
                await bubbleSort(numbArray, barsRef, breakLength);
                break;
            case 'selection':
                await selectionSort(numbArray, barsRef, breakLength);
                break;
            case 'insertion':
                await insertionSort(numbArray, barsRef, breakLength);
                break;
            case 'quick':
                await quickSort(numbArray, barsRef, breakLength);
                break;
        }
    };

    useEffect(()=>{
        generateArray()
    }, [arrayLength])

    useEffect(() => {
        prevCountRef.current = numbArray;
      }, [numbArray]);

    return (<div>
                <Nav arrayLength={arrayLength} setArrayLength={setArrayLength} setSortType={setSortType} breakLength={breakLength} setBreakLength={setBreakLength} working={working} />
                <SortBtns barsRef={barsRef} generateArray={generateArray} sortType={sortType} mainSort={mainSort} setWorking={setWorking} />
                <Display numbArray={numbArray} barsRef={barsRef} arrayLength={arrayLength} />
                <Disclaimer />
            </div>)
}

export default App;