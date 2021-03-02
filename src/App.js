import React, { useState } from 'react';
import { TablePage } from './Page/TablePage';
import { Search } from './components/Search';
import 'materialize-css';

function App() {

  const [search, setSearch] = useState(null);

  const changeHandler = (text) => {
    // console.log(text);
    setSearch(text ? text : null);
  };
  return (
    <div className="App">
      <Search changeHandler={changeHandler} />
      <TablePage search={search} />
    </div>
  );
}

export default App;
