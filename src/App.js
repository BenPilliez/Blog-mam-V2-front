import React from "react"
import NavBar from "./components/navigations/navbar"
import {createMuiTheme, CssBaseline, makeStyles, Paper, ThemeProvider} from "@material-ui/core"
import DetailCategories from "./components/categories/detailCategories"
import Home from "./components/home"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {deepPurple, indigo, purple} from "@material-ui/core/colors"
import CustomDialog from "./components/custom/customDialog"

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

    const mainPrimaryColor = darkState ? purple[500] : indigo[500]
    const mainSecondaryColor = darkState ? deepPurple[500] : indigo[900]

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

    const handleClose = () => {
        setOpen(!open)
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ThemeProvider theme={theme}>
                    <CssBaseline />
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
                        <CustomDialog handleClose={handleClose} title={'Se connecter'} isOpen={open} fullScreen={true}/>
                    </Paper>
                </ThemeProvider>
            </div>
        </BrowserRouter>
    )
}

export default App;
