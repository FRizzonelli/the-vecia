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
  const [isPurchase, setPurchase] = useState(false);
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
                if (
                  pickedActivities.filter(
                    experience => experience.title === act.title
                  ).length > 0
                ) {
                  setPickedActivities(
                    pickedActivities.filter(pa => pa.title !== act.title)
                  );
                } else {
                  setPickedActivities([...pickedActivities, act]);
                }
              }}
              isPicked={
                pickedActivities.filter(
                  experience => experience.title === act.title
                ).length > 0
              }
            />
          </div>
        ))}
      </div>
    );
  }

  function renderPickedActivities() {
    return (
      <div className="card-container">
        {pickedActivities.map((act, id) => (
          <div key={id}>
            <ActivityCard
              activity={act}
              onToggleActivityPresence={act => {}}
              isPicked={false}
            />
          </div>
        ))}
      </div>
    );
  }

  function handleShopActivities() {
    setPurchase(true);
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
        {!isPurchase ? (
          <div className="dialog-main-container">
            <div className="pattern">
              <img src="./mountains.png" style={{ height: 200 }} />
            </div>
            <DialogTitle id="simple-dialog-title">
              Scegli le tue attività per le vacanze!
            </DialogTitle>
            <DialogContent>
              <div className="days-list-container">{renderDays}</div>
            </DialogContent>
            <div className="footer">
              <h3>{`${pickedActivities.length} attività`}</h3>
              <h3>{`Totale ${sumBy(pickedActivities, a => a.price)}€`}</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={handleShopActivities}
              >
                Procedi
              </Button>
            </div>
          </div>
        ) : (
          <div className="dialog-main-container">
            <DialogTitle id="simple-dialog-title">Checkout!</DialogTitle>
            <DialogContent>
              <div className="recap-list-container">
                {renderPickedActivities()}
              </div>
            </DialogContent>
            <div className="footer">
              <h3>{`${pickedActivities.length} attività`}</h3>
              <h3>{`Totale ${sumBy(pickedActivities, a => a.price)}€`}</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={handleShopActivities}
              >
                Compra
              </Button>
            </div>
          </div>
        )}
      </Styled>
    </Dialog>
  );
}

export default SimpleDialog;
