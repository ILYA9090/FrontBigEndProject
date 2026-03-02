describe('пользователь заходить на страницу статей', () => {
  beforeEach(() => {
    cy.visit('');
  });
  it('статьи открылись и подгрузились', () => {
    cy.login();
    cy.visit('/articles');
    cy.getByTestId('ArticlesPage');
  });
  it('пользователь заходить на страницу статей без авторизации', () => {
    cy.getByTestId('MainPage');
  });
});
