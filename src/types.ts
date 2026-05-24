/**
 * Types and interfaces for Mega Moving Chicago
 */

export interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  movingDate: string;
  movingTime: string;
  fromAddress: string;
  toAddress: string;
  homeSize: HomeSizeKey;
  estimatedHours: number;
  totalCost: number;
  extraMoversCount: number; // premium extra movers
  truckIncluded: boolean;
  status: 'Inquiry' | 'Confirmed' | 'Completed';
  notes?: string;
  createdAt: string;
}

export type HomeSizeKey = 'studio' | '1bed' | '2bed' | '3bed' | 'office' | 'custom';

export interface HomeSizeConfig {
  label: string;
  baseHours: number;
  description: string;
  moversCount: number; // default movers
}

export const HOME_SIZES: Record<HomeSizeKey, HomeSizeConfig> = {
  studio: {
    label: 'Studio Apartment',
    baseHours: 3,
    description: 'Perfect for small flat, includes 2 movers',
    moversCount: 2,
  },
  '1bed': {
    label: '1 Bedroom Home/Apt',
    baseHours: 4,
    description: 'Ideal for typical 1 bedroom spaces, includes 2 movers',
    moversCount: 2,
  },
  '2bed': {
    label: '2 Bedroom Home/Apt',
    baseHours: 5,
    description: 'Requires planning, includes 2 movers & rapid packing',
    moversCount: 2,
  },
  '3bed': {
    label: '3+ Bedroom Home',
    baseHours: 7,
    description: 'Large inventory, includes 2 movers (recommend adding extra)',
    moversCount: 2,
  },
  office: {
    label: 'Office Workspace',
    baseHours: 4,
    description: 'Desk setups, files and chairs, includes 2 movers',
    moversCount: 2,
  },
  custom: {
    label: 'Single Items / Small Pickups',
    baseHours: 3, // minimum 3 hours still applies
    description: 'A few large items or courier load, includes 2 movers',
    moversCount: 2,
  },
};

export const PRICING = {
  baseHourlyRate: 150, // includes 2 movers + 16-ft box truck
  minHours: 3,
  additionalMoverRate: 50, // extra $50/hr per additional mover
};
