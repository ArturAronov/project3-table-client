import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import TableContext from '../../context/TableContext';
import UserBookingModal from '../../components/Modals/UserBookingModal';

const NavMenuBusinessAuth = () => {
  const { getProfile, authLogout, profile } = useContext(TableContext);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Link to='/about'>
        <div className='btn btn-ghost p-3 rounded-sm text-primary  w-max'>
          About
        </div>
      </Link>
      <label
        className='btn btn-ghost p-3 rounded-sm text-primary  w-max'
        htmlFor='userBookingModal'
      >
        New Booking
      </label>
      <Link to='/business/bookings'>
        <div className='btn btn-ghost p-3 rounded-sm text-primary  w-max'>
          Panel
        </div>
      </Link>
      <Link to='/business/profile'>
        <div className='btn btn-ghost p-3 rounded-sm text-primary  w-max'>
          Profile
        </div>
      </Link>
      <Link to='/'>
        <div className='btn btn-ghost text-error p-3 rounded-sm w-max' onClick={authLogout}>
          Logout
        </div>
      </Link>
      {profile && <UserBookingModal input={profile}/>}
    </>
  );
};

export default NavMenuBusinessAuth;
