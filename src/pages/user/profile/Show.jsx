import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TableContext from '../../../context/TableContext';

const PagesUserProfileShow = () => {
  const { getProfile, profileArray } = useContext(TableContext);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className='w-screen my-5'>
      <div className='flex justify-center py-5'>
        <div className="stats stats-vertical shadow my-5">
          { profileArray().map(element => {
            return (<div className="stat" key={Object.keys(element)}>
              <div className="flex justify-center stat-title"> {Object.keys(element)} </div>
              <div className="flex justify-center stat-value"> {Object.values(element)} </div>
            </div>)
          })}
        </div>
      </div>
      <div className='flex justify-center'>
        <Link to='/user/profile/edit'>
          <div className='btn btn-accent w-20'>Edit</div>
        </Link>
      </div>
    </div>
  );
};

export default PagesUserProfileShow;
