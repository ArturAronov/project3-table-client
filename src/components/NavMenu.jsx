import {Link} from 'react-router-dom';

const NavMenu = () => {
  return (
    <>
      <Link to='/about'>
        <div className='btn btn-ghost p-3 rounded-sm text-slate-300 '>
          About
        </div>
      </Link>
      <Link to='/restaurants'>
        <div className='btn btn-ghost p-3 rounded-sm text-slate-300 '>
          Restaurants
        </div>
      </Link>
      <Link to='/auth/login'>
        <div className='btn btn-ghost p-3 rounded-sm text-slate-300 '>
          Login
        </div>
      </Link>
      <Link to='/auth/signup'>
        <div className='btn btn-ghost p-3 rounded-sm text-slate-300 '>
          Register
        </div>
      </Link>
    </>
  );
};

export default NavMenu;
