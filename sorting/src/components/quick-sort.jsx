
async function quickSort(sortVariables) {
    
    const { 
        barsRef, 
        clearHighlights, 
        prevCountRef, 
        numbArray, 
        setNumbArray, 
        breakLength,
        stop
    } = sortVariables;

    await sort()

    async function sort(array = numbArray, start = 0, end = numbArray.length - 1) {

        if (stop.current) {
            return;
        }
    
        if (start >= end) {return}
    
        const pivotIndex = await partition(array, start, end);
    
        await new Promise(r => setTimeout(r, (breakLength / 2)));
        
        const newArray_1 = prevCountRef.current;
    
        await sort(newArray_1, start, pivotIndex - 1);
    
        await new Promise(r => setTimeout(r, (breakLength / 2)));
    
        const newArray_2 = prevCountRef.current;
    
        await sort(newArray_2, pivotIndex + 1, end);
    
        async function partition(array, start, end) {
    
            let value = array[end]
            let idx = start
    
            clearHighlights()
    
            barsRef.current[end].classList.add("selected-bar");
    
            for (let i = start; i < end; i++) {
    
                barsRef.current[idx].classList.add("second-bar");
                barsRef.current[i].classList.add("third-bar");
                
                await new Promise(r => setTimeout(r, (breakLength)));
    
                if (array[i] < value) {
                    setNumbArray(prevArray => {
                        [prevArray[idx], prevArray[i]] = [prevArray[i], prevArray[idx]];
                        idx++
                        return [...prevArray];
                    })
    
                    barsRef.current[idx].classList.remove("second-bar");
                    barsRef.current[i].classList.remove("third-bar");
                }
                else {
                    barsRef.current[i].classList.remove("third-bar");
                }
    
                await new Promise(r => setTimeout(r, (breakLength)));

                if (stop.current) {
                    return;
                }
            }
    
    
            setNumbArray(prevArray => {
                [prevArray[idx], prevArray[end]] = [prevArray[end], prevArray[idx]];
                return [...prevArray];
            })
    
            return idx;
        }
    }
}

export default quickSort;