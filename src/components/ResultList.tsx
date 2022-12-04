import React, { useState } from "react";
import styled from "styled-components";
import { Typography, Box, Divider } from "@mui/material";
import List from "@mui/material/List";
import Pagination from "@mui/material/Pagination";
import ResultListItem from "./ResultListItem";
import useFetch from "../hooks/useFetch";

interface ResultListProps {
  query: string;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function ResultList({
  query,
  pageIndex,
  setPageIndex,
}: ResultListProps) {
  const DEFAULT_PER_PAGE = 10;
  const MAXIMUM_PAGE_INDEX = 100;
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

  if (isError) {
    return <>{JSON.stringify(error)}</>;
  }

  if (isLoading) {
    return <>Skeleton List</>;
  }

  if (!users) {
    return null;
  }

  if (users.items?.length === 0) {
    return <>No result found</>;
  }

  const totalPageCount = Math.min(
    Math.ceil(users.total_count / DEFAULT_PER_PAGE),
    MAXIMUM_PAGE_INDEX
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // MAXIMUM_PAGE_INDEX = 100
    setPageIndex(Math.min(value, MAXIMUM_PAGE_INDEX));
  };
  console.log("total page", totalPageCount);
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
      <Pagination
        count={totalPageCount}
        page={pageIndex}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
      />
    </>
  );
}
