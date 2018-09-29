import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';

import ScrollToTopOnMount from '../ScrollToTopOnMount';
import AuthorArticles from './authorarticles/AuthorArticles';

const ProfileComponent = ({ match, profile }) => (
  <div id="profile" className="page-content-mid-wrapper">
    <ScrollToTopOnMount />
    <div className="profile-info-wrapper">
      <div className="profile-photo">
        <img src={profile.avatar.medium} alt={profile.name} />
      </div>
      <div className="profile-info">
        <p className="profile-name">{profile.name}</p>
        <p className="profile-bio">{profile.bio}</p>
        <div className="profile-social-media">
          <Link to={`${match.url}/following`} className="followers-link">Mengikuti <b>{profile.following}</b></Link>
          <Link to={`${match.url}/followers`} className="followers-link">Pengikut <b>{profile.followers}</b></Link>
        </div>
        <Link to={`${match.url}/edit`} id="edit-profil-button" className="main-button">Edit Profil</Link>
      </div>
    </div>
    <div className="profile-history-wrapper">
      <div className="profile-history">
        <div className="history-options-wrapper">
          {
            profile.articles &&
            <NavLink to={match.url} className="history-option" exact activeClassName="current">Profil</NavLink>
          }
          {
            profile.applause &&
            <NavLink to={`${match.url}/applause`} className="history-option" activeClassName="current">Apresiasi</NavLink>
          }
        </div>
        <Route
          path={`${match.url}/:topicId?`}
          render={(props) => (
            <AuthorArticles {...props} authorId={match.params.id} />
          )}
        />
      </div>
    </div>
  </div>
);

export default ProfileComponent;
