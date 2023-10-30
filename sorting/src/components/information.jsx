import { useEffect, useState } from "react";
import BigO from "./bigo";

function Information(props) {
    const { sortType } = props;

    return (<div className="information">
                <div>
                    <h2>Definitions</h2>
                    <p><i className="fa-solid fa-square base-color"></i> Base Index</p>
                    <p><i className="fa-solid fa-square comp-color"></i> Comparison Index</p>
                    <p><i className="fa-solid fa-square swap-color"></i> Swap Index (only quick sort)</p>
                    <p><b>Worst Case:</b> &nbsp;The time complexity when the input is in the least favorable condition for the algorithm.</p>
                    <p><b>Best Case:</b> &nbsp;The time complexity when the input is in the most favorable condition for the algorithm.</p>
                    <p><b>Average Case:</b>  &nbsp;Takes into account all possible input configurations and their likelihood.</p>
                    <p><b>n:</b> &nbsp;Input size or, in this case, the number of elements in the array.</p>
                    <p><b>Big O Notation:</b> &nbsp;A tool used to describe the time complexity relative to n. To simplify, the time it takes to sort the array relative to n.</p>
                    <p><b>Base Index:</b> &nbsp;The index used to compare the other values to (personal definition).</p>
                    <b>Best Time Complexity</b>
                    <ul>
                        <li>O(n)</li>
                        <li>O(log n)</li>
                        <li>O(n)</li>
                        <li>O(n log n)</li>
                        <li>O(n<sup>2</sup>)</li>

                    </ul>
                    <b>Worst Time Complexity</b>
                </div>
                <div>
                    <BigO sortType={sortType} />
                </div>
            </div>)
}

export default Information;