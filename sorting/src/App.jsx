import React, { useEffect, useState, useRef } from "react";

function Display(props) {
    const { numbArray, barsRef, arrayLength } = props
    const [ barWidth, setBarWidth ] = useState(12)
    const [ barColor, setBarColor ] = useState("transparent")

    useEffect(()=>{
        if (arrayLength <= 5) {
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
                    <label className="slider-label">{arrayLength}</label>
                    <input className="length-slider" type="range" defaultValue={arrayLength} min="2" max="110" onChange={(event)=>changeArray(event)}></input>
                </div>
                <div className="sort-btns-parent" onClick={(event)=>changeSort(event)} ref={formRef}>
                    <button className="btn selected" data-type="bubble" >Bubble Sort</button>
                    <button className="btn" data-type="selection" >Selection Sort</button>
                    <button className="btn" data-type="insertion" >Insertion Sort</button>
                    <button className="btn" data-type="quick" >Quick Sort</button>
                </div>
                <div className="time-slider-parent">
                    <input className="length-slider" type="range" defaultValue={breakLength} min="0" max="10" step=".5" onChange={(event)=>changeBreak(event)}></input>
                    <label className="time-slider-label">{breakLength} s</label>
                </div>
            </nav>)
}

function SortBtns(props) {

    const { barsRef, generateArray, sortType, bubbleSort, selectionSort, insertionSort } = props;
    const sortBtns = [useRef(null), useRef(null)]

    async function sortItems() {

        sortBtns.forEach(element=>{
            element.current.disabled = true;
        })

        if (sortType === 'bubble') {
            await bubbleSort()
        }
        else if (sortType === 'selection'){
            await selectionSort()
        }
        else if (sortType === 'insertion'){
            await insertionSort()
        }

        barsRef.current.forEach(element=>{
            if (element) {
                element.classList.add("selected-bar")
        }})

        barsRef.current.forEach(element=>{
            if (element) {
                element.classList.remove("second-bar")
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
    const [ breakLength, setBreakLength ] = useState(1)
    const barsRef = useRef([])
    const prevCountRef = useRef(numbArray);

    async function bubbleSort() {
        let sorting = true;
            
        while (sorting) {
    
            sorting = false;
    
            for (let i = 0; i < numbArray.length - 1; i++) {
    
                barsRef.current.forEach(element=>{
                    if (element) {
                        element.classList.remove("selected-bar")
                        element.classList.remove("second-bar")
                }})
    
                barsRef.current[i].classList.add("selected-bar");
                if (barsRef.current[i + 1]) {
                    barsRef.current[i + 1].classList.add("second-bar");
                }
    
                await new Promise(r => setTimeout(r, (breakLength * 100)));
    
                setNumbArray(prevArray => {
                    const newArray = [...prevArray];
                        if (i !== newArray.length - 1 && newArray[i] > newArray[i + 1]) {
                            [newArray[i], newArray[i + 1]] = [newArray[i + 1], newArray[i]];
                            sorting = true
                        }
                    return newArray;
                });
            }
        }
    }

    async function selectionSort() {
            
        for (let j = 0; j < numbArray.length; j++) {

            const newArray = prevCountRef.current;
            let min_idx = j;
            let min = newArray[j];
            barsRef.current[j].classList.add("selected-bar");
        
            for (let i = j + 1; i < numbArray.length; i++) {

                barsRef.current.forEach(element => {
                    if (element) {
                        element.classList.remove("second-bar");
                    }
                });

                barsRef.current[i].classList.add("second-bar");

                await new Promise(r => setTimeout(r, (breakLength * 100)));
    
                if (newArray[i] < min) {
                    min = newArray[i];
                    min_idx = i;
                }
    
                barsRef.current[i].classList.add("second-bar");
            }
                
            setNumbArray(prevArray => {
                const temp = prevArray[min_idx];
                prevArray[min_idx] = prevArray[j];
                prevArray[j] = temp;
                return [...prevArray];
            });

            barsRef.current[j].classList.remove("selected-bar");
            await new Promise(r => setTimeout(r, (breakLength * 100)));
        }
    }

    async function insertionSort() {

        for (let j = 1;j < numbArray.length; j++) {

            const newArray = prevCountRef.current;
            const numb = newArray[j]
            let num_idx = j

            for (let i = j - 1; i >= 0; i--) {

                barsRef.current.forEach(element => {
                    if (element) {
                        element.classList.remove("selected-bar");
                        element.classList.remove("second-bar");
                    }
                });

                if (i === j - 1) {
                    barsRef.current[num_idx].classList.add("selected-bar");
                }
                else {
                    barsRef.current[num_idx - 1].classList.add("selected-bar");
                }
                
                barsRef.current[i].classList.add("second-bar");

                await new Promise(r => setTimeout(r, (breakLength * 100)));

                if (numb < newArray[i]) {
                    setNumbArray(prevArray => {
                        const temp = prevArray[num_idx];
                        prevArray[num_idx] = prevArray[i];
                        prevArray[i] = temp;
                        num_idx--;
                        return [...prevArray];
                    });
                }
                else {
                    break
                }
            }

            await new Promise(r => setTimeout(r, (breakLength * 100)));
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
                <SortBtns barsRef={barsRef} generateArray={generateArray} sortType={sortType} bubbleSort={bubbleSort} selectionSort={selectionSort} insertionSort={insertionSort} />
                <Display numbArray={numbArray} barsRef={barsRef} arrayLength={arrayLength} />
            </div>)
}

export default App