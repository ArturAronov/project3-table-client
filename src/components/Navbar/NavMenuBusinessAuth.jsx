import { useContext } from 'react';
import { Link } from 'react-router-dom';

import TableContext from '../../context/TableContext';

const NavMenuBusinessAuth = () => {
  const { authLogout } = useContext(TableContext)

  return (
    <>
      <Link to='/about'>
        <div className='btn btn-ghost p-3 rounded-sm text-primary  w-max'>
          About
        </div>
      </Link>
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
        <div className='btn btn-ghost text-error p-3 rounded-sm text-primary w-max' onClick={authLogout}>
          Logout
        </div>
      </Link>
    </>
  );
};

export default NavMenuBusinessAuth;
