import React, {useEffect} from "react"
import {connect} from "react-redux"
import {getPosts} from "../../store/actions/postsActions"
import CustomCarousel from "../custom/carousel"


const Home = ({carouselItems, posts, getPosts}) => {

    const [firstMount, setFirstMount] = React.useState(true)

    useEffect(() => {
        if (firstMount) {
            getPosts({
                query: {
                    perPage: 10,
                    page: 0,
                    order: ['createdAt', 'asc']
                }
            })
            setFirstMount(false)
        }
    }, [setFirstMount, getPosts, firstMount])

    return (
        <React.Fragment>
            <CustomCarousel carouselOptions={{animation: 'slide', timeout: 600,autoPlay: false, indicators: false}} items={carouselItems}/>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    const carouselItems = state.posts.posts.slice(0, 4)
    return {
        carouselItems: carouselItems,
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: (params) => dispatch(getPosts(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
