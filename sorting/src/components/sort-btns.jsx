import { useRef } from "react";

function SortBtns(props) {

    const { barsRef, generateArray, sortType, mainSort, working, setWorking, clearHighlights, stop } = props;
    const sortBtns = [useRef(null), useRef(null)]
    const stopBtn = useRef(null)

    async function sortItems() {

        setWorking(true)

        sortBtns.forEach(element=>{
            element.current.disabled = true;
        })

        clearHighlights()

        await mainSort(sortType)

        clearHighlights()

        if (!stop.current) {
            barsRef.current.forEach(element=>{
                if (element) {
                    element.classList.add("selected-bar")
            }})
            stopBtn.current.disabled = true;
            stop.current = false
        }
        else {
            stopBtn.current.disabled = true;
            stop.current = false
        }

        setWorking(false)

        sortBtns.forEach(element=>{
            element.current.disabled = false;
        })
    }

    return (<div className="sort-btns">
                <button className="btn sort-btn" onClick={sortItems} ref={sortBtns[0]}>Sort</button>
                <button className="btn redo-btn" onClick={generateArray} ref={sortBtns[1]}>Generate</button>
                <button className="btn stop-btn" disabled={!working} onClick={()=>stop.current = true} ref={stopBtn}>Stop</button>
            </div>)
}

export default SortBtns;