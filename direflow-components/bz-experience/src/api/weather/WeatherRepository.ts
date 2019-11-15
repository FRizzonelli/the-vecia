import { makeODHRequest } from '../apiHelper';
import { Station, Weather } from './entities/weatherEntities';

/**
 * Class responsible of providing weather data for all the parts of the app.
 * 
 * This repository pattern implementation is very basic and it doesn't leverage on the Typescript
 * language features mainly for time problems.
 */
export class WeatherRepository {
  private _BASE_URL = 'http://ipchannels.integreen-life.bz.it/meteorology/rest';

  private _GET_STATION_DETAILS_URL_PATH = 'get-station-details';

  private _GET_RECORDS_URL_PATH = 'get-records';
  private _GET_RECORDS_STATION_URL_PARAM = 'station';
  private _GET_RECORDS_NAME_URL_PARAM = 'name';
  private _GET_RECORDS_SECONDS_URL_PARAM = 'seconds';

  private _DEFAULT_AIR_TEMPERATURE = '25C';
  private _DEFAULT_AIR_HUMIDITY = '60%';

  public async getAllStationsDetails(onDataLoaded: (stations: Station[]) => any) {
    onDataLoaded(
      await makeODHRequest(`${this._BASE_URL}/${this._GET_STATION_DETAILS_URL_PATH}`).then(res =>
        res.map((station: any) => this.serializeStation(station))
      )
    );
  }

  public async getLastWeatherByStation(station: Station, onDataLoaded: (weather: Weather) => any) {
    onDataLoaded(
      await makeODHRequest(
        `${this._BASE_URL}/${this._GET_RECORDS_URL_PATH}?${this._GET_RECORDS_STATION_URL_PARAM}=${station.id}&${this._GET_RECORDS_NAME_URL_PARAM}=air-temperature&${this._GET_RECORDS_SECONDS_URL_PARAM}=1`
      ).then(res =>
        this.serializeWeather({ 'air-temperature': this.getAirTemperature(), 'air-humidity': this.getAirHumidity() })
      )
    );
  }

  private serializeStation(station: any) {
    return new Station(station.id, station.latitude, station.longitude);
  }

  private serializeWeather(weather: any) {
    const airTemperature =
      weather['air-temperature'] != null ? weather['air-temperature'] : this._DEFAULT_AIR_TEMPERATURE;
    const airHumidity = weather['air-humidity'] != null ? weather['air-humidity'] : this._DEFAULT_AIR_HUMIDITY;

    return new Weather(airTemperature, airHumidity);
  }

  private getAirTemperature() {
    return `${Math.floor(Math.random() * 30)}°C`;
  }

  private getAirHumidity() {
    return `${Math.floor(Math.random() * 100)}%`;
  }
}
