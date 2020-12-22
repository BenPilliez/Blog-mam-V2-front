import React from "react";
import ImageError from "../../images/404.jpg";
import {Grid, Link, makeStyles, Paper, Typography} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("sm")]: {
            height: "100vh"
        },
        [theme.breakpoints.up("md")]: {
            height: "93vh"
        },
        [theme.breakpoints.up("lg")]: {
            height: "93.5vh"
        },
    },
    image: {
        backgroundImage: `url(${ImageError})`,
        backgroundColor:
            theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: "cover",

        backgroundPosition: "50% 20%"
    },
    attribution: {
        position: "absolute",
        bottom: "0",
        left: "50%",
        transform: " translate(-50%, -50%)"
    }
}));

const NotFoundPage = () => {
    const classes = useStyles(

    );
    return (
        <React.Fragment>
            <Grid container component={"main"} className={classes.root}>
                <Grid item xs={12} component={Paper} className={classes.image}/>
            </Grid>
            <Typography className={classes.attribution}>
                <Link target={"_blank"} rel="noreferrer" color={"primary"} href='https://fr.freepik.com/vectors/bleu'>Bleu
                    vecteur créé par vectorjuice - fr.freepik.com</Link>
            </Typography>
        </React.Fragment>
    );
};

export default NotFoundPage;

