import React, {Suspense} from "react";
import {createMuiTheme, CssBaseline, makeStyles, ThemeProvider, CircularProgress} from "@material-ui/core";
import {BrowserRouter} from "react-router-dom";
import {deepPurple, indigo, purple} from "@material-ui/core/colors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SnackbarProvider} from "notistack";
import Router from "./routes/routes";

const CustomDialog = React.lazy(() => import("./components/custom/customDialog"));
const Footer = React.lazy(() => import("./components/layout/footer"));
const AuthForm = React.lazy(() => import("./components/forms/auth"));
const NavBar = React.lazy(() => import("./components/navigations/navbar"));
const Grid = React.lazy(() => import("@material-ui/core/Grid"));

const useStyles = makeStyles((theme) => ({
    rootContent: {
        [theme.breakpoints.up("md")]: {
            paddingTop: 60
        }
    },
    paper: {
        minHeight: "100vh",
        width: "100%"
    }
}));

function App() {

    const [darkState, setDarkState] = React.useState(JSON.parse(localStorage.getItem("darkState")) || false);
    const [open, setOpen] = React.useState(false);
    const palletType = darkState ? "dark" : "light";
    const classes = useStyles();
    const notistackRef = React.useRef();

    const mainPrimaryColor = darkState ? purple[500] : indigo[500];
    const mainSecondaryColor = darkState ? deepPurple[500] : indigo[900];

    const handleClose = React.useCallback(() => {
        setOpen(open => !open);
    }, [setOpen]);

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
    });

    const handleThemeChange = () => {
        setDarkState(!darkState);
        localStorage.setItem("darkState", !darkState);
    };

    const onClickDismiss = key => () => {
        notistackRef.current.closeSnackbar(key);
    };

    return (
        <Suspense fallback={<CircularProgress/>}>
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
                            <Grid container>
                                <Grid item xs={12}>

                                    <NavBar isDark={darkState} handleChange={handleThemeChange}
                                            handleOpen={() => setOpen(true)}
                                    />
                                    <main className={classes.rootContent}>
                                        <Router/>
                                    </main>
                                    <footer>
                                        <Footer/>
                                    </footer>
                                    <CustomDialog
                                        handleClose={handleClose}
                                        title={"Connexion / Inscription"}
                                        isOpen={open}
                                        fullScreen={true}>
                                        <AuthForm handleClose={handleClose}/>
                                    </CustomDialog>
                                </Grid>
                            </Grid>
                        </SnackbarProvider>
                    </ThemeProvider>
                </div>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
