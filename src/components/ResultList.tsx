import React, { useEffect } from "react";
import { useSWRConfig } from "swr";
import styled from "styled-components";
import { Typography, Box, Button, Divider } from "@mui/material";
import List from "@mui/material/List";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ResultListItem from "./ResultListItem";
import ResultListSkeleton from "./ResultListSkeleton";
import useFetch from "../hooks/useFetch";
import useUrlState from "../hooks/useUrlState";
import gitHubMarks from "../assets/images/GitHub-Marks.png";

function ErrorMessage({ query }: { query: string }) {
  // When user clicks `Retry` button manually trigger a fetch from SWR
  const { mutate: refetch } = useSWRConfig();
  return (
    <SCMessage data-cy="result-error">
      <Typography
        variant="h5"
        component="h6"
        sx={{ fontStyle: "italic", my: 3, width: "100%", textAlign: "center" }}
      >
        Oops, something went wrong
      </Typography>
      <ErrorOutlineOutlinedIcon
        color="error"
        sx={{ fontSize: " 2.5rem", marginBottom: "15px" }}
      />
      <SCButton variant="outlined" color="error" onClick={() => refetch(query)}>
        Retry
      </SCButton>
    </SCMessage>
  );
}

function EmptyResultMessage() {
  return (
    <SCMessage data-cy="result-not-found">
      <Typography
        variant="h5"
        component="h6"
        sx={{ fontStyle: "italic", my: 3, width: "100%", textAlign: "center" }}
      >
        Sorry, no result found
      </Typography>
      <SCEmptyResultImage src={gitHubMarks} alt="git-hub-marks" />
    </SCMessage>
  );
}

interface ResultListProps {
  pageIndex: number;
  shouldFetch: boolean;
}

const DEFAULT_PER_PAGE = 10;
const MAXIMUM_PAGE_INDEX = 100;

export default function ResultList({
  pageIndex,
  shouldFetch,
}: ResultListProps) {
  // States in URL
  const { query, searchType, updateUrlState } = useUrlState();

  // Guard against invalid pageIndex
  // Github search only allow query first 1000 results
  const currentPage =
    typeof pageIndex !== "number" || Number.isNaN(pageIndex) || pageIndex <= 0
      ? 1
      : Math.min(pageIndex, MAXIMUM_PAGE_INDEX);
  const queryString = shouldFetch
    ? `${process.env.REACT_APP_API_BASE_URL}?q=${query}+type:${searchType}&page=${currentPage}&per_page=${DEFAULT_PER_PAGE}`
    : "";

  const { data: users, isLoading, isError } = useFetch(queryString);

  // after data fetching, if total_count changes, then update totalPages state
  useEffect(() => {
    if (!!users && users.total_count >= 0) {
      const totalPageCount = Math.min(
        Math.ceil((users.total_count || 1) / DEFAULT_PER_PAGE),
        MAXIMUM_PAGE_INDEX
      );
      updateUrlState(undefined, { totalPages: String(totalPageCount) }, true);
    }
  }, [users?.total_count]);

  if (isError) {
    return (
      <>
        <ErrorMessage query={queryString} />
      </>
    );
  }

  if (isLoading) {
    return (
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          height: "50vh",
          overflowY: "auto",
          marginBottom: "20px",
        }}
        dense
        data-cy="result-list"
      >
        <ResultListSkeleton totalNum={DEFAULT_PER_PAGE} />
      </List>
    );
  }

  if (!users) {
    return null;
  }

  if (users.items?.length === 0) {
    return <EmptyResultMessage />;
  }
  return (
    <>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          maxHeight: "50vh",
          overflowY: "auto",
          marginBottom: "20px",
        }}
        dense
        data-cy="result-list"
      >
        {users.items.map((user) => {
          return (
            <React.Fragment key={user.id}>
              <ResultListItem user={user} />
              <Divider variant="fullWidth" component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </>
  );
}

const SCMessage = styled.div`
  width: 100%;
  height: 50vh;
  border-radius: 8px;
  margin: 25px 0;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SCEmptyResultImage = styled.img`
  max-width: 100%;
  max-height: 30vh;
  border-radius: 8px;
`;

const SCButton = styled(Button)`
  width: 150px;
  height: 40px;
` as typeof Button;
