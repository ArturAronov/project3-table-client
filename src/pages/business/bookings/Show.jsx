import { useContext, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import TableContext from '../../../context/TableContext';
import moment from 'moment';

const PagesBusinessBookingsShow = () => {
  const { restaurantBookings, profile } = useContext(TableContext);
  const [ dateValue, setDateValue ] = useState(new Date());
  const [ calendarData, setCalendarData ] = useState({});
  const [ daysOpen, setDaysOpen ] = useState([]);

  const filterData = () => {
    return restaurantBookings.filter(element => {
      if(element.year === calendarData.year && element.month === calendarData.month && element.dayDate === calendarData.date) {
        return element
      };
    });
  };

  const bookedDays = restaurantBookings.map(element => {
    return `${element.month} ${element.dayDate}, ${element.year}`
  });

  useEffect(() => {
    profile?.daysOperating && setDaysOpen(profile.daysOperating.split(','));

    const dateArr = moment(dateValue).format("LLLL").split(' ').map(element => element.split('').filter(letter => letter !== ',' && letter).join(''));

    setCalendarData({
      day: dateArr[0],
      date: dateArr[2],
      month: dateArr[1],
      year: dateArr[3],
    });
  }, [restaurantBookings, dateValue, profile]);

  return (
    <div className='my-5 w-screen'>
      <div className='flex justify-center'>
        <div className='max-w-lg '>
          <Calendar
            value={dateValue}
            className='text-center'
            tileClassName={({date, view}) => {
              if(bookedDays.find(element => element === moment(date).format('LL'))){
                return 'text-success font-bold bg-base-300 rounded-lg';
              } else if(!profile?.daysOpen && !daysOpen.includes(moment(date).format('LLLL').split(',')[0])){
                return 'text-error font-bold';
              };
            }}
            onChange={value => {
              const dateArr = moment(dateValue)
                .format("LLLL")
                .split(' ')
                .map(element => element
                  .split('')
                  .filter(letter => letter !== ',' && letter)
                  .join('')
                );

            setCalendarData({
              day: dateArr[0],
              date: dateArr[2],
              month: dateArr[1],
              year: dateArr[3],
            });

            setDateValue(value)
          }} />

        </div>
      </div>

      <div className="overflow-x-auto my-5 flex justify-center">
        <table className="table table-zebra">
          <thead>
            <tr className='text-center'>
              <td>Time</td>
              <td>Date</td>
              <td>Covers</td>
              <td>Name</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            { filterData().map(element => {
              return (
                <tr key={element.id}>
                  <td>{element.time}</td>
                  <td>{element.dayDate}/{element.month}/{element.year}</td>
                  <td>{element.covers}</td>
                  <td>{element.firstName} {element.lastName}</td>
                  <td className='btn'> Info </td>
                </tr>
              )
            }) }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PagesBusinessBookingsShow;
