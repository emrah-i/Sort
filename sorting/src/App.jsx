import React, { useEffect, useState } from "react";

function Display(props) {
    const { numbArray } = props

    return (<div className="display">
                {numbArray.map(element=>{return (<p className="array-bar" style={{height: element}}>&nbsp;</p>)})}
            </div>)
}

function Nav(props) {
    const { arrayLength, setArrayLength, setNumbArray } = props

    function changeArray(event) {

        setArrayLength(event.target.value)

        const array = []
        
        for (let i = 0; i < arrayLength; i ++) {
            array.push(generateNumb())
        }

        setNumbArray(array)
    }

    return (<nav className="top-nav">
                <label className="slider-label">{arrayLength}</label>
                <input className="length-slider" type="range" defaultValue={arrayLength} min="5" max="110" onChange={(event)=>changeArray(event)}></input>
                <div>
                    <button className="btn selected">Bubble Sort</button>
                    <button className="btn">Quick Sort</button>
                    <button className="btn">Selection Sort</button>
                    <button className="btn">Insertion Sort</button>
                </div>
            </nav>)
}

function SortBtn() {

    return (<button className="btn sort-btn">Sort</button>)
}

function generateNumb() {
    return Math.floor(Math.random() * 651) 
}

function App(){

    const [ numbArray, setNumbArray ] = useState([])
    const [ arrayLength, setArrayLength ] = useState(55)


    useEffect(()=>{

        const array = []
        
        for (let i = 0; i < arrayLength; i ++) {
            array.push(generateNumb())
        }

        setNumbArray(array)
    }, [])


    return (<div>
                <Nav arrayLength={arrayLength} setArrayLength={setArrayLength} setNumbArray={setNumbArray} />
                <SortBtn />
                <Display numbArray={numbArray} />
            </div>)
}

export default App