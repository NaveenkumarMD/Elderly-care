import {FETCH_POST,NEW_POST} from '../Actions/Types'
const initialstate={
    items:[],
    item:{}
}
export default (state=initialstate,action)=>{
    switch (action.type) {
        case FETCH_POST:
            return {
                ...state,
                items:action.payload
            }
        case NEW_POST:
            return{
                ...state,
                item:action.payload
            }
        default:
            return state;
    }
}