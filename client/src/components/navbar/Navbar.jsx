import { AppBar, Box, Toolbar, styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import Search from "./Search";

import CartIndicator from "./CartIndicator";
import UserMenu from "./UserMenu";

const CustomAppBar = styled(AppBar)`
  position: relative;
  height: 65px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const CustomToolbar = styled(Toolbar)`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  background-color: #fff;
  color: #000;
`;

const RightMenu = styled(Box)`
  display: flex;
  width: 80px;
  margin-left: auto;
  justify-content: space-between;
`;

const Navbar = () => {
  return (
    <CustomAppBar>
      <CustomToolbar>
        <NavLink
          to="/"
          style={{
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.02rem",
          }}
        >
          E-Comm
        </NavLink>
        <Search />
        <RightMenu>
          <UserMenu />
          <CartIndicator />
        </RightMenu>
      </CustomToolbar>
    </CustomAppBar>
  );
};
export default Navbar;
