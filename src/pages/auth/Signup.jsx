import { useState } from 'react';
import ComponentsRegistrationFormCustomer from '../../components/registration-forms/Customer'
import ComponentsRegistrationFormsRestaurants from '../../components/registration-forms/Restaurant'
const PagesAuthSignup = () => {
  const [toggle, setToggle] = useState(true);

  const handleToggleClick = () => {
    return setToggle(!toggle)
  }
  return (
    <div className='hero-content'>
      <div>
        <div className='text-center'>
          Register
        </div>
        <div className='text-center'>
          Select your portal
        </div>
        <div className="form-control w-auto hero-content">
          <label className="label cursor-pointer">
            <span className="label-text mx-3">Customer</span>
            <input
              type="checkbox"
              className="toggle toggle-accent"
              onChange={handleToggleClick}
              checked={toggle}
            />
            <span className="label-text mx-3">Restaurant</span>
          </label>
        </div>
        {toggle ? <ComponentsRegistrationFormsRestaurants /> : <ComponentsRegistrationFormCustomer />}
      </div>

    </div>
  );
};

export default PagesAuthSignup;
