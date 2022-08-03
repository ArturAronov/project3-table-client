import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TableContext from '../../../context/TableContext';

const PagesUserProfileShow = () => {
  const { getProfile, profileArray } = useContext(TableContext);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className='max-w-screen my-5'>
      <div className='flex justify-center py-5'>
        <div className="stats stats-vertical shadow my-5">
          { profileArray().map(element => {
            if (Object.keys(element)[0] === 'Days Operating'){
              const daysShortened = Object.values(element)[0].split(',').map(element => element.substring(0,3)).join(', ');

              return (
                <div className="stat" key={Object.keys(element)}>
                  <div className="flex justify-center stat-title"> {Object.keys(element)} </div>
                  <div className="flex justify-center sm:stat-value text-lg"> {daysShortened} </div>
                </div>
              )
            } else if(Object.keys(element)[0] !== 'Logo' && Object.values(element)[0] !== '') {
              return (
                <div className="stat" key={Object.keys(element)}>
                  <div className="flex justify-center stat-title"> {Object.keys(element)} </div>
                  <div className="flex justify-center sm:stat-value text-lg"> {Object.values(element)} </div>
                </div>
              )}
          })}
        </div>
      </div>
      <div className='flex justify-center'>
        <Link to='/business/profile/edit'>
          <div className='btn btn-accent w-20'>Edit</div>
        </Link>
      </div>
    </div>
  );
};

export default PagesUserProfileShow;
