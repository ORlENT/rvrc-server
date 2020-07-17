import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  Card,
  CardContent,
  CardActionArea,
  Menu,
  MenuItem,
} from "@material-ui/core";

export const PtCard = ({ title, subtitle, content, ...rest }) => (
  <Card
    style={{
      backgroundColor: "#555",
      position: "relative",
    }}
  >
    <CardContent
      style={{
        width: "100%",
        padding: "16px",
        paddingLeft: "24px",
        WebkitBoxSizing: "border-box",
      }}
    >
      {/*border highlight*/}
      <div
        style={{
          width: "8px",
          backgroundColor: "#ff9800",
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
        }}
      />

      {/*content*/}
      <p
        style={{
          color: "#fff",
          margin: "0px",
          float: "right",
          textAlign: "right",
        }}
      >
        {content}
      </p>
      {/*title*/}
      <p
        style={{
          color: "#bbb",
          margin: "0px",
        }}
      >
        <b
          style={{
            color: "#fff",
          }}
        >
          {title}
        </b>
        {" " + subtitle}
      </p>
    </CardContent>
  </Card>
);

const mapStateToProps = (state) => {
  return {
    isAuthed: state.store.isAuthed,
  };
};

export const TransCard = compose(
  connect(mapStateToProps),
  withRouter
)(({ id, t, isAuthed, history, ...rest }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    history.push(`/edit/${id}`);
  };

  const content = (
    <CardContent
      style={{
        width: "100%",
        padding: "16px",
        paddingLeft: "16px",
        WebkitBoxSizing: "border-box",
      }}
    >
      {/*content*/}
      <p
        style={{
          color: "#fff",
          margin: "0px",
          float: "right",
          textAlign: "right",
        }}
      >
        {t.points < 0 ? t.to + " " + t.points : t.to + " +" + t.points}
      </p>
      {/*title*/}
      <p
        style={{
          color: "#999",
          margin: "0px",
        }}
      >
        <span
          style={{
            color: "#fff",
          }}
        >
          {t.points < 0 ? t.from + " 🛡️ " + t.to : t.from + " ⚔️ by " + t.to}
        </span>
        {" at " + t.timestamp.toDate().toLocaleTimeString()}
      </p>
    </CardContent>
  );

  return (
    <Card
      style={{
        backgroundColor: "#555",
        position: "relative",
      }}
    >
      {isAuthed ? (
        <>
          <CardActionArea
            onClick={handleClick}
            style={{
              font: "unset",
            }}
          >
            {content}
          </CardActionArea>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
          </Menu>
        </>
      ) : (
        content
      )}
    </Card>
  );
});
