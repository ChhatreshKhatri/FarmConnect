export interface Livestock {
  [key: string]: any;

  LivestockId: number;

  Name: string;

  Species: string;

  Age: number;

  Breed: string;

  HealthCondition?: string;

  Location: string;

  VaccinationStatus?: string;

  UserId: number;
}
