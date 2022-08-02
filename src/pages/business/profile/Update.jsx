import { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import TableContext from '../../../context/TableContext';

import TextInput from '../../../components/AuthForms/TextInput';
import TimeInput from '../../../components/AuthForms/TimeInput';
import Turnaround from '../../../components/AuthForms/Turnaround';
import FileInput from '../../../components/AuthForms/FileInput';
import DaysOperatingInput from '../../../components/AuthForms/DaysOperatingInput';

const PagesRestaurantProfileUpdate = () => {
  const { updateRestaurantProfile } = useContext(TableContext);

  return (
    <>
      <div className='text-center text-3xl m-5'>Update Profile</div>
      <Formik
        initialValues={{
          name: '',
          phone: '',
          email: '',
          building: '',
          street: '',
          city: '',
          country: '',
          zipCode: '',
          logo: '',
          open: '',
          close: '',
          turnaround: 180,
          daysOperating: '',
          password: '',
          passwordConfirmation: '',
        }}

        validationSchema={yup.object({
          name: yup.string(),
          phone: yup.number().typeError('Please enter a number.'),
          email: yup.string().email('Invalid email address'),
          building: yup.string(),
          street: yup.string(),
          city: yup.string(),
          country: yup.string(),
          zipCode: yup.string(),
          logo: yup.mixed(),
          open: yup.string(),
          close: yup.string(),
          turnaround: yup.number(),
          daysOperating: yup.string(),
          password: yup.string().min(6),
          passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
        })}

        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const data = new FormData();
            for(let i in values) {
              values[i] !== '' && data.append(i, values[i])
            };

            updateRestaurantProfile(data);

            setSubmitting(false);
          }, 400)

        }}
      >
      <div className='w-screen'>
        <div className='flex justify-center'>
          <Form>
          <TextInput
            name="name"
            type="text"
            placeholder="Restaurant's name"
          />

          <TextInput
            name="phone"
            type="text"
            placeholder="Phone number"
          />

          <TextInput
            name="email"
            type="email"
            placeholder="E-mail"
          />

          <TextInput
            name="building"
            type="text"
            placeholder="Building name"
          />

          <TextInput
            name="street"
            type="text"
            placeholder="Street name & number"
          />

          <TextInput
            name="city"
            type="text"
            placeholder="City"
          />

          <TextInput
            name="country"
            type="text"
            placeholder="Country"
          />

          <TextInput
            name="zipCode"
            type="text"
            placeholder="Zip Code"
          />

          <FileInput
            name="logo"
            type="file"
          />

          <TextInput
            name="password"
            type="password"
            placeholder="Password"
          />

          <TextInput
            name="passwordConfirmation"
            type="password"
            placeholder="Password Confirmation"
          />

          <TimeInput
            name="open"
            type="time"
            title="First Table"
          />

          <TimeInput
            name="close"
            type="time"
            title="Last Table"
          />

          <Turnaround
            name="turnaround"
            type="range"
          />

          <DaysOperatingInput
            name="daysOperating"
          />

          <button type="submit" className="btn my-5 px-0 hero btn-outline btn-secondary">
            Submit
          </button>
        </Form>
        </div>
      </div>
      </Formik>
    </>
  );
};

export default PagesRestaurantProfileUpdate;
