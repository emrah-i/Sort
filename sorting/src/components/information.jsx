import Definitions from "./definitions";
import BigO from "./bigo";

function Information(props) {
    const { sortType } = props;

    return (<div className="information">
                <BigO sortType={sortType} />
                <Definitions />
            </div>)
}

export default Information;