import MomentUtils from '@date-io/moment';
import { Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Styled } from 'direflow-component';
import React, { useEffect, useState } from 'react';
import ExperiencesRepository from './api/experiences/ExperiencesRepository';
import styles from './App.css';
import SimpleDialog from './dialog/SimpleDialog';

function App(props) {
  const [startingDate, setStartingDate] = useState(null);
  const [endingDate, setEndingDateChange] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    new ExperiencesRepository('it').getAllExperiences(data => {
      setActivities(data);
    });
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStartingDateChange = (date: MaterialUiPickersDate) => {
    if (date) {
      setStartingDate(date.toDate());
      if (date.toDate() >= endingDate) {
        setEndingDateChange(null);
      }
    }
  };

  const handleEndingDateChange = (date: MaterialUiPickersDate) => {
    if (date) {
      setEndingDateChange(date.toDate());
    }
  };

  return (
    <Styled styles={styles}>
      <div className="app">
        <Grid container direction="column" justify="flex-start" alignItems="flex-start">
          <Grid item xs={12}>
            <img className="logo" src="https://www.suedtirol.info/static/img/relaunch2018/panorama-footer.svg"></img>
            <Typography variant="h2">Vivi esperienze uniche</Typography>
            <Typography variant="body1">
              Puoi vedere tutte le attività nei dintorni che ti faranno immergere nella cultura della popolazione.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                className="date-picker"
                label="Data di arrivo"
                autoOk={true}
                placeholder={'16/11/2019'}
                value={startingDate}
                onChange={handleStartingDateChange}
                minDate={new Date()}
                format="DD/MM/YYYY"
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                className="date-picker"
                label="Data di partenza"
                autoOk={true}
                value={endingDate}
                placeholder={'17/11/2019'}
                onChange={handleEndingDateChange}
                minDate={startingDate || new Date()}
                format="DD/MM/YYYY"
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12}>
            <Button className="button" variant="contained" color="primary" onClick={handleClick}>
              Cerca
            </Button>
          </Grid>
        </Grid>
        <SimpleDialog
          open={open}
          onClose={handleClose}
          startingDate={startingDate}
          endingDate={endingDate}
          activities={activities}
        />
      </div>
    </Styled>
  );
}

export default App;
