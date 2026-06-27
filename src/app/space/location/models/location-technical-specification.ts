export interface LocationTechnicalSpecification {

  floorPlanUrl?: string;

  width?: number;
  length?: number;
  height?: number;

  stageWidth?: number;
  stageLength?: number;
  stageHeight?: number;

  maxCapacity?: number;
  partialCapacity?: number;

  accessibility?: string;

  musicRestriction: boolean;

  requiredLegalPermits?: string;

  customConfiguration?: string;
}