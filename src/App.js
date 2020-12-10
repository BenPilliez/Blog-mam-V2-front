import React from "react"
import NavBar from "./components/navigations/navbar"
import {createMuiTheme, makeStyles, Paper, ThemeProvider} from "@material-ui/core"
import DetailCategories from "./components/categories/detailCategories"
import Home from "./components/home"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {deepOrange, deepPurple, lightBlue, orange} from "@material-ui/core/colors"

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
    const palletType = darkState ? "dark" : "light"
    const classes = useStyles()

    const mainPrimaryColor = darkState ? orange[500] : lightBlue[500]
    const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500]

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
    return (
        <BrowserRouter>
            <div className="App">
                <ThemeProvider theme={theme}>
                    <Paper className={classes.paper}>
                        <header>
                            <NavBar isDark={darkState} handleChange={handleThemeChange}/>
                        </header>
                        <main className={classes.rootContent}>
                            <Switch>
                                <Route exact path={"/"} component={Home}/>
                                <Route exact path={"/categorie/:slug"} component={DetailCategories}/>
                            </Switch>
                        </main>
                    </Paper>
                </ThemeProvider>
            </div>
        </BrowserRouter>
    )
}

export default App;
