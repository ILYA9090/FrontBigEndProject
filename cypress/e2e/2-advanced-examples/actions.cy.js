/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions');
  });

  it('.type() - type into a DOM element', () => {
    cy.get('.action-email').type('fake@email.com');
    cy.get('.action-email').should('have.value', 'fake@email.com');

    cy.get('.action-email').type('{leftarrow}{rightarrow}{uparrow}{downarrow}');
    cy.get('.action-email').type('{del}{selectall}{backspace}');

    cy.get('.action-email').type('{alt}{option}');
    cy.get('.action-email').type('{ctrl}{control}');
    cy.get('.action-email').type('{meta}{command}{cmd}');
    cy.get('.action-email').type('{shift}');

    cy.get('.action-email').type('slow.typing@email.com', { delay: 100 });
    cy.get('.action-email').should('have.value', 'slow.typing@email.com');

    cy.get('.action-disabled').type('disabled error checking', { force: true });
    cy.get('.action-disabled').should('have.value', 'disabled error checking');
  });

  it('.focus() - focus on a DOM element', () => {
    cy.get('.action-focus').focus();
    cy.get('.action-focus')
      .should('have.class', 'focus')
      .prev()
      .should('have.attr', 'style', 'color: orange;');
  });

  it('.blur() - blur off a DOM element', () => {
    cy.get('.action-blur').type('About to blur');
    cy.get('.action-blur').blur();
    cy.get('.action-blur')
      .should('have.class', 'error')
      .prev()
      .should('have.attr', 'style', 'color: red;');
  });

  it('.clear() - clears an input or textarea element', () => {
    cy.get('.action-clear').type('Clear this text');
    cy.get('.action-clear').should('have.value', 'Clear this text');
    cy.get('.action-clear').clear();
    cy.get('.action-clear').should('have.value', '');
  });

  it('.submit() - submit a form', () => {
    cy.get('.action-form').find('[type="text"]').type('HALFOFF');

    cy.get('.action-form').submit();
    cy.get('.action-form')
      .next()
      .should('contain', 'Your form has been submitted!');
  });

  it('.click() - click on a DOM element', () => {
    cy.get('.action-btn').click();

    cy.get('#action-canvas').click();

    cy.get('#action-canvas').click('topLeft');
    cy.get('#action-canvas').click('top');
    cy.get('#action-canvas').click('topRight');
    cy.get('#action-canvas').click('left');
    cy.get('#action-canvas').click('right');
    cy.get('#action-canvas').click('bottomLeft');
    cy.get('#action-canvas').click('bottom');
    cy.get('#action-canvas').click('bottomRight');

    cy.get('#action-canvas');
    cy.get('#action-canvas').click(80, 75);
    cy.get('#action-canvas').click(170, 75);
    cy.get('#action-canvas').click(80, 165);
    cy.get('#action-canvas').click(100, 185);
    cy.get('#action-canvas').click(125, 190);
    cy.get('#action-canvas').click(150, 185);
    cy.get('#action-canvas').click(170, 165);

    cy.get('.action-labels>.label').click({ multiple: true });

    cy.get('.action-opacity>.btn').click({ force: true });
  });

  it('.dblclick() - double click on a DOM element', () => {
    cy.get('.action-div').dblclick();
    cy.get('.action-div').should('not.be.visible');
    cy.get('.action-input-hidden').should('be.visible');
  });

  it('.rightclick() - right click on a DOM element', () => {
    cy.get('.rightclick-action-div').rightclick();
    cy.get('.rightclick-action-div').should('not.be.visible');
    cy.get('.rightclick-action-input-hidden').should('be.visible');
  });

  it('.check() - check a checkbox or radio element', () => {
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check();
    cy.get('.action-checkboxes [type="checkbox"]')
      .not('[disabled]')
      .should('be.checked');

    cy.get('.action-radios [type="radio"]').not('[disabled]').check();
    cy.get('.action-radios [type="radio"]')
      .not('[disabled]')
      .should('be.checked');

    cy.get('.action-radios [type="radio"]').check('radio1');
    cy.get('.action-radios [type="radio"]').should('be.checked');

    cy.get('.action-multiple-checkboxes [type="checkbox"]').check([
      'checkbox1',
      'checkbox2',
    ]);
    cy.get('.action-multiple-checkboxes [type="checkbox"]').should(
      'be.checked'
    );

    cy.get('.action-checkboxes [disabled]').check({ force: true });
    cy.get('.action-checkboxes [disabled]').should('be.checked');

    cy.get('.action-radios [type="radio"]').check('radio3', { force: true });
    cy.get('.action-radios [type="radio"]').should('be.checked');
  });

  it('.uncheck() - uncheck a checkbox element', () => {
    cy.get('.action-check [type="checkbox"]').not('[disabled]').uncheck();
    cy.get('.action-check [type="checkbox"]')
      .not('[disabled]')
      .should('not.be.checked');

    cy.get('.action-check [type="checkbox"]').check('checkbox1');
    cy.get('.action-check [type="checkbox"]').uncheck('checkbox1');
    cy.get('.action-check [type="checkbox"][value="checkbox1"]').should(
      'not.be.checked'
    );

    cy.get('.action-check [type="checkbox"]').check(['checkbox1', 'checkbox3']);
    cy.get('.action-check [type="checkbox"]').uncheck([
      'checkbox1',
      'checkbox3',
    ]);
    cy.get('.action-check [type="checkbox"][value="checkbox1"]').should(
      'not.be.checked'
    );
    cy.get('.action-check [type="checkbox"][value="checkbox3"]').should(
      'not.be.checked'
    );

    cy.get('.action-check [disabled]').uncheck({ force: true });
    cy.get('.action-check [disabled]').should('not.be.checked');
  });

  it('.select() - select an option in a <select> element', () => {
    cy.get('.action-select').should('have.value', '--Select a fruit--');

    cy.get('.action-select').select('apples');
    cy.get('.action-select').should('have.value', 'fr-apples');

    cy.get('.action-select-multiple').select(['apples', 'oranges', 'bananas']);
    cy.get('.action-select-multiple')
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas']);

    cy.get('.action-select').select('fr-bananas');
    cy.get('.action-select').should('have.value', 'fr-bananas');

    cy.get('.action-select-multiple').select([
      'fr-apples',
      'fr-oranges',
      'fr-bananas',
    ]);
    cy.get('.action-select-multiple')
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas']);

    cy.get('.action-select-multiple')
      .invoke('val')
      .should('include', 'fr-oranges');
  });

  it('.scrollIntoView() - scroll an element into view', () => {
    cy.get('#scroll-horizontal button').should('not.be.visible');

    cy.get('#scroll-horizontal button').scrollIntoView();
    cy.get('#scroll-horizontal button').should('be.visible');

    cy.get('#scroll-vertical button').should('not.be.visible');

    cy.get('#scroll-vertical button').scrollIntoView();
    cy.get('#scroll-vertical button').should('be.visible');

    cy.get('#scroll-both button').should('not.be.visible');

    cy.get('#scroll-both button').scrollIntoView();
    cy.get('#scroll-both button').should('be.visible');
  });

  it('.trigger() - trigger an event on a DOM element', () => {
    cy.get('.trigger-input-range').invoke('val', 25);
    cy.get('.trigger-input-range').trigger('change');
    cy.get('.trigger-input-range')
      .get('input[type=range]')
      .siblings('p')
      .should('have.text', '25');
  });

  it('cy.scrollTo() - scroll the window or element to a position', () => {
    cy.scrollTo('bottom');

    cy.get('#scrollable-horizontal').scrollTo('right');

    cy.get('#scrollable-vertical').scrollTo(250, 250);

    cy.get('#scrollable-both').scrollTo('75%', '25%');
    cy.get('#scrollable-vertical').scrollTo('center', { easing: 'linear' });

    cy.get('#scrollable-both').scrollTo('center', { duration: 2000 });
  });
});
