import React from 'react';

export const Search = ({ changeHandler }) => {
  return (
    <nav>
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              required
              onChange={(event) => {
                changeHandler(event.target.value);
              }}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};
