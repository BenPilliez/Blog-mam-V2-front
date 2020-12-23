import React from "react";
import {Container, Divider, Grid, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        marginTop: theme.spacing(10)
    },
    divider: {
        width: "100%",
        backgroundColor: theme.palette.primary.main
    }
}));

const Mentions = () => {

    const classes = useStyles();
    return (
        <React.Fragment>
            <Container className={classes.root}>

                <Grid container justify={"center"} spacing={6}>
                    <Grid item xs={12}>
                        <Typography variant={"h2"} align={"center"}>
                            Mentions légales
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h3"}>
                            Informations légales
                        </Typography>

                        <Typography variant={"body1"}>

                            Le site blog-passetemps.benpilliez.com est édité par : <br />

                            Pilliez Benjamin<br />
                            8, rue depoorter<br />
                            59190 Hazebrouck<br />
                            FRANCE<br />

                        </Typography>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid item xs={12}>
                        <Typography variant={"h3"}>
                            Administrateur
                        </Typography>

                        <Typography variant={"body1"}>
                            Madame Faihy Madeleine
                        </Typography>
                    </Grid>

                    <Divider className={classes.divider} />
                    <Grid item xs={12}>
                        <Typography variant={"h3"}>
                            Hébergement
                        </Typography>

                        <Typography variant={"body1"}>
                            SARL o2switch<br />
                            222-224 Boulevard Gustave Flaubert<br />
                            63000 Clermont-Ferrand<br />
                            o2switch est un hébergeur web indépendant, membre du RIPE (AS50474) et opérateur déclaré à
                            l'ARCEP.<br />
                            Courriel : support@o2switch.fr - Téléphone : +33 4 44 44 60 40
                        </Typography>
                    </Grid>

                    <Divider className={classes.divider} />
                    <Grid item xs={12}>
                        <Typography variant={"h3"}>
                            Contact
                        </Typography>

                        <Typography variant={"body1"}>
                            Email : benjamin.piliez@gmail.com<br />
                            Téléphone : 0607760215
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default Mentions;
