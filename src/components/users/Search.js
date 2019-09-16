import React, {useState, useContext} from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {

  const context = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const {searchUsers, clearUsers, users} = context;
  const [text, setText] = useState('');

  const onChange = e => setText(e.target.value);

  const onSubmit = e => {
    e.preventDefault();

    if (text === '') {
      alertContext.setAlert('please enter text', 'light');
    }
    else {
      searchUsers(text);
      setText('');
    }
  }

  const onClick = e => {
    setText('');
    document.getElementsByName("text").value = '';
    clearUsers();
  }

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input type="text" name="text" placeholder="Search users" value={text} onChange={onChange}/>
        <input type="submit" value="search" className="btn btn-dark btn-block" /> 
      </form>
      {users.length > 0 && (
        <button className="btn btn-light btn-block" onClick={onClick}>Clear</button>
      )}
    </div>
  )
}

export default Search
