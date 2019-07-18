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
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CONTEST:
      return {
        ...state,
        contests: action.payload,
        loading: false
      };
    case ADD_CONTEST:
      return {
        ...state,
        contest: [action.payload, ...state.contests],
        loading: false
      };
    case UPDATE_CONTEST:
      return {
        ...state,
        contest: state.contests.map(contest =>
          contest._id === action.payload._id ? action.payload : contest
        ),
        loading: false
      };
    case DELETE_CONTEST:
      return {
        ...state,
        contest: state.contests.filter(
          contest => contest._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_CONTEST:
      return {
        ...state,
        contests: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_CONTEST:
      return {
        ...state,
        filtered: state.contests.filter(contest => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contest.name.match(regex) || contest.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CONTEST_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
