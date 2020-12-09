import React, {useEffect} from "react"
import {connect} from "react-redux"
import {detailCategory} from "../../store/actions/categoriesActions";

const DetailCategories = (props) => {

    const {categoryDetail, getCategoryDetail} = props
    const [isMounted, setIsMounted] = React.useState(false)
    const params = props.match.params.slug

    useEffect(() => {
            getCategoryDetail(params)
            setIsMounted(true)
    }, [isMounted, getCategoryDetail, params,setIsMounted])

    return (
        <React.Fragment>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci assumenda culpa dicta eveniet
                libero! Autem dolor enim id itaque labore odio quisquam vel! A asperiores magnam quas saepe tenetur,
                vitae.
            </div>
            <div>Adipisci aliquam aspernatur cum deserunt eaque ipsum labore minus nesciunt officia ratione, sunt
                veniam! Accusantium aliquid beatae commodi consectetur consequatur dolorum eligendi enim, explicabo
                laborum magnam neque nulla numquam omnis.
            </div>
            <div>A adipisci aspernatur commodi consequatur cumque debitis delectus dolorem doloribus earum fugit,
                incidunt ipsa ipsum itaque mollitia nisi non porro repudiandae sed velit voluptas! Dolorum et expedita
                molestias nobis repellendus.
            </div>
            <div>Beatae, consequatur dolores facere mollitia perspiciatis quisquam rem voluptates. Accusantium atque
                doloremque et facilis fugiat pariatur quaerat rerum saepe ut vitae! Alias blanditiis consequatur
                excepturi laudantium non odio, pariatur? Beatae?
            </div>
            <div>A alias aliquid aperiam aspernatur aut commodi cupiditate debitis deserunt doloremque ducimus
                exercitationem facere illum impedit inventore libero magni minima nostrum odio officia praesentium quas
                quibusdam quos, rerum sed tenetur?
            </div>
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
