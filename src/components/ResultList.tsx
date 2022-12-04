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
  const queryString = query
    ? `${process.env.REACT_APP_API_BASE_URL}?q=${query}&page=${pageIndex}&per_page=${DEFAULT_PER_PAGE}`
    : "";

  const { data: users, isLoading, isError, error } = useFetch(queryString);

  if (!users) {
    return null;
  }

  if (users.items?.length === 0) {
    return <>No result found</>;
  }

  if (isLoading) {
    return <>Skeleton List</>;
  }

  const totalPageCount = Math.floor(users.total_count / DEFAULT_PER_PAGE);
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
      <Pagination count={totalPageCount} variant="outlined" color="primary" />
    </>
  );
}
