import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  SET_LOADING,
  CLEAR_USERS
} from '../types';
import { async } from 'q';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  //search users
  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  }

  //get single Github user
  const getUser = async username => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}`);
    dispatch({
      type: GET_USER,
      payload: res.data
    });
    //setAlert(null);
  }

  //get user repos
  const getUserRepos = async username => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`);
    
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
    //setAlert(null);
  }

  //clean users
  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS
    });
  }

  const loadMore = async () => {
    
  }

  //set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  return <GithubContext.Provider value={{
    users: state.users,
    user: state.user,
    repos: state.repos,
    loading: state.loading,
    searchUsers,
    getUser,
    getUserRepos,
    clearUsers
  }}>{props.children}
  </GithubContext.Provider>
}

export default GithubState;