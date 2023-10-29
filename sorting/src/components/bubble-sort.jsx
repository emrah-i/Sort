
async function bubbleSort(sortVariables) {

    const { 
        barsRef, 
        clearHighlights, 
        prevCountRef, 
        numbArray, 
        setNumbArray, 
        breakLength,
        stop
    } = sortVariables;
            
    for (let j = numbArray.length - 1; j >= 1; j--) {

        let swapped = false

        for (let i = 0; i < j; i++) {

            if (stop.current) {
                return;
            }

            const newArray = prevCountRef.current;

            clearHighlights()

            barsRef.current[i].classList.add("selected-bar");

            if (barsRef.current[i + 1]) {
                barsRef.current[i + 1].classList.add("second-bar");
            }

            await new Promise(r => setTimeout(r, (breakLength)));

            if (i !== newArray.length - 1 && newArray[i] > newArray[i + 1]) {
                swapped = true
                setNumbArray(prevArray => {
                    [prevArray[i], prevArray[i + 1]] = [prevArray[i + 1], prevArray[i]];
                    return [...prevArray];
                })
            }
        }

        if (swapped === false) {
            break
        }
    }
}

export default bubbleSort;
