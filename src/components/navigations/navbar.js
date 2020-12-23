import React, {useEffect} from "react";
import {connect} from "react-redux";
import DesktopNav from "./desktop";
import MobileNav from "./mobile";
import {useMediaQuery} from "@material-ui/core";
import {getCategories} from "../../store/actions/categoriesActions";
import {DeleteUser, signOut} from "../../store/actions/authActions";
import AlertDialogSlide from "../custom/alertDialog";
import CustomDialog from "../custom/customDialog";
import FormAvatar from "../forms/avatarForm";
import FormPassword from "../forms/passwordForm";


const NavBar = (props) => {

    const [isMounted, setIsMounted] = React.useState(false);
    const [avatar, setAvatar] = React.useState(false);
    const [deleteRequest, setDeleteRequest] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openPassword, setOpenPassword] = React.useState(false);




    const {
        isDark,
        handleChange,
        user,
        categories,
        loadCategories,
        handleOpen,
        logout,
        deleteError,
        deleteUser,
    } = props;

    useEffect(() => {
        if (!isMounted) {
            loadCategories();
            setIsMounted(true);
        }
        if (deleteRequest && deleteError === false) {
            logout();
        }

    }, [deleteRequest, deleteError, isMounted, loadCategories, setIsMounted, logout]);

    const handleDelete = () => {
        setOpenDelete(!openDelete);
    };

    const handleAvatar = () => {
        setAvatar(open => !open);
    };

    const handleSubmit = () => {
        setDeleteRequest(true);
        deleteUser(user.id);
    };

    const handlePassword = () => {
        setOpenPassword(open => !open);
    };

    const matches = useMediaQuery(theme => theme.breakpoints.down("sm") || theme.breakpoints.down("xs"));

    return (
        <React.Fragment>
            {matches ? <MobileNav
                    categories={categories}
                    handleLogout={logout}
                    handleDelete={handleDelete}
                    handleAvatar={handleAvatar}
                    handlePassword={handlePassword}
                    handleOpen={handleOpen}
                    isDark={isDark}
                    handleChange={handleChange}
                    user={user}/> :
                <DesktopNav
                    handleLogout={logout}
                    categories={categories}
                    handleDelete={handleDelete}
                    handleAvatar={handleAvatar}
                    handlePassword={handlePassword}
                    handleOpen={handleOpen}
                    isDark={isDark}
                    handleChange={handleChange}
                    user={user}/>}

            <AlertDialogSlide
                isOpen={openDelete}
                handleClose={handleDelete}
                submit={() => handleSubmit()}
                title={"Supprimer ?"}
                content={"Tu es sur le point de supprimer ton compte?"}/>

            <CustomDialog handleClose={handleAvatar} title={"Changer votre avatar"} isOpen={avatar} fullScreen={matches}>
                <FormAvatar handleClose={handleAvatar}/>
            </CustomDialog>

            <CustomDialog handleClose={handlePassword} title={"Changer votre avatar"} isOpen={openPassword} fullScreen={matches}>
                <FormPassword handleClose={handlePassword}/>
            </CustomDialog>

        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
        user: state.auth.user,
        deleteError: state.auth.deleteError
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadCategories: () => dispatch(getCategories()),
        logout: () => dispatch(signOut()),
        deleteUser: (id) => dispatch(DeleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
