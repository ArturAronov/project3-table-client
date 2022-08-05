import { useState, useEffect, useContext }  from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import moment from 'moment';

import TableContext from '../../context/TableContext';

const UserBookingEditModal = ({ input }) => {
  const { getAvailableTimeslots, availableTimeslots, maxCapacity, getUserBookings } = useContext(TableContext);

  const months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11
  };

  const yearInt = parseInt(input.year);
  const monthInt = months[input.month];
  const dayInt = parseInt(input.dayDate);

  const badgeActive = "badge badge-outline m-1 p-3 cursor-pointer";
  const badgeInactive = "badge badge-accent m-1 p-3 cursor-pointer";

  const editBtnEnabled = 'btn btn-outline btn-primary';
  const editBtnDisabled = 'btn btn-disabled w-24 mx-1';

  const [ editBtnStyle, setEditBtnStyle ] = useState(editBtnEnabled);
  const [ dateValue, setDateValue ] = useState(new Date(yearInt, monthInt, dayInt));
  const [ submitData, setSubmitData ] = useState({});
  const [ timeSelected, setTimeSelected ] = useState(input.time);
  const [ covers, setCovers ] = useState(input.covers);

  const parseCover = input => {
    return input === '' ? setCovers(0) : setCovers(parseInt(input));
  };


  useEffect(() => {

    const dateArr = moment(dateValue).format("LLLL").split(' ').map(element => element.split('').filter(letter => letter !== ',' && letter).join(''));

    setSubmitData({
      day: dateArr[0],
      dayDate: dateArr[2],
      month: dateArr[1],
      year: dateArr[3],
      ...(timeSelected !== '' && { time: timeSelected }),
      ...(covers > 0 && { covers: parseInt(covers) })
    });
  }, [dateValue, covers, timeSelected]);

  return (
    <>
      <input className="modal-toggle"  type="checkbox" id="UserBookingEditModal"/>
      {console.log(submitData)}
      <div className="modal">
        <div className="modal-box">
          <p className="py-4 text-3xl text-center">Edit Booking</p>
          <Calendar
            className='text-center'
            value={dateValue}
            onChange={value => {
              setDateValue(value);

              const dateArr = moment(value).format("LLLL").split(' ').splice(0, 4).map(element => element.split('').filter(letter => letter !== ',' && letter).join(''));

              setSubmitData({
                day: dateArr[0],
                dayDate: dateArr[2],
                month: dateArr[1],
                year: dateArr[3],
                time: timeSelected,
                covers,
              });

              getAvailableTimeslots(input.restaurantId, covers, dateArr[2], dateArr[1], dateArr[3]);
            }
          }
          />

          <div className='flex justify-center m-5'>
            {`${submitData.day}
              -
              ${submitData.dayDate} / ${submitData.month} / ${submitData.year}`}
          </div>
          <label className="flex justify-center input-group">
            <span>Covers</span>
            <input
              value={covers}
              type="number"
              className="input input-bordered w-24 focus:outline-none"
              onChange={e => {
                setTimeSelected('');
                parseCover(e.target.value);
                // If covers are bigger than max capacity, covers are smaller than 1 or no covers are entered, disable the Edit button.
                (parseInt(e.target.value) > maxCapacity ||
                parseInt(e.target.value) < 1 ||
                e.target.value === '' ) ?
                setEditBtnStyle(editBtnDisabled) :
                setEditBtnStyle(editBtnEnabled);

                // If covers are smaller than 1 or no covers are entered, don't send the request.
                (parseInt(e.target.value) > 0 && e.target.value !== '') &&
                getAvailableTimeslots(input.restaurantId, e.target.value, submitData.dayDate, submitData.month, submitData.year);
              }}/>
          </label>

          <div className='my-3 flex justify-center flex-wrap'>
            { covers > maxCapacity && <div> No tables available that can seat {covers} covers.</div> }
            { (covers > 0 && covers <= maxCapacity) && availableTimeslots.map(element => {
              const timeToString = element.toString().split(' ').map(string => string.slice(0,2)+':'+string.slice(2, 4)).join('')
              return <div className={timeToString === timeSelected ? badgeInactive : badgeActive} key={element} onClick={() => setTimeSelected(timeToString)}> { timeToString } </div>
            }) }
            </div>

          <div className="modal-action flex justify-center">
            <label className="btn btn-outline btn-accent" htmlFor="UserBookingEditModal">Cancel</label>
            <label
              className="btn btn-outline btn-error"
              htmlFor="UserBookingEditModal"
              onClick={() => axios.delete(`http://localhost:5000/api/user/booking/${input.id}`).then(() => getUserBookings())}
            >
              Delete Table
            </label>
            <label
              className={editBtnStyle}
              htmlFor="UserBookingEditModal"
              onClick={() => axios.put(`http://localhost:5000/api/user/booking/${input.id}`, submitData).then(() => getUserBookings())}
            >
              Edit
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBookingEditModal;
