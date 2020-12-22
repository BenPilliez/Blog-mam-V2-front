import React, {useEffect} from "react";
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
} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import ThemeSwitch from "./themeSwitch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    toolBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    themeSwitch: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    }
}));

const DesktopNav = ({categories, isDark, handleChange, user, handleLogout, handleOpen}) => {


    const [value, setValue] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [files] = React.useState(user ? user.avatar : "");
    const [cat, setCat] = React.useState();
    const isMenuOpen = Boolean(anchorEl);
    const classes = useStyles();

    useEffect(() => {
        if (categories) {
            setCat([...categories, {name: "accueil"}].sort((a, b) => {
                if (a > b) {
                    return 1;
                }
                return -1;
            }));
            if (window.location.pathname === "/" || window.location.pathname.includes('/post')) {
                setValue("home");
            } else {
                setValue(window.location.pathname.slice(11));
            }
        }
    }, [categories]);

    const handleChangeTabsValue = (event, newValue) => {
        setValue(newValue);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const userMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            transformOrigin={{vertical: "top", horizontal: "right"}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Mon compte</MenuItem>
            <MenuItem onClick={() => {
                handleLogout();
                handleMenuClose();
            }}>Se déconnecter</MenuItem>
        </Menu>
    );

    return (
        <AppBar className={classes.root} color={"primary"} elevation={0}>
            <Toolbar className={classes.toolBar}>
                <Typography variant={"h6"} noWrap>
                    Blog
                </Typography>
                <Tabs
                    value={value}
                    onChange={handleChangeTabsValue}
                    variant={"scrollable"}
                    scrollButtons={"auto"}
                >

                    {cat && cat.map((item, index) => {
                        return (
                            <Tab
                                key={index}
                                value={item.slug ? item.slug : "home"}
                                component={RouterLink}
                                to={item.slug ? `/categorie/${item.slug}` : "/"}
                                label={item.name.toUpperCase()}
                            />
                        );
                    })}
                </Tabs>
                <div className={classes.themeSwitch}>
                    <Typography component={"div"}>
                        <Tooltip title={user ? "Se déconnecter" : "Se connecter"}>
                            {user ? (<React.Fragment>
                                <Avatar src={`${process.env.REACT_APP_BASE_PUBLIC_URL}/${files}`}
                                        onClick={(e) => handleProfileMenuOpen(e)}/>
                                {userMenu}
                            </React.Fragment>) : <IconButton onClick={() => handleOpen()}>
                                <FontAwesomeIcon size={"lg"} icon={"sign-in-alt"}/>
                            </IconButton>}
                        </Tooltip>
                    </Typography>
                    <ThemeSwitch handleChange={handleChange} isDark={isDark}/>
                </div>
            </Toolbar>

        </AppBar>
    );
};

export default DesktopNav;
