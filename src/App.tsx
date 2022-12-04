import { useState } from "react";
import { Container, Typography, Box, Paper, Divider } from "@mui/material";
import Link from "@mui/material/Link";
import Pagination from "@mui/material/Pagination";
import SearchBar from "./components/SearchBar";
import ResultList from "./components/ResultList";
import styled from "styled-components";
import gitHubLogo from "./assets/images/Octocat.jpg";
import placeholderImage from "./assets/images/placeholder.jpg";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        GitUser Search
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const DEFAULT_PER_PAGE = 10;
const MAXIMUM_PAGE_INDEX = 100;

export default function App() {
  const [query, setQuery] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // MAXIMUM_PAGE_INDEX = 100
    setPageIndex(Math.min(value, MAXIMUM_PAGE_INDEX));
  };

  const totalPageCount = Math.min(
    Math.ceil(totalPages / DEFAULT_PER_PAGE),
    MAXIMUM_PAGE_INDEX
  );
  console.log("total page", totalPageCount);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <SCWrapper elevation={6}>
        <Box
          sx={{ marginBottom: "20px", textAlign: "center" }}
          component="header"
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.5rem" } }}
            gutterBottom
          >
            GitUser Search
          </Typography>
          <SCLogo src={gitHubLogo} alt="GitHub Octocat" />
        </Box>
        <Divider
          variant="fullWidth"
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", lg: "initial" } }}
        />
        <SCMain>
          <SearchBar setQuery={setQuery} setPageIndex={setPageIndex} />
          {!query ? (
            <SCPlaceholderImage
              src={placeholderImage}
              alt="placeholder image"
            />
          ) : (
            <>
              <ResultList
                query={query}
                pageIndex={pageIndex}
                setTotalPages={setTotalPages}
              />
              <Pagination
                count={totalPageCount}
                page={pageIndex}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
              />
              <Box sx={{ display: "none" }}>
                <ResultList
                  query={query}
                  pageIndex={pageIndex + 1}
                  setTotalPages={setTotalPages}
                />
              </Box>
            </>
          )}
        </SCMain>
      </SCWrapper>
      <Copyright />
    </Container>
  );
}

const SCWrapper = styled(Paper)`
  min-height: 60vh;
  padding: 45px 35px 25px 35px;
  margin-bottom: 25px;

  @media screen and (min-width: 1200px) {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
` as typeof Paper;

const SCLogo = styled.img`
  max-width: 100%;
  max-height: 80px;
`;

const SCPlaceholderImage = styled(SCLogo)`
  max-height: 50vh;
  border-radius: 8px;
  margin: 25px 0;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
`;

const SCMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
