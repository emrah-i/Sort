
async function mergeSort(sortVariables) {
    
    const { 
        barsRef, 
        clearHighlights, 
        numbArray, 
        setNumbArray, 
        breakLength,
        stop
    } = sortVariables;

    await sort()

    async function sort(array = numbArray, start = 0, end = array.length - 1) {

        if (stop.current) {
            return;
        }
    
        if (start >= end) {
            return;
        } 

        const middle = start + Math.floor((end - start) / 2);
        
        await sort(array, start, middle);
        await sort(array, middle + 1, end);

        await merge(array, start, middle, end);

        async function merge(array, start, middle, end) {

            if (stop.current) {
                return;
            }

            clearHighlights()

            barsRef.current[end].classList.add("selected-bar");
            barsRef.current[start].classList.add("second-bar");
            barsRef.current[middle].classList.add("third-bar");

            await new Promise(r => setTimeout(r, (breakLength)));

            let left = array.slice(start, middle + 1);
            let right = array.slice(middle + 1, end + 1);
        
            let i = 0, j = 0, k = start;
        
            while (i < left.length && j < right.length) {        
                if (left[i] < right[j]) {
                    array[k++] = left[i++];

                    setNumbArray([...array])

                    await new Promise(r => setTimeout(r, (breakLength / 2)));
                } else {
                    array[k++] = right[j++];

                    setNumbArray([...array])

                    await new Promise(r => setTimeout(r, (breakLength / 2)));
                }
            }
        
            while (i < left.length) {
                array[k++] = left[i++];

                setNumbArray([...array])

                await new Promise(r => setTimeout(r, (breakLength / 2)));
            }
            
            while (j < right.length) {
                array[k++] = right[j++];

                setNumbArray([...array])

                await new Promise(r => setTimeout(r, (breakLength / 2)));
            }
        }
    }
}

export default mergeSort;