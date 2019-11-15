/**
 * Entity the represents the station which will be used to fetch weather
 * data.
 */
export class Station {
  public id: string;
  public latitude: string;
  public longitude: string;

  constructor(id: string, latitude: string, longitude: string) {
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

/**
 * Entity that represents the weather at specific coordinates.
 */
export class Weather {
  public temperature: string;
  public airHumidity: string;

  constructor(temperature: string, airHumidity: string) {
    this.temperature = temperature;
    this.airHumidity = airHumidity;
  }
}
