import React from 'react';

type CustomToggleProps = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
};

export const CustomToggle = React.forwardRef(
  ({ children, onClick }: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
    <a
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      role="button"
    >
      {children}
      &#x25bc;
    </a>
  )
);
