import { Card, CardContent, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Formik>
            initialValues={{
                firstname: '',
                lastName: '',
                millionaire: false,
                money: 0,
                description: ''
            }}
            onSubmit={() => {}}
            </CardContent>
            <Form>
                <Field 
                    name="firstName"
                    component={TextField}
                    label="First Name"
                />
                <Field
                    name="lastName"
                    component={TextField}
                    label="Last Name"
                />
                <Field 
                    name="millionaire"
                    type="checkbox"
                    component={CheckboxWithLabel}
                    Label={{ label: 'I am a Millionaire' }}
                />
                <Field  
                    name="money"
                    type="number"
                    component={TextField}
                    label="All the money I have"
                />
                <Field
                    name="description"
                    component={}
                    label="Description"
                />
            </Form>
        </Formik>
      </CardContent>
    </Card>
  );
}
