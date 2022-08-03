import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
import axios from 'axios';

import TableContext from '../context/TableContext';
import UserCreateBooking from '../components/Modals/UserCreateBooking';

const Restaurants = () => {
  const { restaurants, login, getAvailableTimeslots, availableTimeslots, maxCapacity } = useContext(TableContext);
  const [bookButtonStyle, setBookButtonStyle] = useState('btn btn-disabled w-24 mx-1');
  const [moduleBookButtonStyle, setModuleBookButtonStyle] = useState('btn btn-disabled w-24 mx-1');
  const [restaurantProfile, setRestaurantProfile] = useState({});
  const [dateValue, setDateValue] = useState(new Date());
  const [dateFormatted, setDateFormatted] = useState({});
  const [covers, setCovers] = useState(0);
  const [timeslots, setTimeslots] = useState([]);
  const [timeSelected, setTimeSelected] = useState();

  const navigate = useNavigate();

  const badgeActive = "badge badge-outline m-1 p-3 cursor-pointer";
  const badgeInactive = "badge badge-accent m-1 p-3 cursor-pointer";

  const parseCover = input => {
    return input === '' ? setCovers(0) : setCovers(parseInt(input));
  };

  const bookButton = element => {
    return (
      <label
        htmlFor='userBookingModal'
        className={bookButtonStyle}
        onClick={ () => login && setRestaurantProfile(element)}
      >
        Book
      </label>
    );
  };

  const submitBooking = () => {
    setTimeout(() => {
      const values = {
        day: dateFormatted.day,
        dayDate: dateFormatted.date,
        month: dateFormatted.month,
        year: dateFormatted.year,
        covers: covers,
        time: timeSelected
      };

    axios
      .post(`http://localhost:5000/api/user/booking/${restaurantProfile.id}`, values)
      .then(navigate('/user/bookings'))
    }, 500);
  };

  useEffect(() => {
    login ? setBookButtonStyle('btn btn-outline btn-primary w-24 mx-1') : setBookButtonStyle('btn btn-disabled w-24 mx-1');
    timeSelected ? setModuleBookButtonStyle('btn btn-outline btn-primary w-24 mx-1') : setModuleBookButtonStyle('btn btn-disabled w-24 mx-1');

    const dateArr = moment(dateValue).format("LLLL").split(' ').splice(0, 4).map(element => element.split('').filter(letter => letter !== ',' && letter).join(''));
    setDateFormatted({
      day: dateArr[0],
      date: dateArr[2],
      month: dateArr[1],
      year: dateArr[3],
    });

    setTimeslots(availableTimeslots)

  }, [login, dateValue, covers, availableTimeslots, timeSelected]);

  return (
    <div className='my-5 w-screen'>
      <div className='flex justify-center flex-wrap'>
      {restaurants.map(element => {
        return (
          <div className='m-3' key={element.id}>
            <div className="card glass h-full w-60">
              <div className='p-3 h-60 grid content-center'>
                <img src={element.logo} alt={element.name} style={{borderRadius: 10}}/>
              </div>
              <div className="card-body py-2 p-5">
                <div>
                  <p className="card-title flex justify-center mb-2"> {element.name} </p>
                  <p className='text-sm'> {element.building} </p>
                  <p className='text-sm'> {element.street} </p>
                  <p className='text-sm'> {element.city}, {element.country} </p>
                  <p className='text-sm mt-3'> First Booking: {element.open}</p>
                  <p className='text-sm'> Last Booking: {element.close}</p>
                </div>
              </div>
              <div className='mb-3 flex justify-center'>
                <Link to={`/restaurant/${element.id}`}>
                  <span className='btn btn-outline btn-secondary w-24 mx-1'>Info</span>
                </Link>
                { bookButton(element) }
              </div>
            </div>
          </div>
        )
      })}


      <input className="modal-toggle" type="checkbox" id="userBookingModal" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center mb-5"> Book {restaurantProfile.name} </h3>
          <div className='flex justify-center m-5' >
            <Calendar value={dateValue} onChange={setDateValue} />
          </div>
          <div className='flex justify-center m-5'>
            {`${dateFormatted.day}
              -
              ${dateFormatted.date} / ${dateFormatted.month} / ${dateFormatted.year}`}
          </div>
          <label className="flex justify-center input-group">
            <span>Covers</span>
            <input type="number" className="input input-bordered w-24 focus:outline-none" onChange={e => {
              parseCover(e.target.value)
              parseInt(e.target.value)>0 && getAvailableTimeslots(restaurantProfile.id, e.target.value, dateFormatted.date, dateFormatted.month, dateFormatted.year)
              setTimeSelected('')
              }}/>
          </label>
          <div className='my-3 flex justify-center flex-wrap'>
            { covers > maxCapacity && <div> No tables available that can seat {covers} covers.</div> }
            { (covers > 0 && covers <= maxCapacity) && timeslots.map(element => {
              const timeToString = element.toString().split(' ').map(string => string.slice(0,2)+':'+string.slice(2, 4)).join('')
              return <div className={timeToString === timeSelected ? badgeInactive : badgeActive} key={element} onClick={() => setTimeSelected(timeToString)}> { timeToString } </div>
            }) }
          </div>
          <div className='flex flex-row justify-center'>
            <span className="modal-action">
              <label className="btn btn-outline btn-error mx-3 w-24" htmlFor="userBookingModal">Cancel</label>
            </span>
            <span className="modal-action">
              <label className={moduleBookButtonStyle} onClick={() => submitBooking()}>Book</label>
            </span>
          </div>
        </div>
      </div>


      </div>
    </div>
  );
};

export default Restaurants;
