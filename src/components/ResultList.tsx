import React from "react";
import styled from "styled-components";
import { Typography, Box, Divider } from "@mui/material";
import List from "@mui/material/List";
import Pagination from "@mui/material/Pagination";
import ResultListItem from "./ResultListItem";
export default function ResultList() {
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
        {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => {
          return (
            <React.Fragment key={value}>
              <ResultListItem />
              <Divider variant="fullWidth" component="li" />
            </React.Fragment>
          );
        })}
      </List>
      <Pagination count={10} variant="outlined" color="primary" />
    </>
  );
}
