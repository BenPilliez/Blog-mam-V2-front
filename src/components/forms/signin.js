import React from "react"
import {Field, Form, Formik} from 'formik'
import {Avatar, Grid, InputAdornment, makeStyles, Paper, Typography, Box,Button} from '@material-ui/core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {TextField} from 'formik-material-ui'
import * as Yup from "yup"
import loginImage from "../../images/login.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '50vh',
    },
    image: {
        backgroundImage: `url(${loginImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    divSpace: {
        marginTop: theme.spacing(2)
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

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

const SignIn = (props) => {

    const classes = useStyles()
    const handleSubmit = (values) => {
        console.log(values)
    }

    return (

        <Grid container component={'main'} className={classes.root}>
            <Grid item xs={false} sm={false} md={5} component={Paper} className={classes.image}/>
            <Grid item xs={12} sm={12} md={7} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <FontAwesomeIcon icon={"lock"}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Se connecter !
                    </Typography>
                    <Formik
                        validateOnChange
                        initialValues={initialValue}
                        onSubmit={(values) => handleSubmit(values)}
                        validationSchema={validationSchema}

                    >
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
                                    name="password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <FontAwesomeIcon icon={"key"}/>
                                            </InputAdornment>
                                        ),
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
                    </Formik>
                </div>
            </Grid>
        </Grid>)
}
export default SignIn
