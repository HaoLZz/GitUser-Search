import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Typography, Box, Divider } from "@mui/material";
import List from "@mui/material/List";
import ResultListItem from "./ResultListItem";
import ResultListSkeleton from "./ResultListSkeleton";
import useFetch from "../hooks/useFetch";

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
    return <>{JSON.stringify(error)}</>;
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
