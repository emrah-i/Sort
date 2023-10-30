
function BigO(props) {
    const { sortType } = props
    let content;

    switch (sortType) {
      case 'bubble':
        content = (
          <div>
            <h2>Bubble Sort:</h2>
            <p>In bubble sort, we start at a base index of 0 and compare it to the index that directly follows it, 1. We swap the values (if necessary) so the largest value is in the right-most index. 
                We increment the base index by 1, compare it to the next index, and swap. 
                We continue incrementing the base index until we reach the second to last index. 
                At this point, the largest number will have "bubbled" to the top. 
                We loop through the array n number of times until the array is sorted. 
                Instead of going to the second to last index each loop, we decrement the length by 1 to not repeatedly sort already sorted values. 
                If there are no swaps made through one full loop, the function immediately returns. This eliminates unnecessary sorting.</p>
            <p><b>Best-case:</b> O(n) –– when the list is already sorted (function returns in no swaps made).</p>
            <p><b>Average-case:</b> O(n<sup>2</sup>) –– since you have to loop through each index n number of times.</p>
            <p><b>Worst-case:</b> O(n<sup>2</sup>) –– when the list is reversed.</p>
          </div>
        );
        break;
  
      case 'selection':
        content = (
          <div>
            <h2>Selection Sort:</h2>
            <p>In selection sort, we start at a base index of 0, loop through the whole array starting at the base index, find the lowest number, and swap it with the base index.
                We increment the base index by 1 and repeat. We continue this until we've reached the second to last index. Essentially, all of the smallest numbers are "selected"
                and placed at the bottom. The downfall of this algorithm is that you must loop through each index n number of times even if the list is sorted.
                This is because even if the first 23 elements are sorted, without the base index getting to the second to last element, you cannot know if the list is sorted.
            </p>
            <p><b>Best-case:</b> O(n<sup>2</sup>) –– even if the list is sorted, you have to increment through the whole array.</p>
            <p><b>Average-case:</b> O(n<sup>2</sup>) –– since you have to loop through each index n number of times.</p>
            <p><b>Worst-case:</b> O(n<sup>2</sup>)</p>
          </div>
        );
        break;
  
      case 'insertion':
        content = (
          <div>
            <h2>Insertion Sort:</h2>
            <p>In insertion sort, we start at a base index of 1, compare it with the index directly to the left, and swap (if necessary) so the smaller number is in the left-most index.
                Then, we increment the base index by 1, however, this time, we keep comparing and swapping with indexes to the left until we find a value that's less than the base value.
                This means we've found it's place in the index. We can be sure of this because its below greater values and above lesser values. Essentially, we're inserting numbers 
                to the proper index by finding the index where the number to the left is less than and the number to the right is greater than our base value. 
            </p>
            <p><b>Best-case:</b> O(n) –– when the list is already sorted.</p>
            <p><b>Average-case:</b> O(n<sup>2</sup>)</p>
            <p><b>Worst-case:</b> O(n<sup>2</sup>) –– when the list is reversed.</p>
          </div>
        );
        break;
  
      case 'quick':
        content = (
          <div>
            <h2>Quick Sort:</h2>
            <p>In quick sort, there is no concrete way to start. My algorithm uses the last index, however, this is not efficient 
                as the starting pivot index should be close to the median of the array. I will only explain how my algorithm works. 
                This will be a little more complicated than the other algorithms as it contains recursion.</p>
            <p>For my quick sort, you start at the last index, called the pivot index. A comparison index starts at the index 0.
                This comparison index increments by 1 until it finds a value greater than the pivot value. 
                Once this value is found, a loop starts at this index and increments by 1 until it finds
                a value lesser than the pivot. We will call this loop index the swap index. 
                When this lesser value is found, the swap index and comparison index swap. 
                The comparison index increments by 1 and the swap index continues from the previous swap index where the swap took place. 
                Once the swap index reaches the pivot index, the comparison index is swapped with the pivot index. 
                This might not make sense, but remember, we were always comparing the swap index to the pivot index, never the comparison index.
                Therefore, this array is sorted according the pivot.</p>
            <p>Following this is where recursion is utilized. After the final swap, we have a new pivot index. 
                Now, we sort everything to the left and everything to the right of the pivot (seperately) using the same method described above.
                The only thing that changes is the start and end points of the array. 
                We do this by changing the start and end parameters on the function call.
            </p>
            <p><b>Best-case:</b> O(n • logn) –– with a good pivot selection.</p>
            <p><b>Average-case:</b> O(n • logn)</p>
            <p><b>Worst-case:</b> O(n<sup>2</sup>) –– when the pivot is always the smallest or largest element.</p>
          </div>
        );
        break;
  
      default:
        content = <p>Please select a sorting method.</p>;
    }
  
    return <div>{content}</div>;
}

export default BigO;