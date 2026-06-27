import { LocationAvailability }
from './location-availability';

export interface LocationSection {
  name: string;

  type: string;

  capacity: number;

  width?: number;

  length?: number;

  height?: number;

  availabilities:
    LocationAvailability[];
}