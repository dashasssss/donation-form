export const DONOR_TYPES = {
  PERSON: 'person',
  COMPANY: 'company',
} as const;

export type DonorType = typeof DONOR_TYPES[keyof typeof DONOR_TYPES];
