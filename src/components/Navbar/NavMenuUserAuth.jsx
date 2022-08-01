import { useContext } from 'react';
import {Link} from 'react-router-dom';

import TableContext from '../../context/TableContext';

const NavMenuUserAuth = () => {
  const { authLogout } = useContext(TableContext)

  return (
    <>
      <Link to='/about'>
        <div className='btn btn-ghost p-3 rounded-sm text-primary w-max'>
          About
        </div>
      </Link>
      <Link to='/user/bookings'>
        <div className='btn btn-ghost w-full p-3 rounded-sm text-primary w-max'>
          My Bookings
        </div>
      </Link>
      <Link to='/restaurants'>
        <div className='btn btn-ghost p-3 rounded-sm text-primary w-max'>
          Restaurants
        </div>
      </Link>
      <Link to='/user/profile'>
        <div className='btn btn-ghost p-3 rounded-sm text-primary w-max'>
          Profile
        </div>
      </Link>
      <Link to='/'>
        <div className='btn btn-ghost text-error p-3 rounded-sm text-primary w-max' onClick={authLogout}>
          Logout
        </div>
      </Link>
    </>
  );
};

export default NavMenuUserAuth;
