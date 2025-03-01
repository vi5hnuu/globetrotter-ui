import {environment} from "../../../environments/environment";

export class PlacesApi {
  static _getPaginatedPlacesInfo = `${environment.baseUrl}/places/all/info`;
  static _makeSubmission = `${environment.baseUrl}/places/submit`;
  static _score = `${environment.baseUrl}/places/score`;
  static _reset = `${environment.baseUrl}/places/reset`;
}
