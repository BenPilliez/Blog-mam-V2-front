import React from "react";
import {Link as RouterLink} from "react-router-dom";
import {
    AppBar,
    Button,
    Collapse,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar
} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ThemeSwitch from "./themeSwitch";

const useStyles = makeStyles((theme) => ({
    MuiDrawer: {
        backgroundColor: theme.palette.primary.main
    },
    MuiButton: {
        color: "white",
    },
    list: {
        width: 250
    },
    alignItems: {
        display: "flex",
        justifyContent: "center"
    },
    header: {
        display: "flex",
        justifyContent: "space-between"
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
}));

const MobileNav = ({categories, isDark, handleChange, handleOpen, user, handleLogout}) => {
    const [open, setOpen] = React.useState(false);
    const [openCategories, setOpenCategories] = React.useState(false);
    const classes = useStyles();

    const handleDrawer = () => {
        setOpen(!open);
    };

    const handleCategories = () => {
        setOpenCategories(!openCategories);
    };

    return (
        <React.Fragment>
            <AppBar position={"fixed"} color={"transparent"} elevation={0}>
                <Toolbar>
                    <Button variant={"contained"} endIcon={<FontAwesomeIcon icon={"bars"}/>} color={"primary"}
                            onClick={handleDrawer}>Menu</Button>
                </Toolbar>
                <Drawer classes={{paper: classes.MuiDrawer}} anchor={"bottom"} open={open} onClose={handleDrawer}>
                    <List>
                        <div className={classes.header}>

                            <ListItem classes={{button: classes.MuiButton}} button
                                      onClick={() => user ? handleLogout() : handleOpen()}>
                                <ListItemIcon>
                                    {user ? <FontAwesomeIcon size={"lg"} icon={"sign-out-alt"}/> :
                                        <FontAwesomeIcon size={"lg"} icon={"sign-in-alt"}/>}
                                </ListItemIcon>
                                <ListItemText primary={user ? "Se déconnecter" : "Se connecter"}/>
                            </ListItem>

                            <ListItem classes={{button: classes.MuiButton}} button>
                                <ListItemIcon>
                                    <ThemeSwitch
                                        handleChange={handleChange}
                                        isDark={isDark}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={isDark ? "Light Mode" : "Dark Mode"}/>
                            </ListItem>
                        </div>
                        <ListItem classes={{button: classes.MuiButton}} button component={RouterLink} to={"/"}>
                            <ListItemIcon>
                                <FontAwesomeIcon size={"lg"} icon={"home"}/>
                            </ListItemIcon>
                            <ListItemText primary={"Accueil"}/>
                        </ListItem>

                        <ListItem classes={{button: classes.MuiButton}} button onClick={handleCategories}>
                            <ListItemIcon>
                                <FontAwesomeIcon size={"lg"} icon={"folder"}/>
                            </ListItemIcon>
                            <ListItemText primary={"Categories"}/>
                            {openCategories ? <FontAwesomeIcon icon={"chevron-up"}/> :
                                <FontAwesomeIcon size={"lg"} icon={"chevron-down"}/>}
                        </ListItem>
                        <Collapse timeout="auto" in={openCategories}>
                            <List component={"div"} disablePadding>
                                {categories && categories.map((item, index) => {
                                    return <ListItem
                                        classes={{button: classes.MuiButton}}
                                        className={classes.nested}
                                        key={index} button
                                        component={RouterLink}
                                        to={`/categorie/${item.slug}`}
                                    >
                                        <ListItemIcon> <FontAwesomeIcon icon={"th"}/></ListItemIcon>
                                        <ListItemText primary={item.slug.toUpperCase()}/>
                                    </ListItem>;
                                })}
                            </List>
                        </Collapse>
                    </List>
                </Drawer>
            </AppBar>
        </React.Fragment>
    );
};

export default MobileNav;
