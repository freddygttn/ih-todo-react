import React from "react";
import PropTypes from "prop-types";

/**
 * Renders a not found page.
 */
const NotFound = ({ handleGoBack, ...props }) => {

    return (<div>
        <span>There is nothing here...</span>
        <a href="#" onClick={handleGoBack}>Go back</a>
    </div>);

}

NotFound.propTypes = {
    handleGoBack: PropTypes.func.isRequired,
}

export default NotFound;