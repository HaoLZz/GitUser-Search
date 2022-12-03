import { Container, Typography, Box, Paper } from "@mui/material";
import Link from "@mui/material/Link";
import SearchBar from "./components/SearchBar";
import ResultList from "./components/ResultList";
import styled from "styled-components";
import gitHubLogo from "./assets/images/Octocat.jpg";

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

export default function App() {
  return (
    <Container maxWidth="sm">
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
        <SCMain>
          <SearchBar />
          <ResultList />
        </SCMain>
      </SCWrapper>
      <Copyright />
    </Container>
  );
}

const SCWrapper = styled(Paper)`
  min-height: 60vh;
  margin-top: 5vh;
  padding: 45px 35px 25px 35px;
  margin-bottom: 25px;
` as typeof Paper;

const SCLogo = styled.img`
  max-width: 100%;
  max-height: 80px;
`;

const SCMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
