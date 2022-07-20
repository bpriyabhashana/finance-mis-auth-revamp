import React from "react";
import PropTypes from "prop-types";
import "font-awesome/css/font-awesome.min.css";

const LoadingSpinner = props => (
      <i
        className="fa fa-spinner fa-pulse fa-3x fa-fw"
        style={{ fontSize: 36, color: "#b0abab" }}
      />
);

LoadingSpinner.propTypes = {
  loading: PropTypes.bool
};

export default LoadingSpinner;