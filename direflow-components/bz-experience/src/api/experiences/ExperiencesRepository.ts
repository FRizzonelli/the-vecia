import { makeRequest } from '../apiHelper';
import { Experience } from './entities/experiencesEntities';

/**
 * Class responsible of providing the experiences data throughout the app.
 *
 * This repository pattern implementation is very basic and partially wrong. Time constraints
 * lead to this decision.
 */
export class ExperiencesRepository {
  private _BASE_URL = 'http://tourism.opendatahub.bz.it/api';
  private _ACTIVITIES_URL = `${this._BASE_URL}/Activity?pagenumber=1&pagesize=10&activitytype=1023`;
  private _EVENTS_URL = `${this._BASE_URL}/Event?pagenumber=1&pagesize=10&sort=desc`;

  private _FREE_PRICE = '0.00€';
  private _NOT_AVAILABLE = 'N/A';
  private _DEFAULT_LATITUDE = 46.71503;
  private _DEFAULT_LONGITUDE = 11.65598;

  private locale: string;

  constructor(locale: string) {
    this.locale = locale;
  }

  public async getAllExperiences(onDataLoaded: (experiences: Experience[]) => any) {
    const [activities, events] = await Promise.all([this.getAllActivities(), this.getAllEvents()]);

    onDataLoaded(activities.concat(events));
  }

  private getAllActivities() {
    return makeRequest(this._ACTIVITIES_URL).then(res =>
      res.Items.map(activity => this.serializeExperience(activity)).filter(activity => activity != null)
    );
  }

  private getAllEvents() {
    return makeRequest(this._EVENTS_URL).then(res =>
      res.Items.map(event => this.serializeExperience(event)).filter(event => event != null)
    );
  }

  private serializeExperience(experience: any) {
    try {
      let title;
      if (experience.Detail[this.locale] !== undefined && experience.Detail[this.locale].Title !== undefined) {
        title = experience.Detail[this.locale].Title;
      } else {
        title = this._NOT_AVAILABLE;
      }

      let description;
      if (experience.Detail[this.locale] !== undefined && experience.Detail[this.locale].BaseText !== undefined) {
        description = experience.Detail[this.locale].BaseText;
      } else {
        description = this._NOT_AVAILABLE;
      }

      const price = experience.Price !== undefined ? experience.Price : this.getPrice();

      const images = [];
      const imageGallery = experience.ImageGallery;
      if (imageGallery !== undefined) {
        imageGallery.map((image) => {
          images.push(image.ImageUrl);
        });
      }

      let startLatitude;
      let startLongitude;
      let endLatitude;
      let endLongitude;
      const gpsPoints = experience.GpsPoints;
      if (gpsPoints !== undefined) {
        const gpsPosition = gpsPoints.position;
        if (gpsPosition !== undefined) {
          if (gpsPosition.Latitude !== undefined) {
            startLatitude = gpsPosition.Latitude;
          }
          if (gpsPosition.Longitude !== undefined) {
            startLongitude = gpsPosition.Longitude;
          }
        }

        const gpsEndPosition = gpsPoints.endposition;
        if (gpsPosition !== undefined) {
          if (gpsEndPosition.Latitude !== undefined) {
            endLatitude = gpsEndPosition.Latitude;
          }
          if (gpsEndPosition.Longitude !== undefined) {
            endLongitude = gpsEndPosition.Longitude;
          }
        }
      }

      startLatitude = startLatitude === undefined ? this._DEFAULT_LATITUDE : startLatitude;
      startLongitude = startLongitude === undefined ? this._DEFAULT_LONGITUDE : startLongitude;
      endLatitude = endLatitude === undefined ? this._DEFAULT_LATITUDE : endLatitude;
      endLongitude = endLongitude === undefined ? this._DEFAULT_LONGITUDE : endLongitude;

      return new Experience(
        title,
        description,
        price,
        images,
        startLatitude,
        startLongitude,
        endLatitude,
        endLongitude
      );
    } catch (e) {
      console.log(`Error while serializing ${e}`);
      return null;
    }
  }

  private getPrice() {
    return `${Math.floor(Math.random() * 100)}€`;
  }
}
