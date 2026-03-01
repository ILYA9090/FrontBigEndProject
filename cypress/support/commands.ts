import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { login } from './coommands/login';

Cypress.Commands.add('login', login);
declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>;
    }
  }
}

export {};
