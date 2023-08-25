import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, styled } from "@mui/material";

const CustomCartInfoContainer = styled(Box)``;

const CartIndicator = () => {
  return (
    <CustomCartInfoContainer>
      <Link to="cart">
        <ShoppingCartOutlinedIcon />
      </Link>
    </CustomCartInfoContainer>
  );
};
export default CartIndicator;
