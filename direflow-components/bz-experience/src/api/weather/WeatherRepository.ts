import { makeRequest } from '../apiHelper';
import { Weather } from './entities/weatherEntities';

/**
 * Class responsible of providing weather data for all the parts of the app.
 *
 * This repository pattern implementation is very basic and it doesn't leverage on the Typescript
 * language features mainly for time problems.
 */
export class WeatherRepository {
  private _API_KEY = '8983b2704136dd20c5b462a91f852738';
  private _BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${this._API_KEY}&units=metric`;

  private _LATITUDE_URL_PARAM = 'lat';
  private _LONGITUDE_URL_PARAM = 'lon';

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
    const temperature = weather.main.temp != null ? `${weather.main.temp}°C` : this._DEFAULT_TEMPERATURE;
    const humidity = weather.main.humidity != null ? `${weather.main.humidity}%` : this._DEFAULT_HUMIDITY;

    return new Weather(temperature, humidity);
  }
}
