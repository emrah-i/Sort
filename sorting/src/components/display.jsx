import { useEffect, useState } from "react";

function Display(props) {
    const { numbArray, barsRef, arrayLength } = props
    const [ barWidth, setBarWidth ] = useState(12)
    const [ barColor, setBarColor ] = useState("transparent")

    function changeWidth() {

        const sec_width = window.screen.width

        setBarWidth((sec_width - (arrayLength-1)*(10)) / arrayLength);
    }

    useEffect(()=>{

        changeWidth()

        window.addEventListener('resize', changeWidth);

        if (arrayLength < 30) {
            setBarColor("#343a40")
        }
        else {
            setBarColor("transparent")
        }

        if (window.innerWidth <= 1100 || window.screen.width <= 1100) {
            setBarColor("transparent");
        }

        return () => {
            window.removeEventListener('resize', changeWidth);
        }

    }, [arrayLength, window.screen.width, window.innerWidth])


    return (<div className="display">
                {numbArray.map((element, index)=>{return (<p key={index} className="array-bar" style={{height: element, width: `${barWidth}px`, color: barColor}} ref={element => barsRef.current[index] = element}>{element}</p>)})}
            </div>)
}

export default Display;