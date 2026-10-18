export interface QuoteRequest {
  fullName: string;
  email: string;
  phone: string;
  movingDate: string;
  timeSlot: 'morning' | 'afternoon';
  startZip: string;
  endZip: string;
  sizeOfMove: 'studio' | '1bed' | '2bed' | '3bed_plus';
  laborOnly: boolean;
  heavyItems: boolean;
  specialNotes?: string;
}

export interface Booking extends QuoteRequest {
  id: string;
  estimatedCost: number;
  status: 'Pending' | 'Confirmed' | 'Completed';
  createdAt: string;
}

export interface ZipDistanceMap {
  [key: string]: {
    [key: string]: number; // distance in miles
  };
}
