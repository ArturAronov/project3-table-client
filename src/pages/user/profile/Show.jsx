import { useContext } from 'react';
import {Link} from 'react-router-dom';
import TableContext from '../../../context/TableContext';

const PagesUserProfileShow = () => {
  const { data, id } = useContext(TableContext);

  // Turn camelCased key into Camel Cased key
  const dataKeys = Object.keys(data).map(element => {
    const removeCamelCase = element.split('').map(letter => {
      return letter === letter.toUpperCase() ? ` ${letter}` : letter
    })
    const capitalizeFirstLetter = removeCamelCase.join('')
    return capitalizeFirstLetter.charAt(0).toUpperCase() + capitalizeFirstLetter.slice(1);
  });
  const dataVals = Object.values(data);
  return (
    <div className='w-screen my-5'>
      <div className='flex justify-center py-5'>
        <div className="stats stats-vertical shadow my-5">
          { dataKeys.map((element, index) => {
            return (<div className="stat" key={element}>
              <div className="flex justify-center stat-title"> {element} </div>
              <div className="flex justify-center stat-value"> {dataVals[index]} </div>
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
