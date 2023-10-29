
function useQuickSort() {
        
    async function quickSort(array = numbArray, start = 0, end = numbArray.length - 1) {
    
        if (start >= end) {return}
    
        const pivotIndex = await partition(array, start, end);
    
        await new Promise(r => setTimeout(r, (breakLength)));
        
        const newArray1 = prevCountRef.current;
    
        await quickSort(newArray1, start, pivotIndex - 1);
    
        await new Promise(r => setTimeout(r, (breakLength)));
    
        const newArray2 = prevCountRef.current;
    
        await quickSort(newArray2, pivotIndex + 1, end);
    
        async function partition(array, start, end) {
    
            let value = array[end]
            let idx = start
    
            clearHighlights()
    
            barsRef.current[end].classList.add("selected-bar");
    
            for (let i = start; i < end; i++) {
    
                barsRef.current[idx].classList.add("third-bar");
                barsRef.current[i].classList.add("second-bar");
                
                await new Promise(r => setTimeout(r, (breakLength)));
    
                if (array[i] < value) {
                    setNumbArray(prevArray => {
                        [prevArray[idx], prevArray[i]] = [prevArray[i], prevArray[idx]];
                        idx++
                        return [...prevArray];
                    })
    
                    barsRef.current[idx].classList.remove("third-bar");
                    barsRef.current[i].classList.remove("second-bar");
                }
                else {
                    barsRef.current[i].classList.remove("second-bar");
                }
    
                await new Promise(r => setTimeout(r, (breakLength)));
            }
    
    
            setNumbArray(prevArray => {
                [prevArray[idx], prevArray[end]] = [prevArray[end], prevArray[idx]];
                return [...prevArray];
            })
    
            return idx;
        }
    }
}

export default useQuickSort;