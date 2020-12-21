import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Field, Form, Formik} from "formik";
import {Box, Button, InputAdornment, makeStyles} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {TextField} from "formik-material-ui";
import {Signin} from "../../../store/actions/authActions";
import {useSnackbar} from "notistack";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

const validationSchema = Yup.object({
    email: Yup
        .string("Email")
        .email("Il faut un email valide du type xxx@xxx.com")
        .required("Le champ est obligatoire"),
    password: Yup
        .string("Mot de passe")
        .required("Mot de passe obligatoire")
});

const initialValue = {
    email: "",
    password: ""
};

const SignIn = (props) => {


    const {logIn, error, user, handleClose} = props;
    const {enqueueSnackbar} = useSnackbar();
    const classes = useStyles();
    const [password, setPassword] = React.useState(true);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, {
                variant: "error",
                persist: true,
            });
        }
        if (user) {
            handleClose();
        }

    }, [error, user, handleClose, enqueueSnackbar]);


    const handleSubmit = (values, setSubmitting) => {
        logIn(values);
        setSubmitting(false);
    };

    const handlePassword = () => {
        setPassword(!password);
    };

    return (
        <React.Fragment>
            <Formik
                validateOnChange
                initialValues={initialValue}
                onSubmit={(values, {setSubmitting}) => handleSubmit(values, setSubmitting)}
                validationSchema={validationSchema}
            >
                {({submitForm, isSubmitting}) => (
                    <Form className={classes.form}>
                        <Box margin={2}>
                            <Field
                                component={TextField}
                                variant="outlined"
                                fullWidth
                                label="Email"
                                name="email"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <FontAwesomeIcon icon={"envelope"}/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                        <Box margin={2}>
                            <Field
                                component={TextField}
                                variant="outlined"
                                fullWidth
                                label="Mot de passe"
                                type={password ? "password" : "text"}
                                name="password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment onClick={handlePassword} position="end">
                                            {password ? <FontAwesomeIcon icon={"eye"}/> :
                                                <FontAwesomeIcon icon={"eye-slash"}/>}
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                        <Box margin={2}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Se connecter
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </React.Fragment>

    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        error: state.auth.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (credentials) => dispatch(Signin(credentials))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
