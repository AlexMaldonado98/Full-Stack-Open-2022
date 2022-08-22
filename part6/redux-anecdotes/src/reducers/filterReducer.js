import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'filter',
    initialState: null,
    reducers: {
        activeFilter(state,action){
            state = action.payload.filterText
            return state
        }
    }

})

export const {activeFilter} = filterSlice.actions
export default filterSlice.reducer

/* export const activeFilter = (filterText) => {
    return {
        type: 'ACTIVE',
        data: {
            filterText,
        }
    }
}

const reducer = (state = null , action) => {
    switch (action.type) {
        case 'ACTIVE':
            return action.data.filterText
        default:
            return state
    }
} */

// export default reducer;