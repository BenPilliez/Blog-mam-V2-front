import React from "react";
import NavBar from "./components/navigations/navbar";
import {createMuiTheme, CssBaseline, Grid, makeStyles, Paper, ThemeProvider} from "@material-ui/core";
import DetailCategories from "./components/categories/detailCategories";
import Home from "./components/layout/home";
import DetailPost from "./components/layout/detailPost";
import AuthForm from "./components/forms/auth";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {deepPurple, indigo, purple} from "@material-ui/core/colors";
import CustomDialog from "./components/custom/customDialog";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SnackbarProvider} from "notistack";

const useStyles = makeStyles((theme) => ({
    rootContent: {
        paddingTop: 60
    },
    paper: {
        minHeight: "100vh",
        width:'100%'
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
                                            handleOpen={() => setOpen(true)}/>
                                    <main className={classes.rootContent}>
                                        <Switch>
                                            <Route exact path={"/"} component={Home}/>
                                            <Route path={"/categorie/:slug"} component={DetailCategories}/>
                                            <Route path={"/post/:slug"} component={DetailPost}/>
                                        </Switch>
                                    </main>
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
    );
}

export default App;
