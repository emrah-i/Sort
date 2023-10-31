import { useEffect, useRef, useState } from "react";

function Nav(props) {
    const { arrayLength, setArrayLength, setSortType, breakLength, setBreakLength, working } = props
    const [ navExpand, setNavExpand ] = useState(null)
    const formRef = useRef(null) 
    const formSliders = [useRef(null), useRef(null)]
    const sliderMax = useRef(null)
    const navBar = useRef(null)
    const navExRef = useRef(null)

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

    function expandToolbar() {
        navBar.current.classList.toggle("expanded")
        navExRef.current.classList.toggle("active")
    }

    useEffect(()=>{
        formSliders.map(element=>{
            return element.current.disabled = working
        })
        formRef.current.childNodes.forEach(element=>{
            element.disabled = working      
        })
    }, [working])

    useEffect(()=>{

        setArrayLength(25)
        formSliders[0].current.value = 25

        const width = window.innerWidth
        const sec_width = window.screen.width

        if (width >= 1200 || sec_width >= 1200) {
            sliderMax.current = 115
        }
        else if (width >= 992 || sec_width >= 992) {
            sliderMax.current = 100
        }
        else if (width >= 768 || sec_width >= 768) {
            sliderMax.current = 80
        }
        else if (width >= 576 || sec_width >= 576) {
            sliderMax.current = 60
        }
        else {
            sliderMax.current = 40
        }

        if (width < 1400) {
            setNavExpand(<button className="btn nav-chevron"><i class="fa-solid fa-chevron-down" onClick={expandToolbar} ref={navExRef}></i></button>)
        }
        else {
            setNavExpand(null)
        }

    }, [window.innerWidth, window.screen.width])

    return (<nav class="top-nav" ref={navBar}>
                <div className="length-slider-parent">
                    <label className="slider-label">Bars:</label>
                    <input className="length-slider" type="range" defaultValue={arrayLength} min="4" max={sliderMax.current} onChange={(event)=>changeArray(event)} ref={formSliders[0]}></input>
                    <label className="slider-label">{arrayLength}</label>
                </div>
                <div className="sort-btns-parent" onClick={(event)=>changeSort(event)} ref={formRef}>
                    <button className="btn selected" data-type="bubble" >Bubble Sort</button>
                    <button className="btn" data-type="selection" >Selection Sort</button>
                    <button className="btn" data-type="insertion" >Insertion Sort</button>
                    <button className="btn" data-type="quick" >Quick Sort</button>
                    <button className="btn" data-type="merge" >Merge Sort</button>
                </div>
                <div className="time-slider-parent">
                    <label className="time-input-label" >Delay:</label>
                    <input className="time-input" type="number" defaultValue={breakLength} min="0" onChange={(event)=>changeBreak(event)}  ref={formSliders[1]}></input>
                    <label className="time-ms-label">ms</label>
                </div>
                {navExpand}
            </nav>)
}

export default Nav;