import React from "react"
import {Avatar, Box, Grid, Link, makeStyles, Paper, Slide, Typography} from "@material-ui/core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import SignIn from "./signin"
import SignUp from "./signup"
import loginImage from "../../../images/login.jpg"

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
    }
}))

const AuthForm = ({handleClose}) => {

    const [signUp, setSignUp] = React.useState(false)
    const [signIn, setSignIn] = React.useState(true)
    const classes = useStyles()

    const handleChange = () => {
        setSignUp(!signUp)
        setSignIn(!signIn)
    }

    return (
        <React.Fragment>
            <Grid container component={'main'} className={classes.root}>
                <Grid item xs={false} sm={false} md={5} component={Paper} className={classes.image}/>
                <Grid item xs={12} sm={12} md={7} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <FontAwesomeIcon icon={"lock"}/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {signIn ? 'Connexion' : 'Inscription'}
                        </Typography>
                        <Slide in={signIn} direction={'up'} mountOnEnter unmountOnExit>
                            <Paper style={{width: '100%'}}>
                                <SignIn handleClose={handleClose}/>
                            </Paper>
                        </Slide>
                        <Slide in={signUp} direction={'left'} mountOnEnter unmountOnExit>
                            <Paper style={{width: '100%'}}>
                                <SignUp handleChange={handleChange}/>
                            </Paper>
                        </Slide>
                        <Box margin={2} style={{display: 'flex', justifyContent: 'flex-end', width: "100%"}}>
                            <Link
                                component={"button"}
                                underline={'none'}
                                onClick={() => {
                                    handleChange()
                                }}
                            >
                                {signIn ? 'Créer un compte' : 'Se connecter'}
                            </Link>
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default AuthForm
