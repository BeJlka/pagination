import React from 'react';

export const Icon = ({ icon, iconStyle, ...rest }) => {
  let className = "material-icons";
  if (iconStyle) {
    className += ` ${iconStyle}`
  }
  return <i className={className}>{icon}</i>;
};

