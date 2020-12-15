import React from "react"
import {
    Card,
    CardMedia,
    Grid,
    makeStyles,
    Typography,
    CardContent,
    CardActions,
    Button} from "@material-ui/core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Link as RouterLink} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
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
        color: 'white'
    }
}))

const CustomCard = ({item}) => {
    const classes = useStyles()
    return (
        <Grid item xs={12} lg={4} md={6} sm={6}>
            <Card className={classes.root}>
                <CardMedia className={classes.media}
                           image={`${process.env.REACT_APP_BASE_PUBLIC_URL}/${item.photos[0]}`}>
                    <Typography component={"span"} className={classes.span} >
                        {item.category.name}
                    </Typography>
                </CardMedia>

                <CardContent>
                    <Typography variant={"subtitle1"} color={"textSecondary"}>
                        {item.createdAt}
                    </Typography>
                    <Typography variant={"body1"} color={'textPrimary'}>
                        {item.title}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button component={RouterLink} to={`/post/${item.slug}`} size={"small"} color={"primary"} startIcon={<FontAwesomeIcon icon={'eye'} />} >
                        En voir plus
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}


export default CustomCard
