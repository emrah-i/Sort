
function useInsertionSort() {

    async function insertionSort() {
    
        for (let j = 1;j < numbArray.length; j++) {
    
            const newArray = prevCountRef.current;
            const num = newArray[j]
            let num_idx = j
    
            for (let i = j - 1; i >= 0; i--) {
    
                clearHighlights()
    
                if (i === j - 1) {
                    barsRef.current[num_idx].classList.add("selected-bar");
                }
                else {
                    barsRef.current[num_idx - 1].classList.add("selected-bar");
                }
    
                await new Promise(r => setTimeout(r, (breakLength)));
                
                barsRef.current[i].classList.add("second-bar");
    
                await new Promise(r => setTimeout(r, (breakLength)));
    
                if (num < newArray[i]) {
                    setNumbArray(prevArray => {
                        [prevArray[num_idx], prevArray[i]] = [prevArray[i], prevArray[num_idx]];
                        num_idx--;
                        return [...prevArray];
                    });
                }
                else {
                    break
                }
            }
    
            await new Promise(r => setTimeout(r, (breakLength)));
        }
    }
}

export default useInsertionSort;