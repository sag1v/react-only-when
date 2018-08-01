import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Only extends Component {

  static defaultProps = {
    hiddenMode: "withNull",
    className: "r-o_hidden"
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    when: PropTypes.bool.isRequired,
    hiddenMode: PropTypes.oneOf([
      "withNull",
      "withDisplay",
      "withVisibility",
      "withCss"
    ]),
    className: PropTypes.string
  }

  render() {
    const { children, when, hiddenMode, className } = this.props;
    const singleChild = React.Children.only(children);
    const { style, ...restOfChildProps } = singleChild.props;
    const extendedProps = { ...restOfChildProps };

    const keepNode = hiddenMode && hiddenMode !== "withNull";

    if (keepNode) {
      if (hiddenMode === "withCss") {
        extendedProps.className = `${extendedProps.className} ${className}`;
      } else {
        extendedProps.style = {
          ...style,
          ...(hiddenMode === "withDisplay" && { display: "none" }),
          ...(hiddenMode === "withVisibility" && { visibility: "hidden" })
        };
      }
    }
    const cloned = React.cloneElement(singleChild, extendedProps);
    const toHide = keepNode ? cloned : null;

    return when ? singleChild : toHide;
  }
}

export default Only;
