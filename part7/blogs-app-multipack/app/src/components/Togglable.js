import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/display-name
const Togglable = forwardRef(({ button,children }, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref,() => {
        return {
            toggleVisibility
        };
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{button}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    );
});

Togglable.propTypes = {
    button: PropTypes.string.isRequired
};

export default Togglable;