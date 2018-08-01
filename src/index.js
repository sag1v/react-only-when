import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Only extends Component {

  static defaultProps = {
    hiddenMode: "withNull",
    className: "r-o_hidden"
  }

  static propTypes = {
    /** A single child element */
    children: PropTypes.element.isRequired,

    /** When true, children will rendered as is  */
    when: PropTypes.bool.isRequired,

    /** Determines how "react-only-when" should hide the child element 
     * "withNull": Will not render the child
     * "withDisplay": Will render the child with display:none  
     * "withVisibility": Will render the child with visibility:hidden
     * "withCss": Will render the child with a CSS class (you can pass it a custom className prop)
    */
    hiddenMode: PropTypes.oneOf([
      "withNull",
      "withDisplay",
      "withVisibility",
      "withCss"
    ]),
    /** This is working in combination with hiddenMode={"withCss"}   */
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
