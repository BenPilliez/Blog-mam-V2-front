import React from "react";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import * as Yup from "yup";
import {Box, Button, makeStyles} from "@material-ui/core";

const validateSchema = Yup.object({
    content: Yup
        .string("Commentaire")
        .required("Le champ est obligatoire")
});

const initialValue = {
    content: "",
};

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    title: {
        marginTop: theme.spacing(9),
        color: theme.palette.primary.main
    },
}));

const FormComment = (props) => {

    const classes = useStyles();
    const {submit} = props;

    return (
        <>
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
                {({submitForm, isSubmitting}) => (
                    <Form className={classes.form}>
                        <Box margin={2}>
                            <label className={classes.title}>Commentaire
                                <Field
                                    component={TextField}
                                    multiline
                                    fullWidth
                                    rows={4}
                                    label="Commentaire"
                                    name="content"
                                />
                            </label>
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
        </>
    );
};

export default FormComment;
