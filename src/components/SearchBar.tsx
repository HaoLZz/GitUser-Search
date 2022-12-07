import React, { useState } from "react";
import { TextField, InputAdornment, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import styled from "styled-components";
import useUrlState from "../hooks/useUrlState";

interface SearchBarProps {
  setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBar({ setShouldFetch }: SearchBarProps) {
  // Search form states
  const { query: searchText, searchType, updateUrlState } = useUrlState();

  const [errorMsg, setErrorMsg] = useState("");

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUrlState(
      e.target.value,
      { page: "", totalPages: "", type: "" },
      true
    );
    setErrorMsg("");
    setShouldFetch(false);
  };
  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUrlState(undefined, { type: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    // Form validation
    if (!searchText) {
      setErrorMsg("Search input is empty");
    } else if (searchText.length > 100) {
      setErrorMsg("Search input must be shorter than 100 characters");
    } else if (searchType !== "user" && searchType !== "organization") {
      setErrorMsg("Please select a search type below");
    } else {
      // Trigger data fetching and reset page index
      updateUrlState(searchText, { page: "1", type: searchType });
      setShouldFetch(true);
    }
  };

  return (
    <SCForm onSubmit={handleSubmit} data-cy="search-form">
      <SCTextField
        id="primary-search"
        name="primary-search"
        variant="outlined"
        type="search"
        value={searchText}
        onChange={handleSearchTextChange}
        autoFocus
        error={!!errorMsg}
        helperText={errorMsg || " "}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
          "aria-label": "search",
        }}
        placeholder="Search Github users or organizations"
      />
      <SCButton type="submit" variant="contained" data-cy="search-button">
        Search
      </SCButton>
      <SCFormControlRadioGroup fullWidth>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          name="radio-buttons-group"
          value={searchType}
          onChange={handleSearchTypeChange}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          data-cy="search-radio-group"
        >
          <FormControlLabel
            value="user"
            control={<Radio name="user" />}
            label="User"
          />
          <FormControlLabel
            value="organization"
            control={<Radio name="organization" />}
            label="Organization"
          />
        </RadioGroup>
      </SCFormControlRadioGroup>
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

  @media screen and (min-width: 1200px) {
    margin-top: 50px;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }
`;

const SCTextField = styled(TextField)`
  width: 100%;
  @media screen and (min-width: 1200px) {
    order: 1;
    flex: 3 1 0;
  }
`;

const SCFormControlRadioGroup = styled(FormControl)`
  @media screen and (min-width: 1200px) {
    order: 3;
  }
`;

const SCButton = styled(Button)`
  width: 35%;
  max-width: 150px;
  height: 40px;
  order: 2;

  @media screen and (min-width: 1200px) {
    height: 56px;
    flex: 1 1 0;
  }
` as typeof Button;
