import React, {useEffect} from "react";
import {connect} from "react-redux";
import {CircularProgress, Container, Grid, makeStyles, Typography} from "@material-ui/core";
import {detailCategory} from "../../store/actions/categoriesActions";
import {paginate} from "../../helpers/paginate";
import {cardStyle} from "../../helpers/cardComponentStyle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CustomCard from "../custom/card/customCard";
import {Link as RouterLink} from "react-router-dom";
import {Pagination} from "@material-ui/lab";
import SEO from "react-seo-component";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        marginTop: theme.spacing(8)
    }
}));

const DetailCategories = (props) => {

    const {categoryDetail, getCategoryDetail} = props;
    const [page, setPage] = React.useState(1);
    const [onLoad, setOnLoad] = React.useState(true);
    const params = props.match.params.slug;
    const classes = cardStyle();
    const rootClasses = useStyles();

    const pagination = {
        perPage: 9,
        page: 0,
        totalPages: categoryDetail && categoryDetail.posts ? Math.ceil(categoryDetail.posts.length / 10) : 1,
        order: ["createdAt", "asc"]
    };

    useEffect(() => {
        getCategoryDetail(params);
        setOnLoad(false);
    }, [getCategoryDetail, params, setOnLoad]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        return paginate(categoryDetail.posts, pagination.perPage, newPage);
    };


    return (
        <React.Fragment>
            <Container className={rootClasses.root}>
                {categoryDetail && onLoad && <CircularProgress color={"primary"}/>}
                {categoryDetail && !onLoad ?
                    <Grid container justify={"center"}>
                        <SEO
                            title={categoryDetail.name}
                            titleTemplate={""}
                            titleSeparator={``}
                            description={`liste des articles de la catégorie ${categoryDetail.name} du blog des passetemps de madeleine faihy ` || "nothin’"}
                            image={""}
                            pathname={`https://madeleine-passetemps.benpilliez.com/categorie/${categoryDetail.slug} `}
                            siteLanguage={"fr"}
                            siteLocale={"fr_FR"}
                            twitterUsername={""}
                        />

                        <Grid item xs={12}>
                            <Typography variant={"body1"} align={"center"}>
                                {categoryDetail.name}
                            </Typography>
                        </Grid>
                        {categoryDetail.posts ? paginate(categoryDetail.posts, pagination.perPage, page).map((item, index) => {
                            return <Grid key={index} item xs={12} lg={4} md={6} sm={7}>
                                <CustomCard
                                    props={{className: "CardRoot"}}
                                    media={
                                        {
                                            className: classes.media,
                                            image: `${process.env.REACT_APP_BASE_PUBLIC_URL}/${item.photos[0]}`,
                                            content: <Typography component={"span"}
                                                                 className={classes.span}>
                                                {categoryDetail.name}
                                            </Typography>
                                        }
                                    }
                                    content={{
                                        content: <>
                                            <Typography variant={"body2"} color={"textSecondary"}>
                                                {item.createdAt}
                                            </Typography>
                                            <Typography variant={"body1"} color={"textPrimary"}>
                                                {item.title}
                                            </Typography>
                                        </>
                                    }}
                                    actions={{
                                        className: classes.actions,
                                        actions: [
                                            {
                                                label: "En voir plus",
                                                props: {
                                                    component: RouterLink,
                                                    to: `/post/${item.slug}`,
                                                    size: "medium",
                                                    color: "primary",
                                                    startIcon: <FontAwesomeIcon icon={"eye"}/>
                                                }
                                            }
                                        ]
                                    }}
                                />
                            </Grid>;
                        }) : null}
                        {categoryDetail.posts && categoryDetail.posts.length > 0 ?
                            <Grid item container justify={"center"} xs={12}>
                                <Pagination
                                    className={classes.spacing}
                                    component="div"
                                    count={pagination.totalPages}
                                    page={page}
                                    onChange={handleChangePage}
                                />
                            </Grid> : null}
                    </Grid> :
                    <div style={{display: "flex", justifyContent: "center", minHeight: "100vh", marginTop: 150}}>Il n'y
                        a encore aucun posts pour cette catégorie</div>}
            </Container>
        </React.Fragment>
    );
};

const mapStateToProps = (state, ownProps) => {
    const slug = ownProps.match.params.slug;

    const detail = state.categories.detailCategory.find((item) => {
        return item.slug === slug;
    });

    return {
        categoryDetail: detail
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        getCategoryDetail: (slug) => dispatch(detailCategory(slug))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCategories);
