import { getDataTestId } from '../../helpers/getDataTestId/getDataTestId';

describe('роутинг', () => {
  describe('template spec', () => {
    it('Переход на main page', () => {
      cy.visit('/');
      cy.get(getDataTestId('MainPage')).should('exist');
    });
  });
  describe('пользователь не авторизован', () => {
    it('Переход на main page', () => {
      cy.visit('/');
      cy.get(getDataTestId('MainPage')).should('exist');
    });
    it('переход на профиль открывает главную', () => {
      cy.visit('/profile/1');
      cy.get('[data-testid=MainPage]').should('exist');
    });
    it('несуществующий маршрут ', () => {
      cy.visit('/hfhfhfh');
      cy.get(getDataTestId('NotFoundPage')).should('exist');
    });
  });
  describe('пользователь авторизован, переход в профиль', () => {
    beforeEach(() => {
      cy.login();
    });
    it('Переход на main page', () => {
      cy.visit('/profile/1');
      cy.get(getDataTestId('ProfilePage')).should('exist');
    });
    it('Переход на список статей', () => {
      cy.visit('/articles');
      cy.get(getDataTestId('ArticlesPage')).should('exist');
    });
  });
});
