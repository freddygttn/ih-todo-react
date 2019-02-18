import React from "react";
import PropTypes from "prop-types";


const NotFoundView = ({ handleGoBack, ...props }) => {

    return (<div>
        <span>There is nothing here...</span>
        <a href="#" onClick={this.props.handleGoBack}>You need to login first</a>
    </div>);

}

NotFoundView.propTypes = {
    handleGoBack: PropTypes.func.isRequired,
}

export default NotFoundView;