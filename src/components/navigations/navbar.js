import React, {useEffect} from "react"
import {connect} from "react-redux"
import DesktopNav from "./desktop"
import MobileNav from "./mobile"
import {useMediaQuery} from "@material-ui/core"
import {getCategories} from "../../store/actions/categoriesActions"

const NavBar = (props) => {

    const [isMounted, setIsMounted] = React.useState(false)
    const {isDark, handleChange, user, categories, loadCategories, handleOpen} = props

    useEffect(() => {
        if (!isMounted) {
            loadCategories()
            setIsMounted(true)
        }
    }, [isMounted, loadCategories, setIsMounted])

    const matches = useMediaQuery(theme => theme.breakpoints.down('sm') || theme.breakpoints.down('xs'))

    return (
        <React.Fragment>
            {matches ? <MobileNav categories={categories} handleOpen={handleOpen}isDark={isDark} handleChange={handleChange} user={user}/> :
                <DesktopNav categories={categories} handleOpen={handleOpen}  isDark={isDark} handleChange={handleChange} user={user}/>}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
        user: state.auth.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadCategories: () => dispatch(getCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
