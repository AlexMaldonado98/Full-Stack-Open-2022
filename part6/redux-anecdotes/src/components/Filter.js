import { useDispatch } from "react-redux/es/exports";
import { activeFilter } from "../reducers/filterReducer";

export const Filter = () => {

    const dispatch = useDispatch();

    const handleFilter = (event) => {
        const content = event.target.value;
        dispatch(activeFilter(content));
        
    };
   
   return(
      <div>
        Filter: <input type='text' name='filter' onChange={handleFilter} />
      </div>
   );
};