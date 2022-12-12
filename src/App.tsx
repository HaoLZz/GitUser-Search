import { useState } from "react";
import { Container, Typography, Box, Paper, Divider } from "@mui/material";
import { SWRConfig } from "swr";
import Link from "@mui/material/Link";
import Pagination from "@mui/material/Pagination";
import SearchBar from "./components/SearchBar";
import ResultList from "./components/ResultList";
import useUrlState from "./hooks/useUrlState";
import styled from "styled-components";
import { isResponseError, isErrorWithMessage } from "./utils/helper";
import SnackbarMessage from "./components/SnackbarMessage";
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

const MAXIMUM_PAGE_INDEX = 100;

export default function App() {
  const { pageIndex, totalPages, updateUrlState } = useUrlState();

  const [shouldFetch, setShouldFetch] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // MAXIMUM_PAGE_INDEX = 100
    updateUrlState(undefined, {
      page: String(Math.min(value, MAXIMUM_PAGE_INDEX)),
    });
  };

  return (
    <SWRConfig
      value={{
        onError: (error, key) => {
          if (isResponseError(error)) {
            // report fetcher related errors
            setOpenSnackbar(true);
            setErrorMsg(
              error.status === 403
                ? "GitHub search API rate limit reached!"
                : error.info
            );
          } else if (isErrorWithMessage(error)) {
            // report non-fetcher related errors
            setOpenSnackbar(true);
            setErrorMsg(error.message);
          }
        },
      }}
    >
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
          <SCHeader>
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.5rem" } }}
              gutterBottom
              data-cy="header-text"
            >
              GitUser Search
            </Typography>
            <SCLogo
              src={gitHubLogo}
              alt="GitHub Octocat"
              data-cy="header-logo"
            />
          </SCHeader>
          <Divider
            variant="fullWidth"
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", lg: "initial" } }}
          />
          <SCMain>
            <SearchBar setShouldFetch={setShouldFetch} />
            <SCPlaceholderImage
              src={placeholderImage}
              alt=""
              data-cy="placeholder-image"
              hidden={shouldFetch}
              role="presentation"
            />
            {shouldFetch && (
              <>
                <ResultList pageIndex={pageIndex} shouldFetch={shouldFetch} />
                <Pagination
                  count={totalPages}
                  page={pageIndex}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                />
                <Box sx={{ display: "none" }}>
                  <ResultList
                    pageIndex={pageIndex + 1}
                    shouldFetch={shouldFetch}
                  />
                </Box>
              </>
            )}
          </SCMain>
        </SCWrapper>
        <footer data-cy="search-footer">
          <Copyright />
        </footer>
        <SnackbarMessage
          open={openSnackbar}
          text={errorMsg}
          severity="error"
          setOpen={setOpenSnackbar}
        />
      </Container>
    </SWRConfig>
  );
}

const SCWrapper = styled(Paper)`
  padding: 45px 35px 25px 35px;
  margin: 25px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 1200px) {
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    gap: 35px;
  }
` as typeof Paper;

const SCHeader = styled.header`
  margin-bottom: 20px;
  text-align: center;

  @media screen and (min-width: 1200px) {
    flex: 1 1 0;
    h1 {
      font-size: 2rem;
    }
  }
`;

const SCLogo = styled.img`
  max-width: 100%;
  max-height: 80px;
`;

const SCPlaceholderImage = styled(SCLogo)`
  max-height: 40vh;
  border-radius: 8px;
  margin: 25px 0;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;

  @media screen and (max-width: 1200px) and (max-height: 1100px) {
    display: none;
  }

  @media screen and (min-width: 1200px) and (max-height: 650px) {
    display: none;
  }
`;

const SCMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 1200px) {
    flex: 3 1 0;
  }
`;
