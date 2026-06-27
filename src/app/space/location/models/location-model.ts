import { LocationAmenity } from "./location-amenity";
import { LocationAvailability } from "./location-availability";
import { LocationClassification } from "./location-classification";
import { LocationCompliance } from "./location-compliance";
import { LocationFoodAndBeverage } from "./location-food-and-beverage";
import { LocationHouseRules } from "./location-house-rules";
import { LocationMedia } from "./location-media";
import { LocationOperationalInfo } from "./location-operational-info";
import { LocationPhysicalInfo } from "./location-physical-info";
import { LocationPolicy } from "./location-policy";
import { LocationSection } from "./location-section";
import { LocationTechnicalSpecification } from "./location-technical-specification";
import { LocationWorkingHour } from "./location-working-hour";
import { LocationUsageType }
from "./location-usage-type";
export interface LocationModel {
  id?: number;

  name: string;
  description?: string;

  imageUrl?: string;

  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;

  building?: string;
  floor?: string;
  unit?: string;
  neighborhood?: string;

  phone?: string;
  website?: string;
email?: string;
  locationCategoryId: number;

  pricePerHour: number;
usageTypes: LocationUsageType[];
  amenities: LocationAmenity[];
  workingHours: LocationWorkingHour[];
  media: LocationMedia[];
  sections: LocationSection[];

  technicalSpecification?: LocationTechnicalSpecification;
  foodAndBeverage?: LocationFoodAndBeverage;
  classification?: LocationClassification;
  compliance?: LocationCompliance;
  physicalInfo?: LocationPhysicalInfo;
  operationalInfo?: LocationOperationalInfo;
  policy?: LocationPolicy;
  houseRules?: LocationHouseRules;

  locationStatus?: string;

locationVerificationState?: boolean;

emailVerified?: boolean;

approvalStatus?: string;

approvalNotes?: string;

approvedAt?: string;

approvedByAccountId?: number;
}