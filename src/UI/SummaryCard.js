import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Card, CardContent, CardActionArea } from "@material-ui/core";
import timeConverter from "../functions/timeConverter";
import timeFromNow from "../functions/timeFromNow";
import AdminMenu from "./AdminMenu";
import { deleteAnn, deleteRem, deleteQna } from "../store/actions";

//max lines of summary
const summaryLength = 2;

const mapStateToProps = (state) => {
  return {
    isAuthed: state.store.isAuthed,
  };
};

export const SummaryCard = connect(mapStateToProps)(
  ({
    title,
    content,
    timestamp,
    highlight,
    highlightText,
    to = "#",
    onClick,
    menuOptions,
    children,
    isAuthed,
  }) => {
    if (isAuthed) {
      highlight = false;
      highlightText = null;
    }
    return (
      <Card
        style={{
          backgroundColor: "#555",
        }}
      >
        <CardActionArea
          onClick={onClick}
          style={{
            font: "unset",
          }}
        >
          {/*more options (Admin only)*/}
          {isAuthed && (
            <AdminMenu
              menuOptions={menuOptions}
              style={{
                float: "right",
                margin: "16px",
              }}
            />
          )}
          <Link to={to} style={{ textDecoration: "none" }}>
            <CardContent
              style={{
                width: "100%",
                padding: "16px",
                paddingLeft: highlight ? "24px" : null,
                WebkitBoxSizing: "border-box",
              }}
            >
              {/*border highlight*/}
              {highlight && (
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
              )}
              {/*highlight text*/}
              <h5
                style={{
                  float: "right",
                  textAlign: "right",
                  color: "#ff9800",
                  margin: "0px",
                }}
              >
                {highlightText}
              </h5>
              {/*title*/}
              <h3
                style={{
                  color: "#fff",
                  margin: "0px",
                  marginBottom: "8px",
                }}
              >
                {title}
              </h3>

              {/*content*/}
              <p
                style={{
                  color: "#fff",
                  margin: "0px",
                  //Clamp down to summaryLength
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: summaryLength,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {content}
              </p>

              {children}

              {/*timestamp*/}
              <p style={{ color: "#bbb", margin: "0px", marginTop: "8px" }}>
                {timestamp}
              </p>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    );
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAnn: (annID) => dispatch(deleteAnn(annID)),
    deleteRem: (remID) => dispatch(deleteRem(remID)),
    deleteQna: (qnaID) => dispatch(deleteQna(qnaID)),
  };
};

export const AnnCard = compose(
  connect(null, mapDispatchToProps),
  withRouter
)(
  ({
    annID,
    history,
    read,
    timestamp,
    to,
    deleteAnn,
    deleteRem,
    deleteQna,
    ...rest
  }) => (
    <SummaryCard
      elevation={read ? 3 : 10}
      highlight={!read}
      highlightText={read ? null : "NEW!"}
      timestamp={"Posted on " + timeConverter(timestamp)}
      to={to}
      menuOptions={[
        { name: "Edit", handler: () => history.push(`${to}/edit`) },
        { name: "Delete", handler: () => deleteAnn(annID) },
      ]}
      {...rest}
    />
  )
);

export const QnaCard = compose(
  connect(null, mapDispatchToProps),
  withRouter
)(
  ({
    qnaID,
    history,
    asked,
    answered,
    timestamp,
    to,
    deleteAnn,
    deleteRem,
    deleteQna,
    ...rest
  }) => (
    <SummaryCard
      elevation={asked && answered ? 3 : 10}
      highlight={asked && answered}
      highlightText={asked ? (answered ? "ANSWERED!" : "Your Question") : null}
      timestamp={"Asked on " + timeConverter(timestamp)}
      to={to}
      menuOptions={[
        { name: "Answer", handler: () => history.push(`${to}/answer`) },
        { name: "Delete", handler: () => deleteQna(qnaID) },
      ]}
      style={{ opacity: answered ? "1" : "0.5" }}
      {...rest}
    />
  )
);

export const RemCard = compose(
  connect(null, mapDispatchToProps),
  withRouter
)(
  ({
    remID,
    history,
    timestamp,
    to,
    deleteAnn,
    deleteRem,
    deleteQna,
    ...rest
  }) => (
    // > 1 week - green,  low priority
    // > 1 day  - orange, medium priority
    // < 1 day  - red,    high priority

    <SummaryCard
      content={"Due in " + timeFromNow(timestamp)}
      timestamp={"Due on " + timeConverter(timestamp)}
      to={to}
      menuOptions={[
        { name: "Edit", handler: () => history.push(`rem/${remID}/edit`) },
        { name: "Delete", handler: () => deleteRem(remID) },
      ]}
      {...rest}
    >
      <div
        style={{
          width: "100%",
          height: "8px",
          borderRadius: "4px",
          backgroundColor: "#444",
        }}
      >
        <div
          style={{
            width: remWidth(timestamp),
            height: "100%",
            borderRadius: "4px",
            backgroundColor: remColor(timestamp),
          }}
        />
      </div>
    </SummaryCard>
  )
);

function remWidth(timestamp) {
  const diff = timestamp.toDate() - Date.now();
  const week = 1000 * 60 * 60 * 24 * 7;

  //overdue
  if (diff <= 0) return "100%";

  //more than a week
  if (diff > week) return "8px";

  return (1 - diff / week) * 100 + "%";
}

function remColor(timestamp) {
  const diff = timestamp.toDate() - Date.now();
  const week = 1000 * 60 * 60 * 24 * 7;
  const day = 1000 * 60 * 60 * 24;

  //more than a week - green
  if (diff > week) return "#4caf50";

  //more than a day - orange
  if (diff > day) return "#ff9800";

  //less than a day - red
  return "#f44336";
}

export const PtCard = ({ onClick, to, title, content, ...rest }) => (
  <Card
    style={{
      backgroundColor: "#555",
    }}
    {...rest}
  >
    <CardActionArea
      onClick={onClick}
      style={{
        font: "unset",
      }}
    >
      <Link to={to} style={{ textDecoration: "none" }}>
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
          <h3
            style={{
              color: "#fff",
              margin: "0px",
            }}
          >
            {title}
          </h3>
        </CardContent>
      </Link>
    </CardActionArea>
  </Card>
);
