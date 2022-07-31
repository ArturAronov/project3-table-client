import { Formik, Form } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import TextInput from './TextInput';
import TimeInput from './TimeInput';
import Turnaround from './Turnaround';
import FileInput from './FileInput';
import DaysOperatingInput from './DaysOperatingInput';

const ComponentsRegistrationFormsRestaurants = () => {
  return (
    <>
      <div className='text-center text-3xl m-5'>Restaurant</div>
      <Formik
        initialValues = {{
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

        validationSchema = {yup.object({
          name: yup.string()
            .required('Restaurant\'s name is required'),
          phone: yup.number()
            .typeError('Please enter a number.')
            .required('Phone number is required.'),
          email: yup.string()
            .email('Invalid email address')
            .required('Email is required.'),
          building: yup.string(),
          street: yup.string()
            .required('Street name & number are required'),
          city: yup.string()
            .required('City is required.'),
          country: yup.string()
            .required('Country is required.'),
          zipCode: yup.string(),
          logo: yup.mixed(),
          open: yup.string()
            .required('Please select opening time.'),
          close: yup.string()
            .required('Please select time for last table.'),
          turnaround: yup.number().required(),
          daysOperating: yup.string()
            .required('Please select days when you restaurant is open.'),
          password: yup.string()
            .min(6)
            .required('Password is required.'),
          passwordConfirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Password must match')
            .required('Password confirmation is required.'),
        })}

        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          setTimeout(() => {
            const data = new FormData();

            for(let i in values) {
              data.append(i, values[i])
            };

            axios
              .post('http://localhost:5000/api/business/auth/signup', data)
              .catch(err => {
            });

            setSubmitting(false);
          }, 400);
        }}
      >
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

      </Formik>
    </>
  )
};

export default ComponentsRegistrationFormsRestaurants;
