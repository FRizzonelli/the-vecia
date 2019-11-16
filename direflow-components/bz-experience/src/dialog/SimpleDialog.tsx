import { DialogContent } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Styled } from "direflow-component";
import moment, { Moment } from "moment";
import React from "react";
import ActivityCard from "../activity/ActivityCard";
import styles from "./SimpleDialog.css";

function SimpleDialog(props) {
  const { onClose, open, startingDate, endingDate, activities } = props;

  const days = [];
  for (
    let date = moment(startingDate);
    date <= moment(endingDate);
    date = moment(date).add(1, "d")
  ) {
    days.push({
      date
    });
  }

  const handleClose = () => {
    onClose();
  };

  const renderDays = days.map((day: { date: Moment }, id) => (
    <div className="day-container" key={id}>
      <p className="day-title">{moment(day.date).format("DD MMMM")}</p>
      <div className="day-events-container">{renderActivities(day)}</div>
    </div>
  ));

  function renderActivities(day) {
    const dayActivities = activities;
    return (
      <div>
        {dayActivities.map((act, id) => (
          <div key={id}>
            <ActivityCard
              activity={act}
              onToggleActivityPresence={act => {
                console.log(act);
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={days.length > 2 ? "lg" : "md"}
    >
      <Styled styles={styles}>
        <div>
          <DialogTitle id="simple-dialog-title">
            Choose your activities!
          </DialogTitle>
          <DialogContent>
            <div className="container">{renderDays}</div>
          </DialogContent>
        </div>
      </Styled>
    </Dialog>
  );
}

export default SimpleDialog;
