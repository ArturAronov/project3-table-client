import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import TableContext from '../../../context/TableContext';
import TextInput from '../../../components/AuthForms/TextInput';

const PagesUserProfileUpdate = () => {
  const { updateUserProfile } = useContext(TableContext);
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
          firstName: yup.string(),
          lastName: yup.string(),
          phone: yup.number()
            .typeError('Please enter a number.'),
          email: yup.string()
            .email('Invalid email address'),
          password: yup.string()
            .min(6),
          passwordConfirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Password must match'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const data = new FormData();
            for(let i in values) {
              values[i] !== '' && data.append(i, values[i])
            };

            updateUserProfile(data);

            setSubmitting(false);
          }, 400)

        }}
      >
      <div className='w-screen'>
        <div className='flex justify-center'>
          <Form>
            <TextInput
              name="firstName"
              type="text"
              placeholder='First Name'
            />

            <TextInput
              name="lastName"
              type="text"
              placeholder='Last Name'
            />

            <TextInput
              name="phone"
              type="text"
              placeholder='Phone'
            />

            <TextInput
              name="email"
              type="email"
              placeholder='Email'
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
        </div>
      </div>
      </Formik>
    </>
  );
};

export default PagesUserProfileUpdate;
