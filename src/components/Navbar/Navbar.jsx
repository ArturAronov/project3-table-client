import { useContext } from 'react';
import { Link } from 'react-router-dom';

import NavMenu from './NavMenu';
import NavMenuUserAuth from './NavMenuUserAuth';
import NavMenuBusinessAuth from './NavMenuBusinessAuth';
import TableContext from '../../context/TableContext';

const Navbar = () => {
  const { authType } = useContext(TableContext)

  const renderNavMenu = () => {
    if(authType === 'user') {
      return <NavMenuUserAuth />
    } else if (authType === 'business') {
      return <NavMenuBusinessAuth />
    } else {
      return <NavMenu />
    }
  }

  return (
    <div className="navbar bg-base-100">
        <div className="flex-1 navbar-start text-3xl select-none text-primary-focus text- mx-3">
          <Link to='/'>
            TABLE
          </Link>
        </div>
        <div className='navbar-end'>
          <div className="hidden sm:flex">
            <div className="menu menu-horizontal p-0">
              {renderNavMenu()}
            </div>
          </div>

          <div className="dropdown  dropdown-end">
            <label tabIndex="0" className="btn btn-ghost sm:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16">
                </path>
              </svg>
            </label>
            <div tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-box text-center">
            </div>
          </div>
        </div>

      </div>
    );
  };

  export default Navbar;
