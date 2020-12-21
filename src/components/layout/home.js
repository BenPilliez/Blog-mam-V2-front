import React, {useEffect} from "react";
import {connect} from "react-redux";
import {carouselPost, getPosts} from "../../store/actions/postsActions";
import CustomCarousel from "../custom/carousel/carousel";
import {Container, Grid, Typography} from "@material-ui/core";
import CustomCard from "../custom/card/customCard";
import {Pagination} from "@material-ui/lab";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link as RouterLink} from "react-router-dom";
import {cardStyle} from "../../helpers/cardComponentStyle";

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

const Home = ({carouselItems, posts, getPosts, pagination, getCarouselPost}) => {

    const classes = cardStyle();

    const [firstMount, setFirstMount] = React.useState(true);
    const [page, setPage] = React.useState(params.home.page + 1);

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
        <React.Fragment>
            <CustomCarousel
                carouselOptions={
                    {
                        dots: false,
                        infinite: true,
                        touchMove: false,
                        autoplay: true,
                        speed: 500,
                        slidesToShow: 3,
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
                    {posts && posts.length > 0 ? <Grid item container justify={"center"} xs={12}>
                        <Pagination
                            className={classes.spacing}
                            component="div"
                            count={pagination.totalPages}
                            page={page}
                            onChange={handleChangePage}
                        />
                    </Grid> : <div>No content</div>
                    }
                </Grid>
            </Container>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const carouselItems = state.posts.carouselPosts;
    return {
        carouselItems: carouselItems,
        posts: state.posts.posts,
        pagination: state.posts.pagination
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: (params) => dispatch(getPosts(params)),
        getCarouselPost: (params) => dispatch(carouselPost(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
