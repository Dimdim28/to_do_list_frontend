import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';

import Footer from './Footer';
import { TranslationKeys } from '../../types';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('Footer', () => {
  beforeEach(() => {
    const useTranslationSpy = useTranslation as jest.Mock;
    const tSpy = jest.fn((str) => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    });
  });

  it('renders correctly', () => {
    render(<Footer />);
    const footerElement = screen.getByText(TranslationKeys.Footer);
    expect(footerElement).toBeInTheDocument();
  });

  it('has the correct class name', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toHaveClass('footer');
  });
});
