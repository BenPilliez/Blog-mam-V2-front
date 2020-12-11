import React from "react"
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress,InputAdornment } from '@material-ui/core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { TextField } from 'formik-material-ui'
import * as Yup from "yup"

const validationSchema = Yup.object({
    email: Yup
        .string('Email')
        .email('Il faut un email valide du type xxx@xxx.com')
        .required('Le champ est obligatoire'),
    password: Yup
        .string('Mot de passe')
        .required('Mot de passe obligatoire')
})

const initialValue = {
    email: '',
    password: ''
}

const Signin = () => {

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <Formik
            validateOnChange
            initialValues={initialValue}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={validationSchema}
        >
            <Form>
                <Field
                    component={TextField}
                    variant="outlined"
                    label="Email"
                    name="email"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={"envelope"} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Form>

        </Formik>
    )
}
export default Signin
