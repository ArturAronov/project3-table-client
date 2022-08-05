import { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import TableContext from '../context/TableContext'

import Navbar from '../components/Navbar/Navbar';

const App = () => {
const { getProfile, getRestaurants, getUserBookings, getTables, getRestaurantBookings } = useContext(TableContext);

  useEffect(() => {
    getProfile();
    getRestaurants();
    getUserBookings();
    getTables();
    getRestaurantBookings();
  }, [])

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
