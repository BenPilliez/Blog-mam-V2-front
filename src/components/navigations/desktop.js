import React from "react"
import {AppBar, makeStyles, Tab, Tabs, Toolbar, Typography} from "@material-ui/core"
import {Link as RouterLink} from "react-router-dom"
import ThemeSwitch from "./themeSwitch"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    toolBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    themeSwitch: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}))

const DesktopNav = ({categories, isDark, handleChange}) => {

    const [value, setValue] = React.useState('home')
    const classes = useStyles()

    const handleChangeValue = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <AppBar className={classes.root} color={isDark ? 'primary' : 'transparent'} elevation={0}>
            <Toolbar className={classes.toolBar}>
                <Typography variant={"h6"} noWrap>
                    Blog
                </Typography>
                <Tabs
                    value={value}
                    onChange={handleChangeValue}
                    variant={"scrollable"}
                    scrollButtons={"auto"}
                >
                    <Tab value={'home'} component={RouterLink} to={"/"} label={'Accueil'}/>
                    {categories && categories.map((item, index) => {
                        return (
                            <Tab
                                key={index}
                                value={item.slug}
                                component={RouterLink}
                                to={`/categorie/${item.slug}`}
                                label={item.name.toUpperCase()}
                            />
                        )
                    })}
                </Tabs>
                <div className={classes.themeSwitch}>
                    <ThemeSwitch handleChange={handleChange} isDark={isDark}/>
                </div>
            </Toolbar>

        </AppBar>
    )
}

export default DesktopNav
