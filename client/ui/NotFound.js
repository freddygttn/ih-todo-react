import React from "react";
import PropTypes from "prop-types";


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