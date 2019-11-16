import { Button, DialogContent, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Styled } from 'direflow-component';
import sumBy from 'lodash.sumby';
import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import ActivityCard from '../activity/ActivityCard';
import styles from './SimpleDialog.css';

const keywords = [
  'nature',
  'landscape',
  'mountain',
  'skiing',
  'snow',
  'alps',
  'cows',
  'sheeps',
  'pasta',
  'speck',
  'bolzano',
  'bressanone',
  'brunico',
  'merano'
];

function SimpleDialog(props) {
  const [pickedActivities, setPickedActivities] = useState([]);
  const { onClose, open, startingDate, endingDate, activities } = props;

  const days = [];
  for (let date = moment(startingDate); date <= moment(endingDate); date = moment(date).add(1, 'd')) {
    days.push({
      date
    });
  }

  const handleClose = () => {
    onClose();
  };

  const renderDays = days.map((day: { date: Moment }, id) => (
    <div className="day-container" key={id}>
      <p className="day-title">{moment(day.date).format('DD MMMM')}</p>
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
              keyword={keywords[Math.floor(Math.random() * keywords.length)]}
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
      maxWidth={days.length > 2 ? 'lg' : 'md'}
    >
      <Styled styles={styles}>
        <div>
          <DialogTitle id="simple-dialog-title">Choose your activities!</DialogTitle>
          <DialogContent>
            <div className="container">{renderDays}</div>
          </DialogContent>
          <div className="footer">
            <Typography>{`${pickedActivities.length} attività`}</Typography>
            <Typography>{`Totale ${sumBy(pickedActivities, a => a.price)}€`}</Typography>
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
