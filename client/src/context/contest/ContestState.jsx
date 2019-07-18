import React, { useReducer } from "react";
import axios from "axios";
import ContestContext from "./contestContext";
import contactReducer from "./contestReducer";
import {
  GET_CONTEST,
  ADD_CONTEST,
  DELETE_CONTEST,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTEST,
  FILTER_CONTEST,
  CLEAR_CONTEST,
  CLEAR_FILTER,
  CONTEST_ERROR
} from "../types";

const ContestState = props => {
  const initialState = {
    contests: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts
  const getContest = async () => {
    try {
      const res = await axios.get("/api/contest");

      dispatch({
        type: GET_CONTEST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTEST_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Contest
  const addContest = async contest => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/contacts", contest, config);

      dispatch({
        type: ADD_CONTEST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTEST_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Contest
  const deleteContest = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({
        type: DELETE_CONTEST,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: CONTEST_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Contest
  const updateContest = async contest => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        `/api/contest/${contest._id}`,
        contest,
        config
      );

      dispatch({
        type: UPDATE_CONTEST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTEST_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Contacts
  const clearContest = () => {
    dispatch({ type: CLEAR_CONTEST });
  };

  // Set Current Contest
  const setCurrent = contest => {
    dispatch({ type: SET_CURRENT, payload: contest });
  };

  // Clear Current Contest
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Contacts
  const filterContest = text => {
    dispatch({ type: FILTER_CONTEST, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContestContext.Provider
      value={{
        contests: state.contest,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContest,
        deleteContest,
        setCurrent,
        clearCurrent,
        updateContest,
        filterContest,
        clearFilter,
        getContest,
        clearContest
      }}
    >
      {props.children}
    </ContestContext.Provider>
  );
};

export default ContestState;
