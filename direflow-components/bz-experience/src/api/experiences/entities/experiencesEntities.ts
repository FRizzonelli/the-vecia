/**
 * Entity that represents an experience which can be shown to the user.
 */
export class Experience {
  public title: string;
  public description: string;
  public price?: string;
  public images?: string[];
  public startLatitude?: string;
  public startLongitude?: string;
  public endLatitude?: string;
  public endLongitude?: string;

  constructor(
    title: string,
    description: string,
    price?: string,
    images?: string[],
    startLatitude?: string,
    startLongitude?: string,
    endLatitude?: string,
    endLongitude?: string
  ) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.images = images;
    this.startLatitude = startLatitude;
    this.startLongitude = startLongitude;
    this.endLatitude = endLatitude;
    this.endLongitude = endLongitude;
  }
}
