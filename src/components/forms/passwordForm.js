import React, {useEffect} from "react";
import {UpdatePassword} from "../../store/actions/authActions";
import {useSnackbar} from "notistack";
import * as Yup from "yup";
import {connect} from "react-redux";
import {Field, Form, Formik} from "formik";
import {Box, Button, InputAdornment} from "@material-ui/core";
import {TextField} from "formik-material-ui";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const initialValue = {
    oldPassword: "",
    password: "",
    confirmPassword: ""
};

const validationSchema = Yup.object({
    oldPassword: Yup
        .string("currentPassword")
        .required("Le champ est obligatoire"),
    password: Yup
        .string("currentPassword")
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        // eslint-disable-next-line
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\?<>\{\}\[\]\(\)\$%\^&\*])/, "Le mot de passe doit contenir au moins, un chiffre, une majscule et un caractère spécial")
        .required("Le champ est obligatoire"),
    confirmPassword: Yup
        .string("currentPassword")
        .required("Le champ est obligatoire")
        .oneOf([Yup.ref("password"), null], "Les mots de passe ne correspondent pas ")
});


const FormPassword = (props) => {

    const {user, updatePassword, handleClose, error, success} = props;
    const [handleUpdate, setHandleUpdate] = React.useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [newPassword, setNewPassword] = React.useState(true);
    const [oldPassword, setOldPassword] = React.useState(true);
    const [confirmPassword, setConfirmPassword] = React.useState(true);

    const handlePassword = () => {
        setNewPassword(!newPassword);
    };

    const handleConfirmPassword = () => {
        setConfirmPassword(!confirmPassword);
    };

    const handleOldPassword = () => {
        setOldPassword(!oldPassword);
    };


    useEffect(() => {
        if (error && handleUpdate) {
            enqueueSnackbar(error, {
                variant: "error",
                persist: true,
            });
            setHandleUpdate(false);
        }

        if (success && handleUpdate) {
            handleClose();
            setHandleUpdate(false);
        }
    }, [success, error, handleUpdate, setHandleUpdate, handleClose, enqueueSnackbar]);

    const handleSubmit = (values, setSubmitting) => {
        updatePassword(user.id, values);
        setSubmitting(false);
        setHandleUpdate(true);
    };

    return (
        <Formik
            validateOnChange
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting}) => handleSubmit(values, setSubmitting)}
        >
            {({submitForm, isSubmitting, setFieldValue, errors}) => (
                <Form>
                    <Box margin={2}>
                        <Field
                            component={TextField}
                            fullWidth
                            variant={"outlined"}
                            type={oldPassword ? "password" : "text"}
                            label={"Mot de passe actuel"}
                            name={"oldPassword"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment onClick={handleOldPassword} position="end">
                                        {oldPassword ? <FontAwesomeIcon icon={"eye"}/> :
                                            <FontAwesomeIcon icon={"eye-slash"}/>}
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Box margin={2}>
                        <Field
                            component={TextField}
                            fullWidth
                            variant={"outlined"}
                            label={"Nouveau mot de passe"}
                            type={newPassword ? "password" : "text"}
                            name={"password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment onClick={handlePassword} position="end">
                                        {newPassword ? <FontAwesomeIcon icon={"eye"}/> :
                                            <FontAwesomeIcon icon={"eye-slash"}/>}
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Box margin={2}>
                        <Field
                            component={TextField}
                            fullWidth
                            variant={"outlined"}
                            label={"Confirmation"}
                            type={confirmPassword ? "password" : "text"}
                            name={"confirmPassword"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment onClick={handleConfirmPassword} position="end">
                                        {confirmPassword ? <FontAwesomeIcon icon={"eye"}/> :
                                            <FontAwesomeIcon icon={"eye-slash"}/>}
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Box margin={2}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Modifier
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        error: state.auth.error,
        success: state.auth.success
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePassword: (id, form) => dispatch(UpdatePassword(id, form))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPassword);
