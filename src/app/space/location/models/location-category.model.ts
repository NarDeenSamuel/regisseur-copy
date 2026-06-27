export interface LocationCategory {

  id: number;

  name: string;

  parentCategoryId?: number | null;

  parentCategory?: LocationCategory | null;

  children: LocationCategory[];

  isActive: boolean;

}