import { InputBase, styled, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBarContainer = styled(Box)`
  display: flex;
  background: #fff;
  width: 80%;
  border-radius: 2px;
  margin-left: 10px;
  background-color: #f0f5ff;
  border-radius: 5px;
`;
const InputBaseWrapper = styled(InputBase)`
  width: 100%;
  padding-left: 20px;
  font-size: unset;
`;

const SearchIconWrapper = styled(Box)`
  display: flex;
  color: blue;
  padding: 5px;
  flex: 1;
`;

const Search = () => {
  return (
    <SearchBarContainer>
      <InputBaseWrapper placeholder="Search for products, brands, and more" />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </SearchBarContainer>
  );
};
export default Search;
