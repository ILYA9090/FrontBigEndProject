describe('пользователь заходить на страницу профиля', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login().then((data) => {
      cy.visit(`/profile/${data.id}`);
    });
  });
  it('профиль загрузился успешно', () => {
    cy.getByTestId('ProfilePage');
  });
});
