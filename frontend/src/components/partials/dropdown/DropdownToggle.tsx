import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
type CustomToggleProps = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
};
type Ref = HTMLAnchorElement;
const CustomToggle = React.forwardRef<Ref, CustomToggleProps>(
  ({ children, onClick }: CustomToggleProps, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  )
);

