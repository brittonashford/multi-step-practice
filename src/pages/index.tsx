import { Card, CardContent, Typography } from "@material-ui/core";
import { getThemeProps } from "@material-ui/styles";
import { Formik, Form, Field, FormikConfig, FormikValues, Button } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import React, { useState } from "react";
import { childrenToReact } from "react-markdown/lib/ast-to-react";
import { mixed, number, object } from "yup";

export default function Home() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          
          initialValues={{
            firstname: "",
            lastName: "",
            millionaire: false,
            money: 0,
            description: "",
          }}
          onSubmit={() => {}}
        >
          <FormikStep>
            <Field name="firstName" component={TextField} label="First Name" />
            <Field name="lastName" component={TextField} label="Last Name" />
            <Field
              name="millionaire"
              type="checkbox"
              component={CheckboxWithLabel}
              Label={{ label: "I am a Millionaire" }}
            />
          </FormikStep>

          <FormikStep validationSchema={object({
            money: mixed().when("millionaire", {
              is: true,
              then: number()
                .required()
                .min(1_000_000, "You must have 1,000,000 to be a millionaire"),
              otherwise: number().required(),
            }),
          })}>
            <Field
              name="money"
              type="number"
              component={TextField}
              label="All the money I have"
            />
          </FormikStep>

          <FormikStep>
            <Field
              name="description"
              component={TextField}
              label="Description"
            />
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
    
}

export function FormikStep({ children }: FormikStepProps){
    return <>{children}</>
}

export function FormikStepper({children, ...props}: FormikConfig<FormikValues>) {
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];


    function isLastStep() {
        return step === childrenArray.length - 1;
    }
    return (
        <Formik {...props} 
        validationSchema={currentChild.props.validationSchema}
        onSubmit={ async(values, helpers) => {
            if(isLastStep()) {
                await props.onSubmit(values, helpers);
            } else {
                setStep(step => step +1);
            }
        }}>
            <Form autoComplete="off">{currentChild}</Form>
            {step > 0 ? 
                <Button onClick={() => setStep(step => step - 1)}>Back</Button> 
                : null
            }
            <Button type="submit">{isLastStep() ? 'Submit' : 'Next'}</Button>
        </Formik>
    );
}
