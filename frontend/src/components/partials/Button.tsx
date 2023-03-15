import { Link } from 'react-router-dom';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const aButton = ({ children, className, onClick, ...rest }: ButtonProps) => {
  return (
    <button className={`btn btn-sm ${className}`} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};
const aLink = ({ children, className, href, ...rest }: LinkProps) => {
  return (
    <Link className={`btn btn-sm ${className}`} to={href} {...rest}>
      {children}
    </Link>
  );
};

export { aButton, aLink };
