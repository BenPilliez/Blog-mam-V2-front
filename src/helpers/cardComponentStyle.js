import {makeStyles} from "@material-ui/core";

export const cardStyle = makeStyles((theme) => ({
    spacing: {
        margin: theme.spacing(2)
    },
    root: {
        paddingTop: theme.spacing(2),
    },
    cardRoot: {
        maxWidth: 345,
        position: 'relative',
        marginTop: 10
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
        justifyContent: 'center'
    },
    span:{
        position: 'absolute',
        bottom: '65%',
        right: 0,
        padding: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        color: 'white',
    }
}))
