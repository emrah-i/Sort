import React, { useEffect, useState, useRef } from "react";

function Display(props) {
    const { numbArray, barsRef } = props

    return (<div className="display">
                {numbArray.map((element, index)=>{return (<p key={index} className="array-bar" style={{height: element}} ref={el => barsRef.current[index] = el} data-height={element} >&nbsp;</p>)})}
            </div>)
}

function Nav(props) {
    const { arrayLength, setArrayLength } = props

    function changeArray(event) {
        setArrayLength(event.target.value)
    }

    return (<nav className="top-nav">
                <label className="slider-label">{arrayLength}</label>
                <input className="length-slider" type="range" defaultValue={arrayLength} min="2" max="110" onChange={(event)=>changeArray(event)}></input>
                <div>
                    <button className="btn selected">Bubble Sort</button>
                    <button className="btn">Quick Sort</button>
                    <button className="btn">Selection Sort</button>
                    <button className="btn">Insertion Sort</button>
                </div>
            </nav>)
}

function SortBtn(props) {

    const { numbArray, setNumbArray, barsRef } = props;

    async function sortItems() {

        let sorting = true;
        
        while (sorting) {

            sorting = false;

            for (let i = 0; i < numbArray.length - 1; i++) {

                barsRef.current.forEach(element=>{
                    if (element) {
                        element.classList.remove("selected-bar")
                }})

                barsRef.current[i].classList.add("selected-bar");
                if (barsRef.current[i + 1]) {
                    barsRef.current[i + 1].classList.add("selected-bar");
                }

                await new Promise(r => setTimeout(r, 10));

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

        barsRef.current.forEach(element=>{
            if (element) {
                element.classList.add("selected-bar")
        }})
    }

    return (<button className="btn sort-btn" onClick={sortItems}>Sort</button>)
}


function generateNumb() {
    return Math.floor(Math.random() * 651) 
}

function App(){

    const [ numbArray, setNumbArray ] = useState([])
    const [ arrayLength, setArrayLength ] = useState(55)
    const barsRef = useRef([])

    useEffect(()=>{

        const array = []
        
        for (let i = 0; i < arrayLength; i ++) {
            array.push(generateNumb())
        }

        setNumbArray(array)

        barsRef.current = []

        barsRef.current.forEach(element=>{
            if (element) {
                element.classList.remove("selected-bar")
        }})

    }, [arrayLength])


    return (<div>
                <Nav arrayLength={arrayLength} setArrayLength={setArrayLength} />
                <SortBtn numbArray={numbArray} setNumbArray={setNumbArray} barsRef={barsRef} />
                <Display numbArray={numbArray} barsRef={barsRef} />
            </div>)
}

export default App