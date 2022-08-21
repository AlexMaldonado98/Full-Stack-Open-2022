
export const activeFilter = (filterText) => {
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
}

export default reducer;