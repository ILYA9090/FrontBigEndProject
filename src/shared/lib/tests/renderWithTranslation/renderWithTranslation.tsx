import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18nForTest from '../../../config/i18n/i18nForTests';

export function renderWithTranslation(component: ReactNode) {
  return render(<I18nextProvider i18n={i18nForTest}>{component}</I18nextProvider>);
}
