export interface EventItem {

  id: number;

  title: string;

  category: string;

  venue: string;

  city: string;

  imageUrl: string;

  startDate: string;

  endDate?: string;

  price: number;

  type: string;

  isPublished: boolean;

  isUpcoming: boolean;

  isFavorite: boolean;
}
