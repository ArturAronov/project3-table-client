import {Link} from 'react-router-dom';

const NavMenuBusinessAuth = () => {
  return (
    <>
      <Link to='/about'>
        <div className='btn btn-ghost p-3 rounded-sm text-slate-300 w-max'>
          About
        </div>
      </Link>
      <Link to='/business/bookings'>
        <div className='btn btn-ghost w-full p-3 rounded-sm text-slate-300 w-max'>
          Panel
        </div>
      </Link>
      <Link to='/'>
        <div className='btn btn-ghost p-3 rounded-sm text-slate-300 w-max'>
          Logout
        </div>
      </Link>
      <Link to='/business/profile'>
        <div className='btn btn-ghost p-3 rounded-sm text-slate-300 w-max'>
          Profile
        </div>
      </Link>
    </>
  );
};

export default NavMenuBusinessAuth;
