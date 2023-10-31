import Definitions from "./definitions";
import BigO from "./bigo";

function Information(props) {
    const { sortType } = props;

    return (<div className="information container-fluid">
                <div className="row row-cols-1 row-cols-xl-2">
                    <BigO sortType={sortType} />
                    <Definitions />
                </div>
            </div>)
}

export default Information;