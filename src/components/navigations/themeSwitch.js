import {IconButton, Tooltip, Typography} from "@material-ui/core"
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const ThemeSwitch = ({isDark, handleChange}) => {
    return (
        <Typography component={"div"}>
            <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
                <IconButton onClick={() => handleChange(!isDark)}>
                    {isDark ? <FontAwesomeIcon icon={'sun'}/> : <FontAwesomeIcon icon={'moon'}/>}
                </IconButton>
            </Tooltip>
        </Typography>
    )
}

ThemeSwitch.defaultProps = {
    isDark: false
}

ThemeSwitch.propTypes = {
    isDark: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default ThemeSwitch
