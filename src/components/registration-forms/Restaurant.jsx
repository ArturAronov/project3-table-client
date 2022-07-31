import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import MyTextInput from './MyTextInput';
import TimeInput from './TimeInput';
import Turnaround from './Turnaround';
import FileInput from './FileInput';

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
          daysOperating: 'asdf',
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
          daysOperating: yup.string(),
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

            for (var pair of data.entries()) {
              console.log(pair[0]+ ', ' + pair[1]);
            }

            axios
              .post('http://localhost:5000/api/business/auth/signup', data)
              .catch(err => {
            });
            // alert(JSON.stringify(values, null, 2));
            // alert(data);
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            name="name"
            type="text"
            placeholder="Restaurant's name"
          />

          <MyTextInput
            name="phone"
            type="text"
            placeholder="Phone number"
          />

          <MyTextInput
            name="email"
            type="email"
            placeholder="E-mail"
          />

          <MyTextInput
            name="building"
            type="text"
            placeholder="Building name"
          />

          <MyTextInput
            name="street"
            type="text"
            placeholder="Street name & number"
          />

          <MyTextInput
            name="city"
            type="text"
            placeholder="City"
          />

          <MyTextInput
            name="country"
            type="text"
            placeholder="Country"
          />

          <MyTextInput
            name="zipCode"
            type="text"
            placeholder="Zip Code"
          />

          <FileInput
            name="logo"
            type="file"
          />

          <MyTextInput
            name="password"
            type="password"
            placeholder="Password"
          />

          <MyTextInput
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

           <MyTextInput
            name="daysOperating"
            type="text"
            placeholder="Days Operating"
          />

          <button type="submit" className="btn my-3 px-0 hero btn-outline btn-secondary">
            Submit
          </button>
        </Form>

      </Formik>
    </>
  )
};

export default ComponentsRegistrationFormsRestaurants;
