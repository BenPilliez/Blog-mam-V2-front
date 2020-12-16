import React, {useEffect} from "react"
import {connect} from "react-redux"
import {detailCategory} from "../../store/actions/categoriesActions"
import {Container, Grid, Typography} from "@material-ui/core";
import CustomCard from "../custom/card/customCard";
import {Pagination} from "@material-ui/lab";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link as RouterLink} from "react-router-dom";
import {paginate} from "../../helpers/paginate"
import {cardStyle} from "../../helpers/cardComponentStyle";

const DetailCategories = (props) => {

    const {categoryDetail, getCategoryDetail} = props
    const [page, setPage] = React.useState(1)
    const params = props.match.params.slug
    const classes = cardStyle()

    const pagination = {
        perPage: 10,
        page: 0,
        totalPages: categoryDetail ? Math.ceil(categoryDetail.posts.length / 10) : 1,
        order: ['createdAt', 'asc']
    }

    useEffect(() => {
        getCategoryDetail(params)
    }, [getCategoryDetail, params])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
        return paginate(categoryDetail.posts, pagination.perPage, newPage)
    }

    return (
        <React.Fragment>
            <Container>
                <Grid container justify={"center"}>
                    {categoryDetail ? paginate(categoryDetail.posts, pagination.perPage, page).map((item, index) => {
                        return <Grid key={index} item xs={12} lg={4} md={6} sm={6}>
                            <CustomCard
                                props={{className: 'CardRoot'}}
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
                                        <Typography variant={"body1"} color={'textPrimary'}>
                                            {item.title}
                                        </Typography>
                                    </>
                                }}
                                actions={{
                                    className: classes.actions,
                                    actions: [
                                        {
                                            label: 'En voir plus',
                                            props: {
                                                component: RouterLink,
                                                to: `/post/${item.slug}`,
                                                size: 'small',
                                                color: 'primary',
                                                startIcon: <FontAwesomeIcon icon={'eye'}/>
                                            }
                                        }
                                    ]
                                }}
                            />
                        </Grid>
                    }) : null}

                    <Grid item container justify={"center"} xs={12}>
                        <Pagination
                            className={classes.spacing}
                            component="div"
                            count={pagination.totalPages}
                            page={page}
                            onChange={handleChangePage}
                        />
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>

    )
}

const mapStateToProps = (state, ownProps) => {
    const slug = ownProps.match.params.slug

    const detail = state.categories.detailCategory.find((item) => {
        return item.slug === slug
    })

    return {
        categoryDetail: detail
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        getCategoryDetail: (slug) => dispatch(detailCategory(slug))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailCategories)
