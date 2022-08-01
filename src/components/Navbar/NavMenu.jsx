import {Link} from 'react-router-dom';

const NavMenu = () => {
  return (
    <>
      <Link to='/about'>
        <div className='btn btn-ghost p-3 rounded-sm text-primary w-max'>
          About
        </div>
      </Link>
      <Link to='/restaurants'>
        <div className='btn btn-ghost p-3 rounded-sm text-primary w-max'>
          Restaurants
        </div>
      </Link>
      <Link to='/auth/login'>
        <div className='btn btn-ghost text-secondary p-3 rounded-sm text-primary w-max'>
          Login
        </div>
      </Link>
      <Link to='/auth/signup'>
        <div className='btn btn-ghost p-3 text-secondary rounded-sm text-primary w-max'>
          Register
        </div>
      </Link>
    </>
  );
};

export default NavMenu;
