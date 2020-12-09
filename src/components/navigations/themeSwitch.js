import {Switch, Tooltip, Typography} from "@material-ui/core"
import PropTypes from 'prop-types';

const ThemeSwitch = ({isDark, handleChange}) => {
    return (
        <Typography component={"div"}>
            <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
                <Switch checked={isDark} onChange={(event) => handleChange(event.target.checked)}/>
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
