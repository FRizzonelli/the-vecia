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

  private locale: string;

  constructor(locale: string) {
    this.locale = locale;
  }

  public async getAllExperiences(onDataLoaded: (experiences: Experience[]) => any) {
    const [activities, events] = await Promise.all([this.getAllActivities(), this.getAllEvents()]);

    onDataLoaded(activities.concat(events));
  }

  private getAllActivities() {
    return makeRequest(this._ACTIVITIES_URL).then(res => res.Items.map(activity => this.serializeExperience(activity)));
  }

  private getAllEvents() {
    return makeRequest(this._EVENTS_URL).then(res => res.Items.map(event => this.serializeExperience(event)));
  }

  private serializeExperience(experience: any) {
    try {
      let title;
      if (experience.Detail[this.locale] !== undefined && experience.Detail[this.locale].Title !== undefined) {
        title = experience.Detail[this.locale].Title;
      }

      let description;
      if (experience.Detail[this.locale] !== undefined && experience.Detail[this.locale].BaseText !== undefined) {
        description = experience.Detail[this.locale].BaseText;
      }

      let price;
      if (experience.Price !== undefined) {
        price = experience.Price;
      }

      const gpsPoints = experience.GpsPoints;

      const gpsPosition = gpsPoints.position;
      let startLatitude;
      let startLongitude;
      if (gpsPosition !== undefined) {
        if (gpsPosition.Latitude !== undefined) {
          startLatitude = gpsPosition.Latitude;
        }
        if (gpsPosition.Longitude !== undefined) {
          startLongitude = gpsPosition.Longitude;
        }
      }

      const gpsEndPosition = gpsPoints.endposition;
      let endLatitude;
      let endLongitude;
      if (gpsPosition !== undefined) {
        if (gpsEndPosition.Latitude !== undefined) {
          endLatitude = gpsEndPosition.Latitude;
        }
        if (gpsEndPosition.Longitude !== undefined) {
          endLongitude = gpsEndPosition.Longitude;
        }
      }

      return new Experience(title, description, price, startLatitude, startLongitude, endLatitude, endLongitude);
    } catch (e) {
      return null;
    }
  }
}
