import logo from '../images/logo.png';

const logoStyle = {
    maxWidth: 80,
    paddingRight: 10,
    marginTop: 4,
};

const Logo = (props) => (
  <img
    alt="Logo"
    style={logoStyle}
    src={logo}
    {...props}
  />
);

export default Logo;
