import React from 'react';

export const Pagination = ({ count, active, activePagination }) => {
  let nextPagin = 'waves-effect';
  let prevPagin = 'waves-effect';
  if (active === 1) {
    prevPagin += ' disabled';
  } else if (active === count) {
    nextPagin += ' disabled';
  }

  const numbersPagin = () => {
    let numbers = [];
    for (let i = 1; i <= count; i++) {
      let className = 'waves-effect';
      if (i === active) {
        className += ' active';
      } else if (className.includes(active)) {
        className -= ' active';
      }
      numbers.push(
        <li className={className} key={i} onClick={() => activePagination(i)}>
          <a href="#!">{i}</a>
        </li>
      );
    }
    return numbers;
  };

  return (
    <ul className="pagination">
      <li
        className={prevPagin}
        onClick={() => {
          if (!prevPagin.includes('disabled')) activePagination(active - 1);
        }}
      >
        <a href="#!">
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
      {numbersPagin().map((item) => {
        return item;
      })}
      <li
        className={nextPagin}
        onClick={() => {
          if (!nextPagin.includes('disabled')) activePagination(active + 1);
        }}
      >
        <a href="#!">
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    </ul>
  );
};
