import styled from "styled-components";
import { Typography, Box, Card, IconButton, Link } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { User } from "../interface/data";

export default function ResultListItem({ user }: { user: User }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemButton>
        <ListItemAvatar>
          <Avatar src={user.avatar_url} alt={`github user avatar`} />
        </ListItemAvatar>
        <ListItemText
          primary={`${user.login}`}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {`GitHub ${user.type}`}
              </Typography>

              {" — Other info …"}
            </>
          }
        />
        <Link href={user.html_url} target="_blank" rel="noreferrer">
          <IconButton>
            <OpenInNewOutlinedIcon />
          </IconButton>
        </Link>
      </ListItemButton>
    </ListItem>
  );
}
