import React, {useEffect} from "react";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Box, Button} from "@material-ui/core";
import {DropzoneArea} from "material-ui-dropzone";
import {converFormToFormData} from "../../helpers/convertFormToFomdata";
import {updateUser} from "../../store/actions/authActions";
import {useSnackbar} from "notistack";
import {connect} from "react-redux";


const validationSchema = Yup.object({
    avatar: Yup
        .mixed()
        .required("Un fichier est requis")
});

const initialValue = {
    avatar: {},
};


const FormAvatar = (props) => {
    const {uploadAvatar, user, error, handleClose} = props;
    const [handleUpdate, setHandleUpdate] = React.useState(false);
    const {enqueueSnackbar} = useSnackbar();


    useEffect(() => {
        if (!error && handleUpdate) {
            handleClose();
            setHandleUpdate(false);
        }

        if (error && handleUpdate) {
            enqueueSnackbar(error, {
                variant: "error",
                persist: true,
            });
            setHandleUpdate(false);
        }
    }, [handleClose, error, handleUpdate, setHandleUpdate, enqueueSnackbar]);

    const handleSubmit = (values) => {
        console.log(values);
        const form = converFormToFormData(values);
        uploadAvatar(user.id, form);
        setHandleUpdate(true);
    };

    return (
        <Formik
            validateOnChange
            initialValues={initialValue}
            onSubmit={(values, {setSubmitting}) => handleSubmit(values)}
            validationSchema={validationSchema}
        >

            {({submitForm, isSubmitting, setFieldValue, errors}) => (
                <Form>
                    <Box margin={2}>
                        <Field
                            component={DropzoneArea}
                            dropzoneText={"Dépose ton avatar ou clique"}
                            acceptedFiles={["image/*"]}
                            onChange={(files) => {
                                if (files.length > 0) {
                                    setFieldValue("avatar", files);
                                }
                            }}
                            name={"avatar"}
                            filesLimit={1}
                            maxFileSize={2000000}
                        />
                        {errors.avatar}
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
        error: state.auth.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadAvatar: (id, form) => dispatch(updateUser(id, form))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAvatar);
