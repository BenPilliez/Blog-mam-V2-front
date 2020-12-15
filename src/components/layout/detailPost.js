import React, {useEffect} from "react"
import {connect} from "react-redux"
import {getPostDetail} from "../../store/actions/postsActions"
import {CardMedia, CircularProgress, Container, Grid, makeStyles, Typography} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5)
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
        margin: theme.spacing(1)
    }
}))

const DetailPost = (props) => {

    const {post, detailPost} = props
    const classes = useStyles()
    const params = props.match.params.slug

    useEffect(() => {
        detailPost(params)
    }, [params, detailPost])

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
                        <Grid item key={index} xs={index === 0 ? 12 : 6}>
                            <CardMedia className={classes.media}
                                       image={`${process.env.REACT_APP_BASE_PUBLIC_URL}/${item}`}>
                            </CardMedia>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Typography align={"center"} variant={"body1"}
                                    dangerouslySetInnerHTML={{__html: post['content']}}/>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant={"caption"} color={"textSecondary"}>
                            {post.createdAt}, {post.user.username},
                            status: {post.published === false ? 'Non publié' : 'Publié'}
                        </Typography>
                    </Grid>
                </Grid> : <CircularProgress color={"primary"}/>}

            </Container>

        </React.Fragment>
    )

}

const mapStateToProps = (state, ownProps) => {
    const detail = state.posts.postDetail.find((item) => {
        return item.slug === ownProps.match.params.slug
    })
    return {
        post: detail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        detailPost: (slug) => dispatch(getPostDetail(slug))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)
