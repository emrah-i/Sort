import { useEffect, useState } from "react";
import BigO from "./bigo";

function Information(props) {
    const { sortType } = props;
    const [ bigO, setBigO ] = useState(null)

    return (<div className="information">
                <div>
                    <h2>Definitions</h2>
                    <p><b>Worst Case:</b> &nbsp;The time complexity when the input is in the least favorable condition for the algorithm. For example, if the array is in complete reverse order.</p>
                    <p><b>Best Case:</b> &nbsp;The time complexity when the input is in the most favorable condition for the algorithm. For example, if the array is already sorted.</p>
                    <p><b>Average Case:</b>  &nbsp;Takes into account all possible input configurations and their likelihood.</p>
                    <p><b>n:</b> &nbsp;Input size or, in this case, the number of elements in the array.</p>
                    <p><b>Big O Notation:</b> &nbsp;A tool used to describe the time complexity relative to n. To simplify, the time it takes to sort the array relative to n.</p>
                </div>
                <div>
                    <BigO sortType={sortType} />
                </div>
            </div>)
}

export default Information;