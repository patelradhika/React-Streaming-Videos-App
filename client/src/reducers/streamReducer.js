import _ from "lodash";
import {
    STREAM_CREATE,
    STREAM_DELETE,
    STREAM_EDIT,
    STREAM_LIST,
    STREAM_SHOW,
} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case STREAM_LIST:
            return { ...state, ..._.mapKeys(action.payload, "id") };
        case STREAM_CREATE:
            return { ...state, [action.payload.id]: action.payload };
        case STREAM_SHOW:
            return { ...state, [action.payload.id]: action.payload };
        case STREAM_EDIT:
            return { ...state, [action.payload.id]: action.payload };
        case STREAM_DELETE:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};
