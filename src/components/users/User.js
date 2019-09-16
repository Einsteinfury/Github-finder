import React, {Fragment, useEffect, useContext } from 'react';
import Spinner from '../Layout/Spinner';
import Repos from '../Repos/Repos';
import {Link} from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User = ({match}) => {

  const context = useContext(GithubContext);
  const {getUser, getUserRepos, loading, user} = context;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

  const {name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    company,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user;

  if (loading){
    return <Spinner />;
  }

  else {
    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>Back to Search</Link>
        Hireable: {' '}
        {hireable ? <i className='fas fa-check text-success' />
        : <i className='fas fa-times-circle text-danger' />}

        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-light">Public repos: {public_repos}</div>
          <div className="badge badge-dark">Public gists: {public_gists}</div>
        </div>

        <div className='card grid-2'>
          <div className='all-center'>
            <img src={avatar_url} className='round-img' alt='img' style={{width: '150px'}}/>
            <h1>{name}</h1>
            <p>location: {location}</p>
            <a href={html_url} className='btn btn-dark my-1'>
              Visit <i className='fab fa-github' /> GitHub profile
            </a>
          </div>
          <div>
            {bio && <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>}
            
            <ul>
              <li>
                {login && <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>}
              </li>

              <li>
                {company && <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>}
              </li>

              <li>
                {blog && <Fragment>
                  <strong>Website: </strong> {blog}
                </Fragment>}
              </li>
            </ul>
          </div>
        </div>
        <Repos />
      </Fragment>
    );
  }
}

export default User
