import axios from "axios";
import {
    GET_TODOS,
    ADD_TODO,
    TOGGLE_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    TOGGLE_TAB,
} from "./types";

export const getTodos = () => async(dispatch) => {
    const res = await axios.get("/api/todos");

    dispatch({ type: GET_TODOS, payload: res.data });
};

export const addTodo = (name, created) => async(dispatch) => {
    const res = await axios.post("/api/todos/create", { name, created });

    dispatch({ type: ADD_TODO, payload: res.data });
};

export const toggleTodo = (id) => async(dispatch) => {
    const res = await axios.patch(`/api/todos/${id}`);

    dispatch({ type: TOGGLE_TODO, payload: res.data });
};

export const updateTodo = (id, name, edited) => async(dispatch) => {
    const res = await axios.patch(`/api/todos/${id}/edit`, { name, edited });

    dispatch({ type: UPDATE_TODO, payload: {...res.data, name } });
};

export const deleteTodo = (id) => async(dispatch) => {
    const res = await axios.delete(`/api/todos/delete/${id}`);

    dispatch({ type: DELETE_TODO, payload: res.data });
};

export const toggleTab = (tab) => async(dispatch) => {
    dispatch({ type: TOGGLE_TAB, filter: tab });
};