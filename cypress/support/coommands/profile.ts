// import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
// import { User } from 'entities/User/index';
// import { getDataTestId } from '../../helpers/getDataTestId/getDataTestId';
// export const resetProfile = (testId: string) => {
//   return cy
//     .request({
//       method: 'POST',
//       url: 'http://localhost:8000/login',
//       body: {
//         username,
//         password,
//       },
//     })
//     .then(({ body }) => {
//       window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
//       return body;
//     });
// };

// export const getByTestId = (testId: string) => {
//   cy.get(getDataTestId(testId));
// };

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email?: string, password?: string): Chainable<User>;
//       getByTestId(testId: string): ReturnType<typeof cy.get>;
//     }
//   }
// }
