import React from "react";
import {Container, Grid, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        marginTop: theme.spacing(6)
    },
    gridContainer: {
        marginTop: theme.spacing(8)
    }
}));

const PrivateLife = () => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Typography variant={"h2"} align={"center"}>
                    Politiques de traitement des données personnelles
                </Typography>

                <Grid container className={classes.gridContainer} spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant={"subtitle1"}>
                            Date de dernière mise à jour: 23/12/2020
                        </Typography>

                        <Typography align={"justify"} variant={"body1"}>
                            La présente politique de confidentialité définit et vous informe de la manière dont Blog
                            passetemps
                            utilise et protège les informations que vous nous transmettez, le cas échéant, lorsque vous
                            utilisez le présent site accessible à partir de l'URL suivante :
                            www.blog-passetemps.benpilliez.com (ci-après
                            le « Site »).

                            Veuillez noter que cette politique de confidentialité est susceptible d'être modifiée ou
                            complétée à tout moment par le Blog Passetemps, notamment en vue de se conformer à toute
                            évolution
                            législative, règlementaire, jurisprudentielle ou technologique. Dans un tel cas, la date de
                            sa
                            mise à jour sera clairement identifiée en tête de la présente politique. Ces modifications
                            engagent l'Utilisateur dès leur mise en ligne. Il convient par conséquent que l'Utilisateur
                            consulte régulièrement la présente politique de confidentialité et d'utilisation des cookies
                            afin de prendre connaissance de ses éventuelles modifications.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant={"h4"}>
                            Finalités du traitement
                        </Typography>

                        <Typography align={"justify"} variant={"body1"}>
                            Les données inscrites dans le formulaire d'inscription, ne sont utilisé qu'à des fins de connexions et afin de vous facilité le post de commentaires.
                            Aucune statistique n'est effectuée avec.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant={"h4"}>
                           Utilisation et transmission de vos données personnelles
                        </Typography>

                        <Typography align={"justify"} variant={"body1"}>
                            Seul le Blog Passetemps utlisera vos données à des fins de connexions et de simplification d'envoi de commentaires. Afin de faciliter et de pouvoir supprimer les commentaires indésirable.
                            Nous ne transmettrons aucune de vos données à un tiers.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant={"h4"}>
                            Durée de stockage
                        </Typography>

                        <Typography align={"justify"} variant={"body1"}>
                            Vos données de connexion sont conservées pour une durée indéfinie. Vous pouvez à tout moment supprimer votre compte.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default PrivateLife;
