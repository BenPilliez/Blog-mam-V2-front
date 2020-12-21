import React, {useEffect} from "react";
import {connect} from "react-redux";
import DesktopNav from "./desktop";
import MobileNav from "./mobile";
import {useMediaQuery} from "@material-ui/core";
import {getCategories} from "../../store/actions/categoriesActions";
import {signOut} from "../../store/actions/authActions";

const NavBar = (props) => {

    const [isMounted, setIsMounted] = React.useState(false);
    const {isDark, handleChange, user, categories, loadCategories, handleOpen, logout} = props;

    useEffect(() => {
        if (!isMounted) {
            loadCategories();
            setIsMounted(true);
        }
    }, [isMounted, loadCategories, setIsMounted]);

    const matches = useMediaQuery(theme => theme.breakpoints.down("sm") || theme.breakpoints.down("xs"));

    return (
        <React.Fragment>
            {matches ? <MobileNav handleLogout={logout} categories={categories} handleOpen={handleOpen} isDark={isDark}
                                  handleChange={handleChange} user={user}/> :
                <DesktopNav handleLogout={logout} categories={categories} handleOpen={handleOpen} isDark={isDark}
                            handleChange={handleChange} user={user}/>}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
        user: state.auth.user
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadCategories: () => dispatch(getCategories()),
        logout: () => dispatch(signOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
