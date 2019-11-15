/**
 * Entity that represents the weather at specific coordinates.
 */
export class Weather {
  public temperature: string;
  public humidity: string;

  constructor(temperature: string, humidity: string) {
    this.temperature = temperature;
    this.humidity = humidity;
  }
}
