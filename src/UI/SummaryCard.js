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

const mapStateToProps = (state) => {
  return {
    isAuthed: state.store.isAuthed,
  };
};

export const PtCard = ({
  title,
  subtitle,
  content,
  link,
  color,
  isMine,
  clickable,
  onClickHandler,
  ...rest
}) => {
  const cardContent = (
    <CardContent
      style={{
        width: "100%",
        padding: "8px",
        paddingLeft: "16px",
        WebkitBoxSizing: "border-box",
      }}
    >
      {/*border highlight*/}
      <div
        style={{
          width: "8px",
          backgroundColor: "#" + color,
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
        }}
      >
        {clickable || isMine ? null : (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
        )}
      </div>

      {/*content*/}
      <p
        style={{
          color: clickable || isMine ? "#fff" : "#999",
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
          color: clickable || isMine ? "#fff" : "#999",
          margin: "0px",
        }}
      >
        <b>{title}</b>
        {" " + subtitle}
      </p>
    </CardContent>
  );

  return (
    <Card
      elevation={clickable ? 10 : 0}
      style={{
        backgroundColor: isMine ? "#" + color : "#555",
        position: "relative",
      }}
    >
      {clickable ? (
        <CardActionArea
          onClick={onClickHandler}
          style={{
            font: "unset",
          }}
        >
          {cardContent}
        </CardActionArea>
      ) : isMine ? (
        cardContent
      ) : (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          {cardContent}
        </div>
      )}
    </Card>
  );
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
        {t.points < 0
          ? t.to + " " + t.points
          : t.points > 0
          ? t.to + " +" + t.points
          : ""}
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
          {t.points < 0
            ? t.from + " 🛠️ " + t.to
            : t.points > 0
            ? t.from + " ⚔️ by " + t.to
            : t.from + " 🤝 " + t.to}
        </span>
        {" " +
          t.timestamp
            .toDate()
            .toLocaleTimeString()
            .replace(/:[^:]*$/, "")}
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
      {false ? ( // isAuthed? to enable edit menu
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
