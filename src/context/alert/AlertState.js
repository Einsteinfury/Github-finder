import React, {useReducer} from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
  SET_ALERT,
  REMOVE_ALERT
} from '../types';

const AlertState = props => {
  const initialState = {
    alert: null
  }

  const setAlert = (msg, alertType) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        msg: msg,
        alertType: alertType
      }
    });
    setTimeout(() => dispatch({type: REMOVE_ALERT}), 5000);
  }

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  return <AlertContext.Provider value={{
    alert: state.alert,
    setAlert
  }}>
    {props.children}
  </AlertContext.Provider>
}

export default AlertState;