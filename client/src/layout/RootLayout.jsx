import { Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const MainContainer = styled(Box)``;

const SecondaryContainer = styled(Box)`
  max-width: 1600px;
  margin: 0 auto;
`;

const RootLayout = () => {
  return (
    <MainContainer>
      <Navbar />
      <SecondaryContainer>
        <Outlet />
      </SecondaryContainer>
    </MainContainer>
  );
};
export default RootLayout;
