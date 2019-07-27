import React, { useReducer } from "react";
import axios from "axios";
import ContestContext from "./ContestContext";
import ContestReducer from "./ContestReducer";
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
    contestList: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(ContestReducer, initialState);

  // Get contests
  const getContest = async () => {
    try {
      const res = await axios.get("/api/contest");

      dispatch({
        type: GET_CONTEST,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: CONTEST_ERROR
        // payload: err.response.msg
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
      const res = await axios.post("/api/contest", contest, config);

      dispatch({
        type: ADD_CONTEST,
        payload: res.data
      });
    } catch (err) {
      console.log(`this is the error ${err}`);
      dispatch({
        type: CONTEST_ERROR,
        payload: err.msg
      });
    }
  };

  // Delete Contest
  const deleteContest = async id => {
    try {
      await axios.delete(`/api/contest/${id}`);

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

  // Clear contests
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

  // Filter contests
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
        contestList: state.contestList,
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
