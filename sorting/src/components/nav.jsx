import { useEffect, useRef } from "react";

function Nav(props) {
    const { arrayLength, setArrayLength, setSortType, breakLength, setBreakLength, working } = props
    const formRef = useRef(null) 
    const formSliders = [useRef(null), useRef(null)]

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

    useEffect(()=>{
        formSliders.map(element=>{
            return element.current.disabled = working
        })
        formRef.current.childNodes.forEach(element=>{
            element.disabled = working      
        })
    }, [working])

    return (<nav className="top-nav">
                <div className="length-slider-parent">
                    <label className="slider-label">Bars:</label>
                    <input className="length-slider" type="range" defaultValue={arrayLength} min="4" max="110" onChange={(event)=>changeArray(event)} ref={formSliders[0]}></input>
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
                    <input className="time-input" type="number" defaultValue={breakLength} min="0" onChange={(event)=>changeBreak(event)}  ref={formSliders[1]}></input>
                    <label className="time-ms-label">ms</label>
                </div>
            </nav>)
}

export default Nav;