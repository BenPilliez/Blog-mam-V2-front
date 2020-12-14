import React from "react"
import NavBar from "./components/navigations/navbar"
import {createMuiTheme, CssBaseline, makeStyles, Paper, ThemeProvider} from "@material-ui/core"
import DetailCategories from "./components/categories/detailCategories"
import Home from "./components/home"
import AuthForm from "./components/forms/auth"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {deepPurple, indigo, purple} from "@material-ui/core/colors"
import CustomDialog from "./components/custom/customDialog"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {SnackbarProvider} from "notistack"

const useStyles = makeStyles((theme) => ({
    rootContent: {
        paddingTop: theme.spacing(15)
    },
    paper: {
        minHeight: '100vh'
    }
}))

function App() {

    const [darkState, setDarkState] = React.useState(JSON.parse(localStorage.getItem('darkState')) || false)
    const [open, setOpen] = React.useState(false)
    const palletType = darkState ? "dark" : "light"
    const classes = useStyles()
    const notistackRef = React.useRef()

    const mainPrimaryColor = darkState ? purple[500] : indigo[500]
    const mainSecondaryColor = darkState ? deepPurple[500] : indigo[900]

    const handleClose = React.useCallback(() => {
        setOpen(open => !open)
    }, [setOpen])

    const theme = createMuiTheme({
        palette: {
            type: palletType,
            primary: {
                main: mainPrimaryColor
            },
            secondary: {
                main: mainSecondaryColor
            }
        }
    })
    const handleThemeChange = () => {
        setDarkState(!darkState)
        localStorage.setItem('darkState', !darkState)
    }

    const onClickDismiss = key => () => {
        notistackRef.current.closeSnackbar(key);
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ThemeProvider theme={theme}>
                    <SnackbarProvider
                        ref={notistackRef}
                        maxSnack={3}
                        action={(key) => (
                            <FontAwesomeIcon icon={"times"} onClick={onClickDismiss(key)}/>
                        )}
                    >
                        <CssBaseline/>
                        <Paper className={classes.paper}>
                            <header>
                                <NavBar isDark={darkState} handleChange={handleThemeChange}
                                        handleOpen={() => setOpen(true)}/>
                            </header>
                            <main className={classes.rootContent}>
                                <Switch>
                                    <Route exact path={"/"} component={Home}/>
                                    <Route exact path={"/categorie/:slug"} component={DetailCategories}/>
                                </Switch>
                            </main>
                            <CustomDialog handleClose={handleClose} title={'Connexion / Inscription'} isOpen={open}
                                          fullScreen={true}>
                                <AuthForm handleClose={handleClose}/>
                            </CustomDialog>
                        </Paper>
                    </SnackbarProvider>
                </ThemeProvider>
            </div>
        </BrowserRouter>
    )
}

export default App;
