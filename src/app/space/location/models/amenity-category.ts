import { Amenity } from "./amenity";

export interface AmenityCategory {
  id: number;
  name: string;
  amenities: Amenity[];
}