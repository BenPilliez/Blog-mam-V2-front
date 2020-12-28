import React from "react";
import {Container, Divider, Grid, Link, makeStyles, Typography} from "@material-ui/core";

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

                            Le site madeleine-passetemps.benpilliez.com est édité par : <br/>

                            Pilliez Benjamin<br/>
                            8, rue depoorter<br/>
                            59190 Hazebrouck<br/>
                            FRANCE<br/>

                        </Typography>
                    </Grid>
                    <Divider className={classes.divider}/>
                    <Grid item xs={12}>
                        <Typography variant={"h3"}>
                            Administrateur
                        </Typography>

                        <Typography variant={"body1"}>
                            Madame Faihy Madeleine
                        </Typography>
                    </Grid>

                    <Divider className={classes.divider}/>
                    <Grid item xs={12}>
                        <Typography variant={"h3"}>
                            Hébergement
                        </Typography>

                        <Typography variant={"body1"}>
                            SARL o2switch<br/>
                            222-224 Boulevard Gustave Flaubert<br/>
                            63000 Clermont-Ferrand<br/>
                            o2switch est un hébergeur web indépendant, membre du RIPE (AS50474) et opérateur déclaré à
                            l'ARCEP.<br/>
                            Courriel : support@o2switch.fr - Téléphone : +33 4 44 44 60 40
                        </Typography>
                    </Grid>

                    <Divider className={classes.divider}/>
                    <Grid item xs={12}>
                        <Typography variant={"h3"}>
                            Contact
                        </Typography>

                        <Typography variant={"body1"}>
                            Email : <Link
                            href={"mailto:benjamin.piliez@gmail.com"}> benjamin.piliez@gmail.com</Link><br/>
                            Téléphone : 0607760215
                        </Typography>

                        <Typography variant={"body1"}>
                            Ce site utilise Google Analytics, un service d'analyse de site internet fourni par Google
                            Inc. (« Google »). Google Analytics utilise des cookies , qui sont des fichiers texte placés
                            sur votre ordinateur, pour aider le site internet à analyser l'utilisation du site par ses
                            utilisateurs. Les données générées par les cookies concernant votre utilisation du site (y
                            compris votre adresse IP) seront transmises et stockées par Google sur des serveurs situés
                            aux Etats-Unis. Google utilisera cette information dans le but d'évaluer votre utilisation
                            du site, de compiler des rapports sur l'activité du site à destination de son éditeur et de
                            fournir d'autres services relatifs à l'activité du site et à l'utilisation d'Internet.
                            Google est susceptible de communiquer ces données à des tiers en cas d'obligation légale ou
                            lorsque ces tiers traitent ces données pour le compte de Google, y compris notamment
                            l'éditeur de ce site. Google ne recoupera pas votre adresse IP avec toute autre donnée
                            détenue par Google. Vous pouvez désactiver l'utilisation de cookies en sélectionnant les
                            paramètres appropriés de votre navigateur. Cependant, une telle désactivation pourrait
                            empêcher l'utilisation de certaines fonctionnalités de ce site. En utilisant ce site
                            internet, vous consentez expressément au traitement de vos données nominatives par Google
                            dans les conditions et pour les finalités décrites ci-dessus.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default Mentions;
