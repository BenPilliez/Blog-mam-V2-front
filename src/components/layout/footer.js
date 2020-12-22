import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const Footer = () => (
    <div style={{ marginTop:'1%', textAlign: "center" }}>
        <Typography variant="caption" align={"center"} color={"primary"}>
            © Copyright Benjamin Pilliez {new Date().getFullYear()}
        </Typography>
        <Divider style={{ margin: "24px auto", width: 60 }} />
        <Grid container justify={"center"} >
            <Grid item xs={12} sm={6} md={3}>
                <Typography align={"center"} gutterBottom color={"textSecondary"}>
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Typography align={"center"} gutterBottom color={"textSecondary"}>
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Typography align={"center"} gutterBottom color={"textSecondary"}>
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Typography align={"center"} gutterBottom color={"textSecondary"}>
                </Typography>
            </Grid>
        </Grid>
    </div>
);

Footer.propTypes = {};
Footer.defaultProps = {};

export default Footer;
