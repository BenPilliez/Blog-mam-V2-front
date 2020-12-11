import React from "react"
import {
    AppBar,
    Avatar,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Tab,
    Tabs,
    Toolbar,
    Tooltip,
    Typography
} from "@material-ui/core"
import {Link as RouterLink} from "react-router-dom"
import ThemeSwitch from "./themeSwitch"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const DesktopNav = ({categories, isDark, handleChange, user, handleLogout, handleOpen}) => {

    const [value, setValue] = React.useState('home')
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [files] = React.useState(user ? user.avatar : '')
    const isMenuOpen = Boolean(anchorEl)
    const classes = useStyles()

    const handleChangeValue = (event, newValue) => {
        setValue(newValue)
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const userMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Mon compte</MenuItem>
            <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
        </Menu>
    )


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
                    <Typography component={"div"}>
                        <Tooltip title={user ? 'Se déconnecter' : 'Se connecter'}>
                            {user ? (<React.Fragment>
                                <Avatar src={`${process.env.REACT_APP_BASE_PUBLIC_URL}/${files}`} onClick={(e) => handleProfileMenuOpen(e)}/>
                                {userMenu}
                            </React.Fragment>) : <IconButton onClick={() => handleOpen()}>
                                <FontAwesomeIcon size={"lg"} icon={'sign-in-alt'}/>
                            </IconButton>}
                        </Tooltip>
                    </Typography>
                    <ThemeSwitch handleChange={handleChange} isDark={isDark}/>
                </div>
            </Toolbar>

        </AppBar>
    )
}

export default DesktopNav
