import { getByTestId } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { Pagination } from './../components/Pagination';
import { Icon } from './../components/Icon';

export const TablePage = ({ search }) => {
  const [pagination, setPagination] = useState({
    active: 1,
    data: [],
    type: null,
    drowSort: -1,
  });

  const requestJSON = async () => {
    try {
      const rows = 200;
      const url = `http://www.filltext.com/?rows=${rows}&id={number|${rows}}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}`;
      const options = {
        method: 'GET',
        body: null,
        headers: {},
      };
      const data = await (await fetch(url, options)).json();
      // console.log(data);

      setPagination({ ...pagination, data });
    } catch (error) {}
  };

  const createTableBody = () => {
    if (!search) {
      return pagination.data.map((item, index) => {
        if (
          pagination.active * 50 > index &&
          (pagination.active - 1) * 50 <= index
        ) {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>+7 {item.phone}</td>
            </tr>
          );
        }
      });
    } else {
      const value = search.toLowerCase();
      return pagination.data
        .filter((item) => {
          if (item.id.toString().toLowerCase().includes(value)) {
            return item;
          }
          if (item.firstName.toLowerCase().includes(value)) {
            return item;
          }
          if (item.lastName.toLowerCase().includes(value)) {
            return item;
          }
          if (item.email.toLowerCase().includes(value)) {
            return item;
          }
          if (item.phone.toString().toLowerCase().includes(value)) {
            return item;
          }
        })
        .map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>+7 {item.phone}</td>
            </tr>
          );
        });
    }
  };

  const sort = (type) => {
    let sorted = [...pagination.data];
    let drowSort = -1;
    if (type === pagination.type) {
      drowSort = pagination.drowSort === -1 ? 1 : -1;
    }
    sorted.sort((a, b) => {
      if (a[type] === b[type]) {
        return 0;
      }
      return a[type] > b[type] ? drowSort : drowSort * -1;
      // return a[type] > b[type] ;
      // return type === 'arrow_drop_down' ? 1 : -1;
    });

    if (pagination.type === type) {
      setPagination({
        ...pagination,
        data: sorted,
        type,
        drowSort,
      });
    } else {
      setPagination({
        ...pagination,
        data: sorted,
        type,
        drowSort,
      });
    }
  };

  const drowSort = (type) => {
    if (pagination.type === type) {
      return (
        <Icon
          icon={pagination.drowSort === 1 ? 'arrow_drop_up' : 'arrow_drop_down'}
        />
      );
    } else {
      return '';
    }
  };

  const activePagination = (active) => {
    setPagination({ ...pagination, active: active });
  };

  useEffect(() => {
    requestJSON();
  }, []);

  useEffect(() => {
    setPagination({ ...pagination, active: 1, type: null, drowSort: -1 });
  }, [search]);

  return (
    <div className="container center">
      <div className="row">
        <div className="col s12">
          {pagination && (
            <table>
              <thead>
                <tr>
                  <th onClick={() => sort('id')}>id {drowSort('id')}</th>
                  <th onClick={() => sort('firstName')}>
                    firstName {drowSort('firstName')}
                  </th>
                  <th onClick={() => sort('lastName')}>
                    lastName {drowSort('lastName')}
                  </th>
                  <th onClick={() => sort('email')}>
                    email {drowSort('email')}
                  </th>
                  <th onClick={() => sort('phone')}>
                    phone {drowSort('phone')}
                  </th>
                </tr>
              </thead>
              <tbody>{createTableBody()}</tbody>
            </table>
          )}
          {!search && <Pagination
            count={Math.ceil(pagination.data.length / 50)}
            active={pagination.active}
            activePagination={activePagination}
          />}
        </div>
      </div>
    </div>
  );
};
