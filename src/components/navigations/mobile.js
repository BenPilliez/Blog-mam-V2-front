import React from "react"
import {Link as RouterLink} from "react-router-dom"
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
} from "@material-ui/core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import ThemeSwitch from "./themeSwitch"

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250
    },
    alignItems: {
        display: 'flex',
        justifyContent: 'center'
    },
    header:{
      display:'flex',
      justifyContent: 'space-between'
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
}))

const MobileNav = ({categories, isDark, handleChange}) => {
    const [open, setOpen] = React.useState(false)
    const [openCategories, setOpenCategories] = React.useState(false)
    const classes = useStyles()

    const handleDrawer = () => {
        setOpen(!open)
    }

    const handleCategories = () => {
        setOpenCategories(!openCategories)
    }

    return (
        <React.Fragment>
            <AppBar position={"fixed"} color={'transparent'} elevation={0}>
                <Toolbar>
                    <Button variant={"contained"} endIcon={<FontAwesomeIcon icon={'bars'}/>} color={"primary"}
                            onClick={handleDrawer}>Menu</Button>
                </Toolbar>

                <Drawer anchor={"bottom"} open={open} onClose={handleDrawer}>
                    <List>
                        <div className={classes.header}>
                            <ListItem button component={RouterLink} to={"/"}>
                                <ListItemIcon>
                                    <FontAwesomeIcon icon={'home'}/>
                                </ListItemIcon>
                                <ListItemText primary={'Accueil'}/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <ThemeSwitch
                                        handleChange={handleChange}
                                        isDark={isDark}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={isDark ? 'Light Mode' : 'Dark Mode'}/>
                            </ListItem>
                        </div>
                        <ListItem button>
                            <ListItemIcon>
                                <FontAwesomeIcon icon={'sign-in-alt'}/>
                            </ListItemIcon>
                            <ListItemText primary={'Se connecter'}/>
                        </ListItem>
                        <ListItem onClick={handleCategories}>
                            <ListItemIcon>
                                <FontAwesomeIcon icon={'folder'}/>
                            </ListItemIcon>
                            <ListItemText primary={"Categories"}/>
                            {openCategories ? <FontAwesomeIcon icon={'chevron-up'}/> :
                                <FontAwesomeIcon icon={'chevron-down'}/>}
                        </ListItem>

                        <Collapse timeout="auto" in={openCategories}>
                                <List component={"div"} disablePadding>
                                    {categories && categories.map((item, index) => {
                                        return <ListItem
                                            className={classes.nested}
                                            key={index} button
                                            component={RouterLink}
                                           to={`/categorie/${item.slug}`}>
                                            <ListItemIcon> <FontAwesomeIcon icon={'th'}/></ListItemIcon>
                                            <ListItemText primary={item.slug.toUpperCase()}/>

                                        </ListItem>
                                    })}
                                </List>
                            </Collapse>
                    </List>
                </Drawer>
            </AppBar>
        </React.Fragment>
    )
}

export default MobileNav
