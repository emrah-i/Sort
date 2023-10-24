import React, { useEffect, useState, useRef } from "react";

function Display(props) {
    const { numbArray, barsRef, arrayLength } = props
    const [ barWidth, setBarWidth ] = useState(12)
    const [ barColor, setBarColor ] = useState("transparent")

    useEffect(()=>{
        if (arrayLength <= 8) {
            setBarWidth(12)
        }
        else if (arrayLength < 10) {
            setBarWidth(6)
        }
        else if (arrayLength < 20) {
            setBarWidth(4)
        }
        else if (arrayLength < 40) {
            setBarWidth(2)
        }
        else if (arrayLength < 60) {
            setBarWidth(1)
        }
        else if (arrayLength < 80) {
            setBarWidth(.75)
        }
        else if (arrayLength < 100) {
            setBarWidth(.5)
        }
        else {
            setBarWidth(.4)
        }

        if (arrayLength < 30) {
            
            setBarColor("#343a40")
        }
        else {
            setBarColor("transparent")
        }
    }, [arrayLength])


    return (<div className="display">
                {numbArray.map((element, index)=>{return (<p key={index} className="array-bar" style={{height: element, width: `${barWidth}rem`, color: barColor}} ref={element => barsRef.current[index] = element}>{element}</p>)})}
            </div>)
}

function Nav(props) {
    const { arrayLength, setArrayLength, setSortType, breakLength, setBreakLength } = props
    const formRef = useRef(null)

    function changeArray(event) {
        setArrayLength(event.target.value)
    }

    function changeBreak(event) {
        setBreakLength(event.target.value)
    }

    function changeSort(event) {

        if (event.target.nodeName.toLowerCase() === "button") {
            if (formRef.current) {
                formRef.current.childNodes.forEach(element=>{
                    element.classList.remove("selected")        
                })
            }

            event.target.classList.add('selected')
            setSortType(event.target.dataset.type)
        }
    }

    return (<nav className="top-nav">
                <div className="length-slider-parent">
                    <label className="slider-label">Bars:</label>
                    <input className="length-slider" type="range" defaultValue={arrayLength} min="4" max="110" onChange={(event)=>changeArray(event)}></input>
                    <label className="slider-label">{arrayLength}</label>
                </div>
                <div className="sort-btns-parent" onClick={(event)=>changeSort(event)} ref={formRef}>
                    <button className="btn selected" data-type="bubble" >Bubble Sort</button>
                    <button className="btn" data-type="selection" >Selection Sort</button>
                    <button className="btn" data-type="insertion" >Insertion Sort</button>
                    <button className="btn" data-type="quick" >Quick Sort</button>
                </div>
                <div className="time-slider-parent">
                    <label className="time-input-label" >Delay:</label>
                    <input className="time-input" type="number" defaultValue={breakLength} min="0" onChange={(event)=>changeBreak(event)}></input>
                    <label className="time-ms-label">ms</label>
                </div>
            </nav>)
}

function SortBtns(props) {

    const { barsRef, generateArray, sortType, bubbleSort, selectionSort, insertionSort, quickSort } = props;
    const sortBtns = [useRef(null), useRef(null)]

    async function sortItems() {

        sortBtns.forEach(element=>{
            element.current.disabled = true;
        })

        barsRef.current.forEach(element=>{
            if (element) {
                element.classList.remove("selected-bar")
                element.classList.remove("second-bar")
                element.classList.remove("third-bar")
        }})

        if (sortType === 'bubble') {
            await bubbleSort()
        }
        else if (sortType === 'selection'){
            await selectionSort()
        }
        else if (sortType === 'insertion'){
            await insertionSort()
        }
        else if (sortType === 'quick'){
            await quickSort()
        }

        barsRef.current.forEach(element=>{
            if (element) {
                element.classList.add("selected-bar")
        }})

        barsRef.current.forEach(element=>{
            if (element) {
                element.classList.remove("second-bar")
                element.classList.remove("third-bar")
        }})

        sortBtns.forEach(element=>{
            element.current.disabled = false;
        })
    }

    return (<div className="sort-btns">
                <button className="btn sort-btn" onClick={sortItems} ref={sortBtns[0]}>Sort</button>
                <button className="btn redo-btn" ref={sortBtns[1]} onClick={generateArray} >Randomize</button>
            </div>)
}


function generateNumb() {
    return Math.floor(Math.random() * 651) 
}

