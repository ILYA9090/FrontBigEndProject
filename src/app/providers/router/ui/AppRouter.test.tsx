import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { UserRole } from 'entities/User';
import AppRouter from './AppRouter';

describe('app/router/AppRouter', () => {
  test('this page will be render', async () => {
    componentRender(<AppRouter />, {
      route: '/about',
    });
    const page = await screen.findByTestId('AboutPage');
    expect(page).toBeInTheDocument();
  });
  test('this page notFound', async () => {
    componentRender(<AppRouter />, {
      route: '/*',
    });
    const page = await screen.findByTestId('NotFoundPage');
    expect(page).toBeInTheDocument();
  });
  test('this is forbidden page', async () => {
    componentRender(<AppRouter />, {
      route: '/profile/1',
    });
    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });
  test('user auth only page', async () => {
    componentRender(<AppRouter />, {
      route: '/profile/1',
      initialState: { user: { authData: {} } },
    });
    const page = await screen.findByTestId('ProfilePage');
    expect(page).toBeInTheDocument();
  });
  test('user auth only page, but user no auth', async () => {
    componentRender(<AppRouter />, {
      route: '/profile/1',
    });
    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });
  test('user role != Admin', async () => {
    componentRender(<AppRouter />, {
      route: '/admin',
      initialState: { user: { authData: { roles: [] } } },
    });
    const page = await screen.findByTestId('ForbiddenPage');
    expect(page).toBeInTheDocument();
  });
  test('user role = Admin', async () => {
    componentRender(<AppRouter />, {
      route: '/admin',
      initialState: { user: { authData: { roles: [UserRole.ADMIN] } } },
    });
    const page = await screen.findByTestId('AdminPanelPage');
    expect(page).toBeInTheDocument();
  });
});
