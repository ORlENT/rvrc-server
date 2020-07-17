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
import isEqual from "../functions/isEqual";

export const PtCard = ({ title, subtitle, content, highlight, ...rest }) => (
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
        paddingLeft: highlight ? "24px" : "16px",
        WebkitBoxSizing: "border-box",
      }}
    >
      {/*border highlight*/}
      {highlight && (
        <div
          style={{
            width: "8px",
            backgroundColor: highlight,
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
          }}
        />
      )}
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

export const TransCard = withRouter(
  ({ id, t, newT, clickable, history, ...rest }) => {
    if (isEqual(t, newT)) {
      newT = null;
    }

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

    const transToText = (t, strikethrough) => (
      <p
        style={{
          color: strikethrough ? "#999" : "#fff",
          margin: "0px",
          position: "relative",
        }}
      >
        <span
          style={{
            float: "right",
            textAlign: "right",
          }}
        >
          {/*points*/}
          {t && (t.points < 0 ? t.to + " " + t.points : t.to + " +" + t.points)}
        </span>
        {/*log*/}
        {t &&
          (t.points < 0 ? t.from + " 🛡️ " + t.to : t.from + " ⚔️ by " + t.to)}

        <span
          style={{
            color: "#999",
          }}
        >
          {/*timestamp*/}
          {t &&
            t.timestamp &&
            " at " + t.timestamp.toDate().toLocaleTimeString()}
        </span>

        {strikethrough && (
          <div
            style={{
              position: "absolute",
              left: "0",
              top: "50%",
              height: "1px",
              background: "#999",
              content: "",
              width: "100%",
              display: "block",
            }}
          />
        )}
      </p>
    );

    const content = (
      <CardContent
        style={{
          width: "100%",
          padding: "16px",
          paddingLeft: "16px",
          WebkitBoxSizing: "border-box",
        }}
      >
        {newT ? (
          <>
            {transToText(t, true)}
            {transToText(newT)}
          </>
        ) : (
          transToText(t)
        )}
      </CardContent>
    );

    return (
      <Card
        style={{
          backgroundColor: "#555",
          position: "relative",
        }}
      >
        {clickable ? (
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
  }
);
