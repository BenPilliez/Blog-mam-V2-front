import React, {useEffect} from "react";
import {connect} from "react-redux";
import {postComment} from "../../store/actions/commentsActions";
import {getPostDetail} from "../../store/actions/postsActions";
import Comments from "../comments/comments";
import FormComment from "../comments/formComment";
import {CardActionArea, CardMedia, CircularProgress, Container, Grid, makeStyles, Typography} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {Redirect} from "react-router-dom";
import SEO from "react-seo-component";

const FsLightbox = React.lazy(() => import("fslightbox-react"));

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5)
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9,
        margin: theme.spacing(1),
    }
}));

const DetailPost = (props) => {

    const {post, detailPost, user, postComment, commentSuccess, error} = props;
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [toggler, setToggler] = React.useState(false);

    const {enqueueSnackbar} = useSnackbar();
    const params = props.match.params.slug;

    useEffect(() => {
        detailPost(params);
        setLoading(false);
    }, [params, detailPost, loading, setLoading]);


    useEffect(() => {
        if (commentSuccess) {
            enqueueSnackbar("Ton commentaire a été posté et est en attente de validation", {
                variant: "success",
                persist: true
            });
        }
    }, [commentSuccess, enqueueSnackbar]);

    const handleSubmit = (values) => {
        if (!user) {
            return enqueueSnackbar("Il faut être connecté pour commenter", {
                variant: "error",
                persist: true,
            });
        }

        let form = {
            content: values.content,
            userId: user.id,
            postsId: post.id
        };
        postComment(form);
    };

    return (
        <>
            <Container className={classes.root}>
                {loading && <CircularProgress color={"primary"}/>}
                {post && !loading && <Grid container justify={"center"}>
                    <SEO
                        title={post.title}
                        titleTemplate={``}
                        titleSeparator={``}
                        description={`Article du blog des passetemps de madeleine Faihy portant le titre ${post.title} de la catégorie ${post.category.name} ` || "nothin’"}
                        image={post.photos[0]}
                        pathname={`https://madeleine-passetemps.benpilliez.com/post/${post.slug}`}
                        siteLanguage={"fr"}
                        siteLocale={"fr_FR"}
                        author={post.user.username}
                        publishedDate={post.createdAt}
                        modifiedDate={post.updatedAt}
                        article={true}
                        twitterUsername={""}
                    />
                    <Grid item xs={12}>
                        <Typography align={"center"} variant={"h1"}>
                            {post.title}
                        </Typography>
                    </Grid>
                    {post.photos && post.photos.map((item, index) =>
                        <Grid item key={index} xs={index === 0 && post.photos.length > 2 ? 12 : 6}>
                            <CardActionArea aria-label={"ImageShow"} onClick={() => setToggler(!toggler)}>
                                <CardMedia className={classes.media}
                                           image={`${process.env.REACT_APP_BASE_PUBLIC_URL}/${item}`}>
                                </CardMedia>
                            </CardActionArea>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Typography align={"center"} variant={"body1"}
                                    dangerouslySetInnerHTML={{__html: post["content"]}}/>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant={"caption"} color={"textSecondary"}>
                            {post.createdAt}, {post.user.username}
                        </Typography>
                    </Grid>
                    {post.photos && !loading && <FsLightbox
                        toggler={toggler}
                        type="image"
                        sources={post.photos ? post.photos.map((item) => {
                            return `${process.env.REACT_APP_BASE_PUBLIC_URL}/${item}`;
                        }) : null}
                    />}

                </Grid>}
                {post && post.comments && <Comments comments={post.comments}/>}
                {post && !loading && <FormComment submit={handleSubmit}/>}
                {error && !loading && <Redirect to={"/404"}/>}
            </Container>
        </>
    );

};

const mapStateToProps = (state, ownProps) => {
    const detail = state.posts.postDetail.find((item) => {
        return item.slug === ownProps.match.params.slug;
    });

    return {
        post: detail,
        user: state.auth.user,
        commentSuccess: state.comment.success,
        commentError: state.comment.error,
        error: state.posts.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        detailPost: (slug) => dispatch(getPostDetail(slug)),
        postComment: (form) => dispatch(postComment(form))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost);
