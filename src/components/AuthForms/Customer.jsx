import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import TextInput from './TextInput';

const ComponentsRegistrationFormCustomer = () => {
  let navigate = useNavigate();

  return (
    <>
      <div className='text-center text-3xl m-5'>User</div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}

        validationSchema={yup.object({
          firstName: yup.string()
            .required('First name is required.'),
          lastName: yup.string()
            .required('Last name is required.'),
          phone: yup.number()
            .typeError('Please enter a number.')
            .required('Phone number is required.'),
          email: yup.string()
            .email('Invalid email address')
            .required('Email is required.'),
          password: yup.string()
            .min(6)
            .required('Password is required'),
          passwordConfirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Password must match')
            .required('Password confirmation is required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const data = new FormData();

            for(let i in values) {
              data.append(i, values[i])
            };

            axios
              .post(process.env.REACT_APP_API_URL + '/api/user/auth/signup', data)
              .then(() => {
                navigate('/restaurants')
              })
              .catch(err => {
            });

            setSubmitting(false);
          }, 400)

        }}
      >

        <Form>
          <TextInput
            name="firstName"
            type="text"
            placeholder="First name"
          />

          <TextInput
            name="lastName"
            type="text"
            placeholder="Last name"
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
            name="password"
            type="password"
            placeholder="Password"
          />

          <TextInput
            name="passwordConfirmation"
            type="password"
            placeholder="Password confirmation"
          />

          <button type="submit" className="btn btn-outline btn-secondary m-2 hero">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default ComponentsRegistrationFormCustomer;
