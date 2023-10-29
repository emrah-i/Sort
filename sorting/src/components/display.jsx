import { useEffect, useState } from "react";

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

export default Display;