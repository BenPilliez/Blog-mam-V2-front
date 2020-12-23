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

const MobileNav = ({
                       categories,
                       isDark,
                       handleChange,
                       handleOpen,
                       user,
                       handleLogout,
                       handleAvatar,
                       handleDelete,
                       handlePassword
                   }) => {
    const [open, setOpen] = React.useState(false);
    const [openCategories, setOpenCategories] = React.useState(false);
    const [openAccount, setOpenAccount] = React.useState(false);
    const classes = useStyles();

    const handleDrawer = () => {
        setOpen(!open);
    };

    const handleCategories = () => {
        setOpenCategories(!openCategories);
    };

    const handleAccount = () => {
        setOpenAccount(!openAccount);
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
                        <ListItem classes={{button: classes.MuiButton}} button onClick={handleChange}>
                            <ListItemIcon>
                                <ThemeSwitch
                                    handleChange={handleChange}
                                    isDark={isDark}
                                />
                            </ListItemIcon>
                            <ListItemText primary={isDark ? "Light Mode" : "Dark Mode"}/>
                        </ListItem>

                        {!user && <ListItem classes={{button: classes.MuiButton}} button
                                            onClick={() => handleOpen()}>
                            <ListItemIcon>
                                <FontAwesomeIcon size={"lg"} icon={"sign-in-alt"}/>
                            </ListItemIcon>
                            <ListItemText primary={"Se connecter"}/>
                        </ListItem>}


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
                                        onClick={() => {
                                            handleCategories();
                                            handleDrawer();
                                        }}
                                    >
                                        <ListItemIcon> <FontAwesomeIcon icon={"th"}/></ListItemIcon>
                                        <ListItemText primary={item.slug.toUpperCase()}/>
                                    </ListItem>;
                                })}
                            </List>
                        </Collapse>

                        {user && <ListItem classes={{button: classes.MuiButton}} button onClick={handleAccount}>
                            <ListItemIcon>
                                <FontAwesomeIcon size={"lg"} icon={"folder"}/>
                            </ListItemIcon>
                            <ListItemText primary={"Mon Compte"}/>
                            {openAccount ? <FontAwesomeIcon icon={"chevron-up"}/> :
                                <FontAwesomeIcon size={"lg"} icon={"chevron-down"}/>}
                        </ListItem>}

                        <Collapse timeout="auto" in={openAccount}>
                            <List component={"div"} disablePadding>
                                <ListItem
                                    classes={{button: classes.MuiButton}}
                                    className={classes.nested}
                                    onClick={() => {
                                        handleAvatar();
                                        handleAccount();
                                        handleDrawer();
                                    }}
                                    button
                                >
                                    <ListItemIcon> <FontAwesomeIcon icon={"user"}/></ListItemIcon>
                                    <ListItemText primary={"Changer d'avatar"}/>
                                </ListItem>
                                <ListItem
                                    classes={{button: classes.MuiButton}}
                                    className={classes.nested}
                                    onClick={() => {
                                        handlePassword();
                                        handleAccount();
                                        handleDrawer();
                                    }}
                                    button
                                >
                                    <ListItemIcon> <FontAwesomeIcon icon={"lock"}/></ListItemIcon>
                                    <ListItemText primary={"Changer mot de passe"}/>
                                </ListItem>
                                <ListItem
                                    classes={{button: classes.MuiButton}}
                                    className={classes.nested}
                                    onClick={() => {
                                        handleDelete();
                                        handleAccount();
                                        handleDrawer();
                                    }}
                                    button
                                >
                                    <ListItemIcon> <FontAwesomeIcon icon={"trash"}/></ListItemIcon>
                                    <ListItemText primary={"Supprimer mon compte"}/>
                                </ListItem>
                                <ListItem
                                    classes={{button: classes.MuiButton}}
                                    className={classes.nested}
                                    onClick={() => {
                                        handleAccount();
                                        handleDrawer();
                                        handleLogout();
                                    }}
                                    button
                                >
                                    <ListItemIcon> <FontAwesomeIcon icon={"sign-out-alt"}/></ListItemIcon>
                                    <ListItemText primary={"Se déconnecter"}/>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Drawer>
            </AppBar>
        </React.Fragment>
    );
};

export default MobileNav;
