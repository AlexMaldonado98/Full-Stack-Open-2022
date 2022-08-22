import { useDispatch } from "react-redux/es/exports";
import { activeFilter } from "../reducers/filterReducer";

export const Filter = () => {

    const dispatch = useDispatch();

    const handleFilter = (event) => {
      event.preventDefault();
        const content = event.target.value;
        dispatch(activeFilter({filterText: content}));
        
    };
   
   return(
      <div>
        Filter: <input type='text' name='filter' onChange={handleFilter} />
      </div>
   );
};