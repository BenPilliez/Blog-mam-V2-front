import React, {useEffect} from "react";
import {connect} from "react-redux";
import {postComment} from "../../store/actions/commentsActions";
import {getPostDetail} from "../../store/actions/postsActions";
import {CardMedia, CircularProgress, Container, Grid, makeStyles, Typography} from "@material-ui/core";
import Comments from "../comments/comments";
import {useSnackbar} from "notistack";
import FormComment from "../comments/formComment";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5)
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9,
        margin: theme.spacing(1)
    }
}));

const DetailPost = (props) => {

    const {post, detailPost, user, postComment, commentSuccess} = props;
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const params = props.match.params.slug;

    useEffect(() => {
        detailPost(params);
    }, [params, detailPost]);

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
        <React.Fragment>
            <Container className={classes.root}>
                {post ? <Grid container justify={"center"}>
                    <Grid item xs={12}>
                        <Typography align={"center"} variant={"h4"}>
                            {post.title}
                        </Typography>
                    </Grid>
                    {post.photos && post.photos.map((item, index) =>
                        <Grid item key={index} xs={index === 0 && post.photos.length > 2 ? 12 : 6}>
                            <CardMedia className={classes.media}
                                       image={`${process.env.REACT_APP_BASE_PUBLIC_URL}/${item}`}>
                            </CardMedia>
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
                </Grid> : <CircularProgress color={"primary"}/>}
                {post && post.comments && <Comments comments={post.comments}/>}
                <FormComment submit={handleSubmit}/>
            </Container>

        </React.Fragment>
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
        commentError: state.comment.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        detailPost: (slug) => dispatch(getPostDetail(slug)),
        postComment: (form) => dispatch(postComment(form))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost);
