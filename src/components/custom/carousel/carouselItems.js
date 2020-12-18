import React from "react";
import {
    Card,
    CardActionArea,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Typography,
} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link as RouterLink} from "react-router-dom";

const useStyle = makeStyles((theme) => ({
    card: {
        minHeight: 600,
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        margin: theme.spacing(1)
    },
    cardContent: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "auto",
        padding: 30
    },
    span: {
        padding: theme.spacing(1.5),
        backgroundColor: theme.palette.primary.main,
        color: "white"
    },

    title: {
        margin: "15px 0",
        fontSize: "25px",
        lineHeight: "32px",
        color: "white"
    },
    list: {
        display: "flex",
        flexDirection: "row",
        padding: 0,
        fontSize: "14px"
    },
    listItem: {
        width: "auto",
        color: "white"
    }
}));


const CarouselItem = ({item}) => {
    const classes = useStyle();
    return (
        <React.Fragment>
            <CardActionArea component={RouterLink} to={`/post/${item.slug}`}>
                <Card className={classes.card}
                      style={{backgroundImage: `url(${process.env.REACT_APP_BASE_PUBLIC_URL}/${item.photos[0]})`}}>
                    <CardContent className={classes.cardContent}>
                        <Typography variant={"subtitle2"}>
                            <span className={classes.span}>{item.category.name}</span>
                        </Typography>
                        <Typography variant={"h3"} className={classes.title}>
                            {item.title}
                        </Typography>
                        <List className={classes.list}>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon>
                                    <FontAwesomeIcon icon={"calendar-alt"} color={"white"}/>
                                </ListItemIcon>
                                <ListItemText primary={item.createdAt}/>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemIcon>
                                    <FontAwesomeIcon icon={"user"} color={"white"}/>
                                </ListItemIcon>
                                <ListItemText primary={item.user.username}/>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </CardActionArea>
        </React.Fragment>
    );
};

export default CarouselItem;
