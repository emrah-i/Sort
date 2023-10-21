import React, { useEffect, useState } from "react";

function Display(props) {
    const { numbArray } = props

    return (<div className="display">
                {numbArray.map(element=>{return (<p className="array-bar" style={{height: element}}>&nbsp;</p>)})}
            </div>)
}

function App(){

    const [numbArray, setNumbArray] = useState([])

    function generateNumb() {
        return Math.floor(Math.random() * 701) 
    }

    useEffect(()=>{

        const array = []
        
        for (let i = 0; i < 100; i ++) {
            array.push(generateNumb())
        }

        setNumbArray(array)
    }, [])


    return (<div>
                <Display numbArray={numbArray} />
            </div>)
}

export default App