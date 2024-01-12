import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import If from '../shared/if';
import AppButton from '../shared/button';

const ContactSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Too Short!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

interface SignInFormProps {
  submit: (formData: { email: string; password: string }) => void;
}

export default function SignInForm(props: SignInFormProps) {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ email: '', password: '' }}
      onSubmit={props.submit}
      validationSchema={ContactSchema}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col">
          <div className="mb-3">
            {/* <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="email"
            >
              Email
            </label> */}
            <div className="mt-2">
              <Field
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="email"
                name="email"
                placeholder="Email"
                type="email"
              />
            </div>
            <If condition={errors.email && touched.email}>
              <div className="text-red-600 text-xs mt-2">{errors.email}</div>
            </If>
          </div>

          <div className="mb-3">
            {/* <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="password"
            >
              Password
            </label> */}
            <div className="mt-2">
              <Field
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="password"
                name="password"
                placeholder="password"
                type="password"
              />
            </div>
            <If condition={errors.password && touched.password}>
              <div className="text-red-600 text-xs mt-2">{errors.password}</div>
            </If>
          </div>

          <div className="mt-2">
            <AppButton className="flex w-full justify-center" type="submit">
              Submit
            </AppButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}
