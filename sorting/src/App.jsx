import React, { useEffect, useState, useRef } from "react";
import Nav from "./components/nav";
import SortBtns from "./components/sort-btns";
import Display from "./components/display";
import Disclaimer from "./components/disclaimer";
import bubbleSort from "./components/bubble-sort";
import selectionSort from "./components/selection-sort";
import insertionSort from "./components/insertion-sort";
import quickSort from "./components/quick-sort";
import mergeSort from "./components/merge-sort";
import Information from "./components/information";

function App(){

    const [ numbArray, setNumbArray ] = useState([])
    const [ sortType, setSortType ] = useState("bubble")
    const [ arrayLength, setArrayLength ] = useState(25)
    const [ breakLength, setBreakLength ] = useState(50)
    const [ working, setWorking ] = useState(false)
    const [ screenSize, setScreenSize ] = useState({width: window.innerWidth, height: window.innerHeight})
    const stop = useRef(false);
    const barsRef = useRef([]);
    const barsHeight = useRef(null);
    const prevCountRef = useRef(numbArray);

    function clearHighlights() {
        barsRef.current.forEach(element => {
            if (element) {
                element.classList.remove("selected-bar", "second-bar", "third-bar");
            }
        });
    };

    function generateArray() {
        const array = Array.from({ length: arrayLength }, () => Math.floor(Math.random() * barsHeight.current));
        setNumbArray(array);
        clearHighlights();
        barsRef.current = [];
    };

    function handleResize() {

        setScreenSize({width: window.innerWidth, height: window.innerHeight})

        console.log(screenSize['height'])

        generateArray()
    }

    const sortVariables = {
        "barsRef": barsRef,
        "clearHighlights": clearHighlights,
        "prevCountRef": prevCountRef,
        "numbArray": numbArray,
        "setNumbArray": setNumbArray,
        "breakLength": breakLength,
        "stop": stop
    }

    async function mainSort(method) {
        switch (method) {
            case 'bubble':
                await bubbleSort(sortVariables);
                break;
            case 'selection':
                await selectionSort(sortVariables);
                break;
            case 'insertion':
                await insertionSort(sortVariables);
                break;
            case 'quick':
                await quickSort(sortVariables);
                break;
            case 'merge':
                await mergeSort(sortVariables);
                break;
        }
    };

    useEffect(()=> {

        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        }
      }, [])

    useEffect(()=>{

        const height = screenSize['height']

        if (height >= 992) {
            barsHeight.current = 601
        }
        else if (height >= 768) {
            barsHeight.current = 501
        }
        else if (height >= 576) {
            barsHeight.current = 401
        }
        else if (height >= 450) {
            barsHeight.current = 301
        }
        else {
            barsHeight.current = 201
        }
    }, [screenSize])

    useEffect(()=>{
        generateArray()
    }, [arrayLength])

    useEffect(() => {
        prevCountRef.current = numbArray;
      }, [numbArray]);

    return (<div>
                <Nav arrayLength={arrayLength} setArrayLength={setArrayLength} setSortType={setSortType} breakLength={breakLength} setBreakLength={setBreakLength} working={working} handleResize={handleResize} screenSize={screenSize} />
                <SortBtns barsRef={barsRef} generateArray={generateArray} sortType={sortType} mainSort={mainSort} working={working} setWorking={setWorking} clearHighlights={clearHighlights} stop={stop} />
                <Display numbArray={numbArray} barsRef={barsRef} arrayLength={arrayLength} />
                <hr/>
                <Information sortType={sortType} />
                <hr/>
                <Disclaimer />
            </div>)
}

export default App;