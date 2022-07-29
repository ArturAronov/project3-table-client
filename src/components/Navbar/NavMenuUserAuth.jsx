import {Link} from 'react-router-dom';

const NavMenuUserAuth = () => {
  return (
    <>
      <Link to='/about'>
        <div className='btn btn-ghost p-3 rounded-sm text-slate-300 w-max'>
          About
        </div>
      </Link>
      <Link to='/user/bookings'>
        <div className='btn btn-ghost w-full p-3 rounded-sm text-slate-300 w-max'>
          My Bookings
        </div>
      </Link>
      <Link to='/restaurants'>
        <div className='btn btn-ghost p-3 rounded-sm text-slate-300 w-max'>
          Restaurants
        </div>
      </Link>
      <Link to='/'>
        <div className='btn btn-ghost p-3 rounded-sm text-slate-300 w-max'>
          Logout
        </div>
      </Link>
      <Link to='/user/profile'>
        <div className='btn btn-ghost p-3 rounded-sm text-slate-300 w-max'>
          Profile
        </div>
      </Link>
    </>
  );
};

export default NavMenuUserAuth;
