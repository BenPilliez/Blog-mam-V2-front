import React, {useEffect} from "react"
import {connect} from "react-redux"
import {detailCategory} from "../../store/actions/categoriesActions";
import CardList from "../custom/card/cardList";

const DetailCategories = (props) => {

    const {categoryDetail, getCategoryDetail} = props
    const [page, setPage] = React.useState(1)
    const params = props.match.params.slug

    const pagination = {
        perPage: 10,
        page: 0,
        totalPages: categoryDetail ? Math.ceil(categoryDetail.posts.length / 10) : 1,
        order: ['createdAt', 'asc']
    }


    function paginate(array, page_size, page_number) {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        return array.slice((page_number - 1) * page_size, page_number * page_size);
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
            {categoryDetail ?
                <CardList
                    pagination={pagination}
                    handleChange={handleChangePage}
                    page={page}

                    posts={paginate(categoryDetail.posts, pagination.perPage, page)}/> : null}
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
