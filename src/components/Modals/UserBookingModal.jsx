import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
import axios from 'axios';
import TableContext from '../../context/TableContext';

const UserBookingModal = ({ input }) => {
  const { getAvailableTimeslots, maxCapacity, availableTimeslots, getUserBookings } = useContext(TableContext);

  const navigate = useNavigate();

  const bookBtnEnabled = 'btn btn-outline btn-primary w-24 mx-1';
  const bookBtnDisabled = 'btn btn-disabled w-24 mx-1';
  const badgeActive = "badge badge-outline m-1 p-3 cursor-pointer";
  const badgeInactive = "badge badge-accent m-1 p-3 cursor-pointer";

  const [ covers, setCovers ] = useState(0);
  const [ timeSelected, setTimeSelected ] = useState(null);
  const [ dateValue, setDateValue ] = useState(new Date());
  const [ submitData, setSubmitData ] = useState({});
  const [ bookBtnStyle, setBookBtnStyle ] = useState(bookBtnDisabled)


  const parseCover = input => {
    return input === '' ? setCovers(0) : setCovers(parseInt(input));
  };


  useEffect(() => {

    if(covers > maxCapacity) {
      setBookBtnStyle(bookBtnDisabled)
    } else if(covers < 1) {
      setBookBtnStyle(bookBtnDisabled)
    } else if (!timeSelected){
      setBookBtnStyle(bookBtnDisabled)
    } else {
      setBookBtnStyle(bookBtnEnabled)
    };

    const dateArr = moment(dateValue).format("LLLL").split(' ').map(element => element.split('').filter(letter => letter !== ',' && letter).join(''));

    setSubmitData({
      day: dateArr[0],
      dayDate: dateArr[2],
      month: dateArr[1],
      year: dateArr[3],
      time: timeSelected,
      covers: parseInt(covers)
    });
    getAvailableTimeslots(input.id, covers, dateArr[2], dateArr[1], dateArr[3]);

  }, [dateValue, covers, timeSelected]);

  return (
    <>
    <input class="modal-toggle" type="checkbox" id="userBookingModal" />
    <div class="modal">
      <div class="modal-box">
        <Calendar
          className='text-center'
          value={dateValue}
          onChange={value => {
            setDateValue(value);
          }}
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
              setBookBtnStyle(bookBtnDisabled) :
              setBookBtnStyle(bookBtnEnabled);

              // If covers are smaller than 1 or no covers are entered, don't send the request.
              (parseInt(e.target.value) > 0 && e.target.value !== '') &&
              getAvailableTimeslots(input.id, e.target.value, submitData.dayDate, submitData.month, submitData.year);
            }}/>
          </label>

          <div className='my-3 flex justify-center flex-wrap'>
          { covers > maxCapacity && <div> No tables available that can seat {covers} covers.</div> }
          { (covers > 0 && covers <= maxCapacity && input.daysOperating.split(',').includes(submitData.day)) && availableTimeslots.map(element => {
            const timeToString = element.toString().split(' ').map(string => string.slice(0,2)+':'+string.slice(2, 4)).join('')
            return <div className={timeToString === timeSelected ? badgeInactive : badgeActive} key={element} onClick={() => setTimeSelected(timeToString)}> { timeToString } </div>
          }) }
          </div>
          <div className="modal-action flex justify-center">
            <label className="btn btn-outline btn-accent" htmlFor="userBookingModal">Cancel</label>

            <label
              htmlFor='userBookingModal'
              className={bookBtnStyle}
              onClick={() => axios.post(`${process.env.REACT_APP_API_URL}/api/user/booking/${input.id}`, submitData).then(() => getUserBookings()).then(() => navigate('/user/bookings'))}
            >
              Book
            </label>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserBookingModal;
