import { makeRequest } from '../apiHelper';
import { Weather } from './entities/weatherEntities';

const weatherConditionsThatNeedWarning = ['rain', 'snow', 'mist'];

const weatherDescriptions = [
  'Warning, there is an high chance of rain',
  'Looks like is gonna snow, be cautious'];

/**
 * Class responsible of providing weather data for all the parts of the app.
 *
 * This repository pattern implementation is very basic and partially wrong. Time constraints
 * lead to this decision.
 */
export class WeatherRepository {
  private _API_KEY = 'afe7db289dfb30f6f1135a33916c73e0';
  private _BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${this._API_KEY}&units=metric`;

  private _LATITUDE_URL_PARAM = 'lat';
  private _LONGITUDE_URL_PARAM = 'lon';

  private _DEFAULT_DESCRIPTION = '';
  private _DEFAULT_TEMPERATURE = '0°C';
  private _DEFAULT_HUMIDITY = '0%';

  private requestInit: RequestInit = {
    method: 'GET'
  };

  public async getWeatherAt(latitude: string, longitude: string, onDataLoaded: (stations: Weather) => any) {
    onDataLoaded(
      await makeRequest(
        `${this._BASE_URL}&${this._LATITUDE_URL_PARAM}=${latitude}&${this._LONGITUDE_URL_PARAM}=${longitude}`,
        this.requestInit
      ).then(weather => this.serializeWeather(weather))
    );
  }

  private serializeWeather(weather: any) {
    const description =
      weather.weather[0].description !== undefined ? weather.weather[0].description : this._DEFAULT_DESCRIPTION;
    const temperature = weather.main.temp !== undefined ? `${weather.main.temp}°C` : this._DEFAULT_TEMPERATURE;
    const humidity = weather.main.humidity !== undefined ? `${weather.main.humidity}%` : this._DEFAULT_HUMIDITY;

    return new Weather(this.computeDescription(description), temperature, humidity);
  }

  private computeDescription(description) {
    if (weatherConditionsThatNeedWarning.filter(value => value.includes(description)).length > 0) return weatherDescriptions[Math.floor(Math.random() * weatherDescriptions.length)];

    return '';
  }
}
