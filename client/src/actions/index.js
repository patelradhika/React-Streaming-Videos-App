import streams from "../api/streams";
import history from "../history";
import {
    SIGN_IN,
    SIGN_OUT,
    STREAM_LIST,
    STREAM_CREATE,
    STREAM_DELETE,
    STREAM_EDIT,
    STREAM_SHOW,
} from "./types";

export const signIn = (userID) => {
    return {
        type: SIGN_IN,
        payload: userID,
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};

export const streamList = () => async (dispatch) => {
    const response = await streams.get("/streams");

    dispatch({ type: STREAM_LIST, payload: response.data });
};

export const streamCreate = (formValues) => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post("/streams", { ...formValues, userId });

    dispatch({ type: STREAM_CREATE, payload: response.data });
    history.push("/");
};

export const streamShow = (id) => async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: STREAM_SHOW, payload: response.data });
};

export const streamEdit = (id, formValues) => async (dispatch) => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({ type: STREAM_EDIT, payload: response.data });
    history.push("/");
};

export const streamDelete = (id) => async (dispatch) => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: STREAM_DELETE, payload: id });
    history.push("/");
};
