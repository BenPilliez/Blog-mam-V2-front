import React, {useEffect} from "react";
import {connect} from "react-redux";
import {carouselPost, getPosts} from "../../store/actions/postsActions";
import CustomCarousel from "../custom/carousel/carousel";
import {Box, Container, Grid, Typography, useMediaQuery} from "@material-ui/core";
import CustomCard from "../custom/card/customCard";
import {Pagination} from "@material-ui/lab";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link as RouterLink} from "react-router-dom";
import {cardStyle} from "../../helpers/cardComponentStyle";
import SEO from "react-seo-component";

const params = {
    home: {
        perPage: 9,
        page: 0,
        order: ["createdAt", "asc"]
    },
    carousel: {
        perPage: 4,
        page: 0,
        order: ["createdAt", "asc"]
    }
};

const Home = ({carouselItems, posts, getPosts, pagination, getCarouselPost, loadingState}) => {

    const classes = cardStyle();

    const [firstMount, setFirstMount] = React.useState(true);
    const [page, setPage] = React.useState(params.home.page + 1);
    const matches = useMediaQuery(theme => theme.breakpoints.down("sm") || theme.breakpoints.down("xs"));


    useEffect(() => {
        if (firstMount) {
            getPosts(params.home);
            getCarouselPost(params.carousel);
            setFirstMount(false);
        }
    }, [setFirstMount, getPosts, getCarouselPost, firstMount]);

    const handleChangePage = (event, newPage) => {
        console.log(newPage);
        setPage(newPage);
        params.home["page"] = newPage - 1;
        getPosts(params.home);
    };

    return (
        <Box style={{minHeight: "100vh"}}>
            <SEO
                title={"Page d'accueil de madeleine passetemps"}
                titleTemplate={"madeleine-passetemps"}
                titleSeparator={`-`}
                description={`Page d'accueil du blog madeleine passetemps ` || "nothin’"}
                image={""}
                pathname={`https://madeleine-passetemps.benpilliez.com/`}
                siteLanguage={"fr"}
                siteLocale={"fr_FR"}
                author={"Madeleine faihy"}
                publishedDate={Date.now()}
                modifiedDate={Date.now()}
            />
            <CustomCarousel
                carouselOptions={
                    {
                        dots: false,
                        infinite: true,
                        touchMove: false,
                        autoplay: true,
                        speed: 500,
                        slidesToShow: matches ? 2 : 3,
                        slidesToScroll: 1
                    }}
                items={carouselItems}
            />
            <Container className={classes.root}>
                <Grid container justify={"center"}>
                    {posts && posts.map((item, key) => {
                        return <Grid key={key} item xs={12} lg={4} md={6} sm={7}>
                            <CustomCard
                                props={{className: classes.cardRoot}}
                                media={
                                    {
                                        className: classes.media,
                                        image: `${process.env.REACT_APP_BASE_PUBLIC_URL}/${item.photos[0]}`,
                                        content: <Typography component={"span"}
                                                             className={classes.span}>
                                            {item.category.name}
                                        </Typography>
                                    }
                                }
                                content={{
                                    content: <>
                                        <Typography variant={"subtitle1"} color={"textSecondary"}>
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
                                                size: "small",
                                                color: "primary",
                                                startIcon: <FontAwesomeIcon icon={"eye"}/>
                                            }
                                        }
                                    ]
                                }}
                            />
                        </Grid>;
                    })}
                    {posts && !loadingState && posts.length > 0 ? <Grid item container justify={"center"} xs={12}>
                        <Pagination
                            className={classes.spacing}
                            component="div"
                            count={pagination.totalPages}
                            page={page}
                            onChange={handleChangePage}
                        />
                    </Grid> : <div style={{minHeight: "100vh", marginTop: 50}}>Il n'y a pas encore de post pour le
                        moment</div>
                    }
                </Grid>
            </Container>
        </Box>
    );
};

const mapStateToProps = (state) => {
    const carouselItems = state.posts.carouselPosts;
    return {
        carouselItems: carouselItems,
        posts: state.posts.posts,
        pagination: state.posts.pagination,
        loadingState: state.posts.loadingState
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: (params) => dispatch(getPosts(params)),
        getCarouselPost: (params) => dispatch(carouselPost(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
