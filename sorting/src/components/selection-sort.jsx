
async function selectionSort(sortVariables) {

    const { 
        barsRef, 
        prevCountRef, 
        numbArray, 
        setNumbArray, 
        breakLength,
        stop
    } = sortVariables;
        
    for (let j = 0; j < numbArray.length - 1; j++) {

        const newArray = prevCountRef.current;
        let min_idx = j;
        let min = newArray[j];
        barsRef.current[j].classList.add("selected-bar");

        await new Promise(r => setTimeout(r, (breakLength)));
    
        for (let i = j + 1; i < numbArray.length; i++) {

            if (stop.current) {
                return;
            }

            barsRef.current.forEach(element => {
                if (element) {
                    element.classList.remove("second-bar");
                }
            });

            barsRef.current[i].classList.add("second-bar");

            await new Promise(r => setTimeout(r, (breakLength)));

            if (newArray[i] < min) {
                min = newArray[i];
                min_idx = i;
            }

            barsRef.current[i].classList.add("second-bar");
        }
            
        setNumbArray(prevArray => {
            [prevArray[min_idx], prevArray[j]] = [prevArray[j], prevArray[min_idx]];
            return [...prevArray];
        });

        barsRef.current[j].classList.remove("selected-bar");

        await new Promise(r => setTimeout(r, (breakLength)));
    }
}

export default selectionSort;