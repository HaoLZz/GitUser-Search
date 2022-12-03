import { TextField, InputAdornment, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import styled from "styled-components";

export default function SearchBar() {
  return (
    <SCForm>
      <TextField
        id="primary-search"
        variant="outlined"
        type="search"
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
          "aria-label": "search",
        }}
        fullWidth
        placeholder="Search Github users or organizations"
      />
      <SCButton type="submit" variant="contained">
        Search
      </SCButton>
      <FormControl fullWidth>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          defaultValue="user"
          name="radio-buttons-group"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <FormControlLabel value="user" control={<Radio />} label="User" />
          <FormControlLabel
            value="organization"
            control={<Radio />}
            label="Organization"
          />
        </RadioGroup>
      </FormControl>
    </SCForm>
  );
}

const SCForm = styled.form`
  width: 100%;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SCButton = styled(Button)`
  width: 35%;
  max-width: 150px;
  order: 2;
` as typeof Button;
