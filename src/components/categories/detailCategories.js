import React, {useEffect} from "react"
import {connect} from "react-redux"
import {detailCategory} from "../../store/actions/categoriesActions";
import {Container, Grid} from "@material-ui/core";
import CustomCard from "../custom/card/customCard";
import {Pagination} from "@material-ui/lab";

const DetailCategories = (props) => {

    const {categoryDetail, getCategoryDetail} = props
    const params = props.match.params.slug

    console.log(categoryDetail)

    useEffect(() => {
            getCategoryDetail(params)
    }, [getCategoryDetail, params])

    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Grid container justify={"center"}>
                    {posts && posts.map((item, index) => {
                        return <CustomCard
                            item={item}
                            key={index}/>
                    })}
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

const mapStateToProps = (state,ownProps) => {
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

export default connect(mapStateToProps,mapDispatchToProps)(DetailCategories)
