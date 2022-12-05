import React, { useState, useEffect } from "react";
import { useSWRConfig } from "swr";
import styled from "styled-components";
import { Typography, Box, Button, Divider } from "@mui/material";
import List from "@mui/material/List";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ResultListItem from "./ResultListItem";
import ResultListSkeleton from "./ResultListSkeleton";
import useFetch from "../hooks/useFetch";

function ErrorMessage({ query }: { query: string }) {
  const { mutate: refetch } = useSWRConfig();
  return (
    <SCError>
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
    </SCError>
  );
}

interface ResultListProps {
  query: string;
  pageIndex: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const DEFAULT_PER_PAGE = 10;
const MAXIMUM_PAGE_INDEX = 100;

export default function ResultList({
  query,
  pageIndex,
  setTotalPages,
}: ResultListProps) {
  // Guard against invalid pageIndex
  // Github search only allow query first 1000 results
  const currentPage =
    typeof pageIndex !== "number" || Number.isNaN(pageIndex) || pageIndex <= 0
      ? 1
      : Math.min(pageIndex, MAXIMUM_PAGE_INDEX);
  const queryString = query
    ? `${process.env.REACT_APP_API_BASE_URL}?q=${query}&page=${currentPage}&per_page=${DEFAULT_PER_PAGE}`
    : "";

  const { data: users, isLoading, isError, error } = useFetch(queryString);

  console.log(users, isError);

  // after data fetching, if total_count changes, then update totalPages state in App
  useEffect(() => {
    if (!!users && users.total_count > 0) {
      setTotalPages(users.total_count);
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
      >
        <ResultListSkeleton totalNum={DEFAULT_PER_PAGE} />
      </List>
    );
  }

  if (!users) {
    return null;
  }

  if (users.items?.length === 0) {
    return <>No result found</>;
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

const SCError = styled.div`
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

const SCButton = styled(Button)`
  width: 150px;
  height: 40px;
` as typeof Button;
