import { useState } from 'react';
import ComponentsRegistrationFormCustomer from '../../components/AuthForms/Customer'
import ComponentsRegistrationFormsRestaurants from '../../components/AuthForms/Restaurant'
const PagesAuthSignup = () => {
  const [toggle, setToggle] = useState(true);

  const handleToggleClick = () => {
    return setToggle(!toggle)
  }
  return (
    <div className='hero-content'>
      <div>
        <div className='text-center text-4xl'>
          Register
        </div>
        <div className='text-center mt-5'>
          Select your portal
        </div>
        <div className="form-control w-auto hero-content my-2 p-0">
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
