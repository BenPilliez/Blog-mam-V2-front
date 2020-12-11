import React, {useEffect} from "react"
import * as Yup from "yup"
import {connect} from "react-redux"
import {Field, Form, Formik} from "formik"
import {TextField} from 'formik-material-ui'
import {Box, Button, InputAdornment, makeStyles} from "@material-ui/core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Signup} from "../../../store/actions/authActions"
import {useSnackbar} from "notistack"

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))

const initialValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const validationSchema = Yup.object({
    username: Yup
        .string('Username')
        .required('Le champ est obligatoire'),
    email: Yup
        .string('Email')
        .email('Il faut un email valide du type xxx@xxx.com')
        .required('Le champ est obligatoire'),
    password: Yup
        .string('Mot de passe')
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        // eslint-disable-next-line
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\?<>\{\}\[\]\(\)\$%\^&\*])/, 'Le mot de passe doit contenir au moins, un chiffre, une majscule et un caractère spécial')
        .required('Le champ est obligatoire'),
    confirmPassword: Yup
        .string("Confirmation")
        .required('Le champ est obligatoire')
        .oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas ')
})

const SignUp = (props) => {

    const [password, setPassword] = React.useState(true)
    const [confirmPassword, setConfirmPassword] = React.useState(true)
    const {handleChange, error, success, signup} = props
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, {
                variant: 'error',
                persist: true
            })
        }
        if (success) {
            handleChange()
        }
    }, [error, success, enqueueSnackbar, handleChange])

    const handleSubmit = (values, setSubmitting) => {

        setSubmitting(false)
        signup(values)

    }

    const handlePassword = () => {
        setPassword(!password)
    }

    const handleConfirmPassword = () => {
        setConfirmPassword(!confirmPassword)
    }

    const classes = useStyles()
    console.log(error)

    return (
        <Formik
            validateOnChange
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting}) => handleSubmit(values, setSubmitting)}
        >
            {({submitForm, isSubmitting}) => (
                <Form className={classes.form}>
                    <Box margin={2}>
                        <Field
                            component={TextField}
                            fullWidth
                            variant={"outlined"}
                            label={"Username"}
                            name={"username"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <FontAwesomeIcon icon={"user"}/>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Box margin={2}>
                        <Field
                            component={TextField}
                            fullWidth
                            variant={"outlined"}
                            label={"Email"}
                            name={"email"}
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
                            fullWidth
                            variant={"outlined"}
                            label={"Mot de passe"}
                            type={password ? 'password' : 'text'}
                            name={"password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment onClick={handlePassword} position="end">
                                        {password ? <FontAwesomeIcon icon={'eye'}/> :
                                            <FontAwesomeIcon icon={"eye-slash"}/>}
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Box margin={2}>
                        <Field
                            component={TextField}
                            fullWidth
                            variant={"outlined"}
                            label={"Confirmation"}
                            type={confirmPassword ? 'password' : 'text'}
                            name={"confirmPassword"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment onClick={handleConfirmPassword} position="end">
                                        {confirmPassword ? <FontAwesomeIcon icon={'eye'}/> :
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
                            S'inscrire
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

const mapStateToProps = (state) => {
    return {
        success: state.auth.success,
        error: state.auth.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (form) => dispatch(Signup(form))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