function App(){

    const [ numbArray, setNumbArray ] = useState([])
    const [ sortType, setSortType ] = useState("bubble")
    const [ arrayLength, setArrayLength ] = useState(25)
    const [ breakLength, setBreakLength ] = useState(50)
    const barsRef = useRef([])
    const prevCountRef = useRef(numbArray);

    function clearHighlights() {
        barsRef.current.forEach(element => {
            if (element) {
                element.classList.remove("selected-bar");
                element.classList.remove("second-bar");
                element.classList.remove("third-bar");
            }
        });
    }

    async function bubbleSort() {
            
        for (let j = numbArray.length - 1; j >= 1; j--) {
    
            let swapped = false
    
            for (let i = 0; i < j; i++) {

                const newArray = prevCountRef.current;
    
                clearHighlights()
    
                barsRef.current[i].classList.add("selected-bar");

                if (barsRef.current[i + 1]) {
                    barsRef.current[i + 1].classList.add("second-bar");
                }
    
                await new Promise(r => setTimeout(r, (breakLength)));
    
                if (i !== newArray.length - 1 && newArray[i] > newArray[i + 1]) {
                    swapped = true
                    setNumbArray(prevArray => {
                        [prevArray[i], prevArray[i + 1]] = [prevArray[i + 1], prevArray[i]];
                        return [...prevArray];
                    })
                }
            }

            if (swapped === false) {
                break
            }
        }
    }

    async function selectionSort() {
            
        for (let j = 0; j < numbArray.length; j++) {

            const newArray = prevCountRef.current;
            let min_idx = j;
            let min = newArray[j];
            barsRef.current[j].classList.add("selected-bar");

            await new Promise(r => setTimeout(r, (breakLength)));
        
            for (let i = j + 1; i < numbArray.length; i++) {

                barsRef.current.forEach(element => {
                    if (element) {
                        element.classList.remove("second-bar");
                    }
                });

                barsRef.current[i].classList.add("second-bar");

                await new Promise(r => setTimeout(r, (breakLength)));
    
                if (newArray[i] < min) {
                    min = newArray[i];
                    min_idx = i;
                }
    
                barsRef.current[i].classList.add("second-bar");
            }
                
            setNumbArray(prevArray => {
                [prevArray[min_idx], prevArray[j]] = [prevArray[j], prevArray[min_idx]];
                return [...prevArray];
            });

            barsRef.current[j].classList.remove("selected-bar");

            await new Promise(r => setTimeout(r, (breakLength)));
        }
    }

    async function insertionSort() {

        for (let j = 1;j < numbArray.length; j++) {

            const newArray = prevCountRef.current;
            const num = newArray[j]
            let num_idx = j

            for (let i = j - 1; i >= 0; i--) {

                clearHighlights()

                if (i === j - 1) {
                    barsRef.current[num_idx].classList.add("selected-bar");
                }
                else {
                    barsRef.current[num_idx - 1].classList.add("selected-bar");
                }

                await new Promise(r => setTimeout(r, (breakLength)));
                
                barsRef.current[i].classList.add("second-bar");

                await new Promise(r => setTimeout(r, (breakLength)));

                if (num < newArray[i]) {
                    setNumbArray(prevArray => {
                        [prevArray[num_idx], prevArray[i]] = [prevArray[i], prevArray[num_idx]];
                        num_idx--;
                        return [...prevArray];
                    });
                }
                else {
                    break
                }
            }

            await new Promise(r => setTimeout(r, (breakLength)));
        }
    }

    async function quickSort(array = numbArray, start = 0, end = numbArray.length - 1) {

        if (start >= end) {return}

        const pivotIndex = await partition(array, start, end);

        await new Promise(r => setTimeout(r, (breakLength)));
        
        const newArray1 = prevCountRef.current;

        await quickSort(newArray1, start, pivotIndex - 1);

        await new Promise(r => setTimeout(r, (breakLength)));

        const newArray2 = prevCountRef.current;

        await quickSort(newArray2, pivotIndex + 1, end);

        async function partition(array, start, end) {

            let value = array[end]
            let idx = start

            clearHighlights()

            barsRef.current[end].classList.add("selected-bar");

            for (let i = start; i < end; i++) {

                barsRef.current[idx].classList.add("third-bar");
                barsRef.current[i].classList.add("second-bar");
                
                await new Promise(r => setTimeout(r, (breakLength)));

                if (array[i] < value) {
                    setNumbArray(prevArray => {
                        [prevArray[idx], prevArray[i]] = [prevArray[i], prevArray[idx]];
                        idx++
                        return [...prevArray];
                    })

                    barsRef.current[idx].classList.remove("third-bar");
                    barsRef.current[i].classList.remove("second-bar");
                }
                else {
                    barsRef.current[i].classList.remove("second-bar");
                }

                await new Promise(r => setTimeout(r, (breakLength)));
            }


            setNumbArray(prevArray => {
                [prevArray[idx], prevArray[end]] = [prevArray[end], prevArray[idx]];
                return [...prevArray];
            })

            return idx;
        }
    }
    
    function generateArray() {
        const array = []
            
        for (let i = 0; i < arrayLength; i ++) {
            array.push(generateNumb())
        }
    
        setNumbArray(array)

        barsRef.current.forEach(element=>{
            if (element) {
                element.classList.remove("selected-bar")
        }})

        barsRef.current = []
    }

    useEffect(()=>{
        generateArray()
    }, [arrayLength])

    useEffect(() => {
        prevCountRef.current = numbArray;
      }, [numbArray]);

    return (<div>
                <Nav arrayLength={arrayLength} setArrayLength={setArrayLength} setSortType={setSortType} breakLength={breakLength} setBreakLength={setBreakLength} />
                <SortBtns barsRef={barsRef} generateArray={generateArray} sortType={sortType} bubbleSort={bubbleSort} selectionSort={selectionSort} insertionSort={insertionSort} quickSort={quickSort} />
                <Display numbArray={numbArray} barsRef={barsRef} arrayLength={arrayLength} />
                <p className="disclaimer"><b>Disclaimer:</b> the time slider should be not be used as a variable to compare the efficiency of the sorting algorithims.  
                This slider is a way for the user to speed up and slow the algorithim to better understand it. The delays are placed in different places throughout each 
                sorting function to allow the variables to update properly, therefore, it is not a reliable variable.</p>
            </div>)
}

export default App;