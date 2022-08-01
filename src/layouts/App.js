import { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import TableContext from '../context/TableContext'

import Navbar from '../components/Navbar/Navbar';

const App = () => {
const { getProfile } = useContext(TableContext);

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
