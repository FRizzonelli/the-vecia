import React, { FC, useContext } from 'react';
import { EventContext, Styled } from 'direflow-component';
import { IComponentProperties, IComponentAttributes } from './componentProperties';
import styles from './App.css';
import { WeatherRepository } from './api/weather/WeatherRepository';
import { Station, Weather } from './api/weather/entities/weatherEntities';

interface IProps extends IComponentProperties, IComponentAttributes {}

const App: FC<IProps> = props => {
  const dispatch = useContext(EventContext);

  const handleClick = () => {
    const repo = new WeatherRepository();
    repo.getAllStationsDetails((stations: Station[]) => {
      stations.forEach((station: Station) => {
        repo.getLastWeatherByStation(station, (weather: Weather) => {
          console.log(weather);
        });
      });
    });

    const event = new Event('my-event');
    dispatch(event);
  };

  const renderTodos = props.todos.map((todo: string) => (
    <li key={todo} className="todo-title">
      {todo}
    </li>
  ));

  return (
    <Styled styles={styles}>
      <div className="app">
        <div className="header-title">{props.componentTitle}</div>
        <div className="sub-title">To get started:</div>
        <div className="todo-list">
          <ul>{renderTodos}</ul>
        </div>
        <button className="button" onClick={handleClick}>
          Let's go!
        </button>
      </div>
    </Styled>
  );
};

export default App;
