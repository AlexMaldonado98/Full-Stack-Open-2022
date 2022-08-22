import { connect } from "react-redux";
import { activeFilter } from "../reducers/filterReducer";

const Filter = (props) => {
   
   return(
      <div>
        Filter: <input type='text' name='filter' onChange={({target}) => props.activeFilter(target.value)} />
      </div>
   );
};

const randomName = {
  activeFilter
}

export default connect(null,randomName)(Filter)