import { Button, DialogContent } from "@material-ui/core";
// import {  Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Styled } from "direflow-component";
import sumBy from "lodash.sumby";
import moment, { Moment } from "moment";
import React, { useState } from "react";
import ActivityCard from "../activity/ActivityCard";
import styles from "./SimpleDialog.css";

function SimpleDialog(props) {
  const [pickedActivities, setPickedActivities] = useState([]);
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
      <div className="day-events-container">{renderActivities(day, id)}</div>
    </div>
  ));

  function renderActivities(day, id) {
    const dayActivities = activities.filter(
      (_, index) => index % days.length === id
    );

    return (
      <div className="card-container">
        {dayActivities.map((act, id) => (
          <div key={id}>
            <ActivityCard
              activity={act}
              onToggleActivityPresence={act => {
                setPickedActivities([...pickedActivities, act]);
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  function handleClick() {}

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={days.length > 2 ? "lg" : "md"}
    >
      <Styled styles={styles}>
        <div className="dialog-main-container">
          <DialogTitle id="simple-dialog-title">
            Choose your activities!
          </DialogTitle>
          <DialogContent>
            <div className="days-list-container">{renderDays}</div>
          </DialogContent>
          <div className="footer">
            <h3>{`${pickedActivities.length} attività`}</h3>
            <h3>{`Totale ${sumBy(pickedActivities, a => a.price)}€`}</h3>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Compra
            </Button>
          </div>
        </div>
      </Styled>
    </Dialog>
  );
}

export default SimpleDialog;
