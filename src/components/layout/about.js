import React from "react";
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import AvatarImage from "../../images/avatar.png"

const useStyles = makeStyles((theme) => ({
    root: {
        height: "60vh",
    },
    image: {
        backgroundImage: `url(${AvatarImage})`,
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center"
    },paper: {
        margin: theme.spacing(15, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    marginTop: {
        marginTop: theme.spacing(8)
    }
}));

const About = () => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container component={"main"} className={classes.root}>
                <Grid item xs={false} sm={false} md={5} component={Paper} className={classes.image}/>
                <Grid item xs={12} sm={12} md={7} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Typography variant={"h4"}>
                            Parlons un peu de moi
                        </Typography>

                        <Typography variant={"body1"} className={classes.marginTop} align={"justify"}>
                            Bonjour,
                            Je me prénomme Madeleine, j'ai 65 ans et je suis atteinte de fibromyalgie depuis 20 ans.
                            Je parlerais ici, de mes passe-temps malgré ma fibro, c'est eux qui me permette de tenir

                            Entre autre, il y aura de la couture, de la peinture . Je ne suis pas une pro mais je gère
                            quand même d'après mes enfants.

                            Bonne visite à tous, n'hésitez pas à m'envoyer un mail si vous souhaitez discuter (mon
                            adresse mail est sur la page d’accueil).
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default About;
