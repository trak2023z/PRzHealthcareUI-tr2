import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { UseAuthenticatedUser } from "../../hooks/UseAuthenticatedUser";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

interface HeaderProps {
  onDrawerToggle: () => void;
}

export default function Header() {
  let navigate = useNavigate();
  const { logout } = UseAuthenticatedUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const capitalizeFirst = (str: string | null) => {
    if (typeof str === "string") {
      return str.charAt(0).toUpperCase();
    } else {
      return "A";
    }
  };

  return (
    <AppBar position="absolute" color="inherit">
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <Link to="/">
          <img src="/prz_logo.png" alt="my image" />
        </Link>
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, fontFamily: '"Candara"' }}
        ></Typography>
        <IconButton color="inherit">
          <IconButton
            color="inherit"
            sx={{ p: 1 }}
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {/* {localStorage.getItem('avatar') !== 'null'?
                    <Avatar src={`data:image/jpeg;base64,${localStorage.getItem('avatar')}`}/>
                : */}
            <Avatar>
              <Typography>
                <h2 style={{ color: "whitesmoke" }}>
                  {capitalizeFirst(localStorage.getItem("login"))}
                </h2>
              </Typography>
            </Avatar>
            {/* } */}
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem>{localStorage.getItem("name")}</MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                navigate("/usersettings");
                handleCloseMenu();
              }}
            >
              Profil
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/globalsettings");
                handleCloseMenu();
              }}
            >
              Ustawienia
            </MenuItem>
            <MenuItem onClick={logout}>Wyloguj</MenuItem>
          </Menu>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
