import React, {useEffect} from "react"
import {connect} from "react-redux"
import {getPosts} from "../../store/actions/postsActions"
import CustomCarousel from "../custom/carousel/carousel"
import CardList from "../custom/card/cardList"

const Home = ({carouselItems, posts, getPosts, pagination}) => {

    const params = {
        perPage: 5,
        page: 0,
        order: ['createdAt', 'asc']
    }
    const [firstMount, setFirstMount] = React.useState(true)
    const [page, setPage] = React.useState(params.page)

    useEffect(() => {
        if (firstMount) {
            getPosts(params)
            setFirstMount(false)
        }
    }, [setFirstMount, getPosts, firstMount])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        params['page'] = newPage - 1
        getPosts(params)
        console.log("allo")
    }

    return (
        <React.Fragment>
            <CustomCarousel
                carouselOptions={
                    {
                        dots: false,
                        infinite: true,
                        autoplay: true,
                        speed: 500,
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }}
                items={carouselItems}
            />
            <CardList pagination={pagination} handleChange={handleChangePage} page={page} posts={posts}/>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    const carouselItems = state.posts.posts.slice(0, 4)
    return {
        carouselItems: carouselItems,
        posts: state.posts.posts,
        pagination: state.posts.pagination
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: (params) => dispatch(getPosts(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
