import React, {useContext} from 'react';
import UserItem from './UserItem';
import Spinner from '../Layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = () => {

  const context = useContext(GithubContext);
  const {users, loading} = context;

  if (loading){
    return (<Spinner />);
  }
  else {
    return (
      <div className='grd'>
        {users.map((user) => (
          <UserItem key={user.id} user={user}/>
        ))}
      </div>
    );
  }
};

export default Users
