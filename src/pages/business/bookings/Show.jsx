import { useContext } from 'react';
import TableContext from '../../../context/TableContext'

const PagesBusinessBookingsShow = () => {
  const { data } = useContext(TableContext);
  return (
    <div>
    {console.log(data)}
      Pages: Business Bookings Show
    </div>
  );
};

export default PagesBusinessBookingsShow;
