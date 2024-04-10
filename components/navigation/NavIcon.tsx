import React from "react";

import { NavItem, NavLink, UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavIcon = ({ href, id, icon, collapseText, tooltip }) => {
  return (
    <NavItem>
      <NavLink className="nav-link-icon" href={href} id={id} target="_blank">
        <FontAwesomeIcon icon={icon} />
        <span className="nav-link-inner--text d-lg-none ml-2">
          {collapseText}
        </span>
      </NavLink>
      <UncontrolledTooltip delay={0} target={id}>
        {tooltip}
      </UncontrolledTooltip>
    </NavItem>
  );
};

export default NavIcon;
