import { useRef } from "react";

function SortBtns(props) {

    const { barsRef, generateArray, sortType, mainSort, setWorking } = props;
    const sortBtns = [useRef(null), useRef(null)]

    async function sortItems() {

        setWorking(true)

        sortBtns.forEach(element=>{
            element.current.disabled = true;
        })

        barsRef.current.forEach(element=>{
            if (element) {
                element.classList.remove("selected-bar")
                element.classList.remove("second-bar")
                element.classList.remove("third-bar")
        }})

        await mainSort(sortType)

        barsRef.current.forEach(element=>{
            if (element) {
                element.classList.add("selected-bar")
        }})

        barsRef.current.forEach(element=>{
            if (element) {
                element.classList.remove("second-bar")
                element.classList.remove("third-bar")
        }})

        setWorking(false)

        sortBtns.forEach(element=>{
            element.current.disabled = false;
        })
    }

    return (<div className="sort-btns">
                <button className="btn sort-btn" onClick={sortItems} ref={sortBtns[0]}>Sort</button>
                <button className="btn redo-btn" onClick={generateArray} ref={sortBtns[1]}>Generate</button>
            </div>)
}

export default SortBtns;