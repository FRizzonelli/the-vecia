import MomentUtils from "@date-io/moment";
import Button from "@material-ui/core/Button";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Styled } from "direflow-component";
import React, { FC, useEffect, useState } from "react";
import ExperiencesRepository from "./api/experiences/ExperiencesRepository";
import styles from "./App.css";
import { IComponentAttributes, IComponentProperties } from "./componentProperties";
import SimpleDialog from "./dialog/SimpleDialog";

interface IProps extends IComponentProperties, IComponentAttributes {}

const App: FC<IProps> = props => {
  const [startingDate, setStartingDate] = useState(null);
  const [endingDate, setEndingDateChange] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    new ExperiencesRepository("it").getAllExperiences(data => {
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
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            label="Data di arrivo"
            autoOk={true}
            placeholder={"16/11/2019"}
            value={startingDate}
            onChange={handleStartingDateChange}
            minDate={new Date()}
            format="DD/MM/YYYY"
          />
          <DatePicker
            label="Data di partenza"
            autoOk={true}
            value={endingDate}
            placeholder={"17/11/2019"}
            onChange={handleEndingDateChange}
            minDate={startingDate || new Date()}
            format="DD/MM/YYYY"
          />
          <Button variant="contained" color="primary" onClick={handleClick}>
            Cerca
          </Button>
        </MuiPickersUtilsProvider>
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
};

export default App;
