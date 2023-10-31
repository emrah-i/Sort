
function BigO(props) {
    const { sortType } = props
    let content;

    switch (sortType) {
      case 'bubble':
        content = (
          <div>
            <h2><b>Bubble Sort:</b></h2>
            <p><i className="fa-solid fa-square base-color"></i> Base Index</p>
            <p><i className="fa-solid fa-square comp-color"></i> Comparison Index</p>
            <p>
              Bubble sort is a comparison-based sorting algorithm that works by iteratively moving the largest unsorted value to the right-most position in the array, similar to how bubbles rise to the surface in a liquid.
            </p>
            <p>
              We start by setting the first index (index 0) as our base index. Then, we compare its value to the index to the right of it (index 1).
              If the value at the base index is greater than the one right of it, they are swapped. 
              This process continues, with the base index incrementing by one each time, until we reach the second to last index. 
              By the end of the first loop, the largest number will have "bubbled up" to the last index.
            </p>
            <p>
              For the next loop, we don't need to consider the last index since it's already in its correct place. 
              Thus, with each successive pass through the array, we decrement the effective size of the array to sort by 1. 
            </p>
            <p>
              An optimization has been added to my algorithm: If during a pass, no swaps are made, then the array is already sorted and the algorithm can terminate early, avoiding unnecessary comparisons.
            </p>

            <p><b>Best-case:</b> O(n) –– when the array is already sorted.</p>
            <p><b>Average-case:</b> O(n<sup>2</sup>) –– you have to loop through each index n number of times.</p>
            <p><b>Worst-case:</b> O(n<sup>2</sup>) –– when the array is reversed.</p>
          </div>
        );
        break;
  
      case 'selection':
        content = (
          <div>
            <h2><b>Selection Sort:</b></h2>
            <p><i className="fa-solid fa-square base-color"></i> Base Index</p>
            <p><i className="fa-solid fa-square comp-color"></i> Comparison Index</p>
            <p>
              Selection sort is a comparison-based sorting algorithm that works by repeatedly selecting the smallest unsorted value and placing it in its correct position. 
            </p>
            <p>
              Starting from the base index (index 0), we search for the smallest value in the array (including the base index). 
              Once found, we swap this value with the value at the base index. 
              Next, we increment the base index by 1 and again search for the smallest value in the remaining unsorted portion, then swap it with the base index. 
              Remember, each loop starts at the base index since only the portion from this index on is unsorted.
              This process continues until we reach the second to last index of the array. 
              By the end of each loop, the smallest number from the unsorted portion is "selected" and placed in its correct position.
            </p>
            <p>
              A limitation of selection sort is that it performs the same number of comparisons even if the list is fully sorted. 
              For example, if the first 23 out of 25 elements are sorted, the algorithm has no way to know until it reaches the second to last index.
              This is because during each loop it is only selecting the smallest number. If the base index is the smallest number, it simply increments by 1 and continues.
              Therefore, even if the all elements are sorted, the algorithm must still proceed until it has inspected all elements to guarantee the array's sorted state.
            </p>
            <p><b>Best-case:</b> O(n<sup>2</sup>) –– even if the array is sorted, you have to loop through the whole array n number of times.</p>
            <p><b>Average-case:</b> O(n<sup>2</sup>)</p>
            <p><b>Worst-case:</b> O(n<sup>2</sup>)</p>
          </div>
        );
        break;
  
      case 'insertion':
        content = (
          <div>
            <h2><b>Insertion Sort:</b></h2>
            <p><i className="fa-solid fa-square base-color"></i> Base Index</p>
            <p><i className="fa-solid fa-square comp-color"></i> Comparison Index</p>
            <p>
            Insertion sort is a comparison-based sorting algorithm that builds the sorted portion of an array one element at a time. 
            </p>
            <p>
              We start by setting the second element (index 1) as our base index. Then, we compare it to all preceding elements (all lower indexes). 
              In this case, we only have the element directly to its left (index 0). 
              If the base value is smaller, we swap the two. 
            </p>
            <p>
              With each interation, we increment the base index by 1 and compare it again to all preceding elements.
              These comparisons occur one at a time. If the base index is smaller, a swap occurs. 
              The base value does not change until the value preceding it is smaller or it has reached the index 0.
              Once one of these two events occur, the base index is incremented by one.
              Remember, this incrementation occurs from the original index of the base, not the current index of the base value.
            </p>
            <p>
             The beauty of insertion sort lies in its ability to quickly sort a partially sorted array. 
             As the base element finds its correct position, the elements to its left are always in a sorted state.
            </p>
            <p><b>Best-case:</b> O(n) –– when the array is already sorted.</p>
            <p><b>Average-case:</b> O(n<sup>2</sup>)</p>
            <p><b>Worst-case:</b> O(n<sup>2</sup>) –– when the array is reversed.</p>
          </div>
        );
        break;
  
      case 'quick':
        content = (
          <div>
            <h2><b>Quick Sort:</b></h2>
            <p><i className="fa-solid fa-square base-color"></i> Base Index</p>
            <p><i className="fa-solid fa-square comp-color"></i> Comparison Index</p>
            <p><i className="fa-solid fa-square swap-color"></i> Swap Index</p>
            <p>
              Quick sort is a divide-and-conquer sorting algorithm, and there are multiple ways to implement it. 
              My version chooses the last element as the pivot, though ideally, the pivot should be near the median for optimal performance (pivot = base). 
              This explanation covers my specific approach, which incorporates recursion.
            </p>
            <p>
              In my algorithm, the 'pivot' is the last element. 
              We also have a 'comparison' index starting from the beginning of the array. 
              It moves forward until it encounters a value greater than the pivot. 
              Upon finding such a value, another 'swap' index starts from this position and increments until it finds a value less than the pivot. 
              Once found, the values at 'comparison' and 'swap' indices are exchanged. 
              The 'comparison' index increments by 1, and the 'swap' index continues its journey from its last position. 
              This process ensures we're always comparing the 'swap' index's value against the pivot. 
              Once the 'swap' index meets the pivot, we swap the 'comparison' index value with the pivot, effectively placing the pivot in its sorted position.
            </p>
            <p>
              After positioning the pivot, the array gets divided into two parts: left and right of the pivot. 
              Recursion comes into play here. 
              We apply the same sorting method separately to both sub-arrays by adjusting the start and end parameters in the recursive function call.
            </p>
            <p><b>Best-case:</b> O(n log n) –– with a good pivot selection.</p>
            <p><b>Average-case:</b> O(n log n)</p>
            <p><b>Worst-case:</b> O(n<sup>2</sup>) –– when the pivot is the smallest or largest element. 
            For my algorithm, this would be when the array is sorted since the last element would be the largest.</p>
          </div>
        );
        break;

      case 'merge':
        content = (
          <div>
            <h2><b>Merge Sort:</b></h2>
            <p><i className="fa-solid fa-square base-color"></i> End Index</p>
            <p><i className="fa-solid fa-square comp-color"></i> Start Index</p>
            <p><i className="fa-solid fa-square swap-color"></i> Middle Index</p>
            <p>
              Merge sort is another divide-and-conquer sorting algorithm. 
              The core principle involves recursively dividing the array into subarrays and reassembling them in sorted order.
            </p>
            <p>
              We start by splitting the array in half recursivelly into subarrays until we reach the smallest unit, a single element (our base case).
              These single-element subarrays are inherently sorted.
              At this point, we begin merging and sorting the subarrays.
              The sorting actually occurs while we are merging these subarrays.
              During merging, it compares the elements of two elements and places them in the correct order.
              Once the left and right subarrays are sorted, they are merged together.
              This merging process continues until all the pieces come together as a fully sorted array.
            </p>
            <p>
              In essence, merge sort first breaks everything down, then builds it back up in a sorted manner. 
              Because of this structured approach, merge sort consistently works with a predictable time complexity, regardless of the initial arrangement of the input array.
            </p>
            <p><b>Best-case:</b> O(n log n)</p>
            <p><b>Average-case:</b> O(n log n)</p>
            <p><b>Worst-case:</b> O(n log n) –– merge sort maintains the same complexity irrespective of the input's nature, making it especially reliable.</p>
          </div>
        );
        break;
  
      default:
        content = <p>Please select a sorting method.</p>;
    }
  
    return <div className="col">
            {content}
           </div>;
}

export default BigO;