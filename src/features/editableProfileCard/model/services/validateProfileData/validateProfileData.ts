import { Profile } from 'entities/Profile';
import { ValidateProfileError } from '../../consts/consts';

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }
  const { first, lastname, age, country, currency, username, avatar } = profile;
  const errors: ValidateProfileError[] = [];
  if (!first || !lastname || !username) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA);
  }
  if (!avatar) {
    errors.push(ValidateProfileError.INCORRECT_AVATAR);
  }

  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileError.INCORRECT_AGE);
  }
  if (!country) {
    errors.push(ValidateProfileError.INCORRECT_COUNTRY);
  }
  if (!currency) {
    errors.push(ValidateProfileError.INCORRECT_CURRENCY);
  }
  return errors;
};
