import React from "react";
import {Divider, Grid, Link, Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {connect} from "react-redux";

const Footer = (props) => {
    const {categories} = props;

    return (
        <div style={{marginTop: "1%", textAlign: "center"}}>
            <Typography variant="caption" align={"center"} color={"primary"}>
                © Copyright Benjamin Pilliez {new Date().getFullYear()}
            </Typography>
            <Divider style={{margin: "24px auto", width: 60}}/>
            <Grid container justify={"center"}>
                <Grid item xs={12} sm={6} md={3}>
                    {categories && categories.map((item, index) => {
                        return <Typography align={"left"} gutterBottom color={"textSecondary"} key={index}>
                            <Link component={RouterLink} to={"/categorie/" + item.slug}
                                  color={"primary"}>{item.slug.toUpperCase()}</Link>
                        </Typography>;
                    })}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography align={"center"} gutterBottom color={"textSecondary"}>
                        <Link component={RouterLink} to={"/a-propos"} color={"primary"}>A propos de moi</Link>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};


Footer.propTypes = {};
Footer.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories
    };
};

export default connect(mapStateToProps)(Footer);
