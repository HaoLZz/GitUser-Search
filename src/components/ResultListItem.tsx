import styled from "styled-components";
import { Typography, Box, Card, IconButton } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

export default function ResultListItem() {
  return (
    <ListItem alignItems="flex-start">
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={`github user avatar`} />
        </ListItemAvatar>
        <ListItemText
          primary={`GitHub User`}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                User Name
              </Typography>

              {" — Other info …"}
            </>
          }
        />
        <IconButton>
          <OpenInNewOutlinedIcon />
        </IconButton>
      </ListItemButton>
    </ListItem>
  );
}
