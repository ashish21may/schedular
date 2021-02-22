const initialState = {
    meetingData: []
}

export const MeetingReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case 'ADD':
            return { meetingData: [...state.meetingData, action.payload.meetingData]}
        case 'EDIT':
            console.log('action', action)
            const copiedState = [...state.meetingData]
            const selectedIndex = copiedState.findIndex(value=> value.id === action.payload.id)
            copiedState[selectedIndex] = action.payload.meetingData
            return { ...state, meetingData: [...copiedState] };
        default :
            return state;
    }
}