/**
 * Entity that represents the weather at specific coordinates.
 */
export class Weather {
  public description: string;
  public temperature: string;
  public humidity: string;

  constructor(description: string, temperature: string, humidity: string) {
    this.description = description;
    this.temperature = temperature;
    this.humidity = humidity;
  }
}
