import { Currency, Country } from 'shared/const/common';

export interface Profile {
  first: string;
  lastname: string;
  age: 24;
  currency: Currency;
  country: Country;
  city: string;
  username: string;
  avatar: string;
}

export interface ProfileSchema {
  data?: Profile;
  isLoading: boolean;
  error?: boolean;
  readonly: boolean;
}
