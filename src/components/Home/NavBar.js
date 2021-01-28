/*eslint-disable */
import React, { useState, useContext, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './NavBar.scss';
import { slide as Menu } from 'react-burger-menu';
import logo from '../pictures/hypnose_vins_logo.png';
import cross from '../pictures/cross.png';
import SimpleMenu from './MenuNavBar.js';
import Translation from './Translation.js';
import useLocalStorage from '../../services/useLocalStorage';
import { LoginContext } from '../Contexts/LoginContext';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { BasketContext } from '../Contexts/BasketContext';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const useStyles = makeStyles({
  basket: {
    color: '#8c0226',
  },
});

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { basket, changeQuantity } = useContext(BasketContext);
  const classes = useStyles();
  const { t } = useTranslation();

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { userLogged } = useContext(LoginContext);

  return (
    <nav className="navbarBody">
      <Link to="/">
        <img src={logo} alt="logo hypnose and wine" className="navbarLogo" />
      </Link>
      <div className="navbarLink">
        <ul>
          <NavLink exact to="/">
            {t('Navbar.lien1')}
          </NavLink>
          <SimpleMenu />
          <NavLink exact to="/aboutme">
            {t('Navbar.lien3')}
          </NavLink>
          <NavLink exact to="/contact">
            {t('Navbar.lien4')}
          </NavLink>
        </ul>
      </div>
      <div className="userLink">
        <div className="navbarTranslation">
          <Translation />
        </div>
        <NavLink exact to="/basket">
          <IconButton aria-label="cart">
            <StyledBadge
              className={classes.basket}
              badgeContent={basket.length}
              color="secondary"
            >
              <ShoppingCartIcon className={classes.basket} />
            </StyledBadge>
          </IconButton>
        </NavLink>
        {userLogged ? (
          <NavLink
            exact
            to="/profile"
            style={{ fontSize: '18px', width: '150px' }}
          >
            {t('Navbar.lien6')} {userLogged.firstname}
          </NavLink>
        ) : (
          <NavLink exact to="/login">
            {t('Navbar.lien7')}
          </NavLink>
        )}
      </div>
      <Menu
        className="menuNavbar"
        isOpen={menuOpen}
        onStateChange={(state) => handleStateChange(state)}
        noOverlay
        right
        width="100%"
        customCrossIcon={<img src={cross} alt="cross icon" />}
        disableAutoFocus
      >
        <Link to="/" onClick={closeMenu}>
          <img className="burgerLogo" src={logo} alt="logo burger" />
        </Link>
        <Link to="/" onClick={closeMenu}>
          Accueil
        </Link>
        <Link to="/events" onClick={closeMenu}>
          Evènements
        </Link>
        <Link to="/animators" onClick={closeMenu}>
          Animateurs
        </Link>
        <Link to="/products" onClick={closeMenu}>
          Vins & Spiritueux
        </Link>
        <Link to="/aboutme" onClick={closeMenu}>
          A Propos
        </Link>
        <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link>
        {userLogged ? (
          <Link to="/profile" onClick={closeMenu}>
            Bienvenue {userLogged.firstname} !
          </Link>
        ) : (
          <Link to="/contact" onClick={closeMenu}>
            S'inscrire | Se Connecter
          </Link>
        )}
        <Translation />
      </Menu>
    </nav>
  );
};

export default NavBar;
