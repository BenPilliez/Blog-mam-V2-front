import React from "react";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import * as Yup from "yup";
import {Box, Button, makeStyles, Typography} from "@material-ui/core";
import ReCAPTCHA from "react-google-recaptcha";


const validateSchema = Yup.object({
    recaptcha: Yup
        .string("ReCAPTCHA")
        .required("Le champ est obligatoire"),
    content: Yup
        .string("Commentaire")
        .required("Le champ est obligatoire")
});

const initialValue = {
    content: "",
    recaptcha: ""
};

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

const FormComment = (props) => {

    const classes = useStyles();
    const {submit} = props;

    return (
        <React.Fragment>
            <Formik
                validateOnChange
                initialValues={initialValue}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    submit(values);
                    setSubmitting(false);
                    resetForm();
                }}
                validationSchema={validateSchema}
            >
                {({submitForm, isSubmitting, setFieldValue,errors}) => (
                    <Form className={classes.form}>
                        <Box margin={2}>
                            <Field
                                component={TextField}
                                multiline
                                fullWidth
                                rows={4}
                                label="Commentaire"
                                name="content"
                            />
                        </Box>
                        <Box margin={2}>
                            <Field
                                component={ReCAPTCHA}
                                name={"recaptcha"}
                                theme={"dark"}
                                onChange={(response) => setFieldValue("recaptcha", response)}
                                onExpired={() => setFieldValue("recaptcha", "")}
                                sitekey={`${process.env.REACT_APP_RECAPTCHA}`}
                            />
                            <Typography variant={"subtitle1"} color={"error"}>
                                {errors && errors.recaptcha}
                            </Typography>

                        </Box>
                        <Box margin={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Publier
                            </Button>
                        </Box>
                    </Form>

                )}

            </Formik>
        </React.Fragment>
    );
};

export default FormComment;
