import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import Category from './Category';

const mockStore = configureStore([]);

describe('Category component', () => {
  let store: any;
  beforeEach(() => {
    store = mockStore({
      home: {
        category: {
          categories: [
            {
              _id: '1',
              title: 'Category 1',
              color: '#ffffff',
            },
            {
              _id: '2',
              title: 'Category 2',
              color: '#ff0000',
            },
          ],
          status: 'success',
          currentPage: 1,
          totalPages: 1,
          error: null,
        },
      },
      profile: {
        data: null,
        status: 'loading',
        stats: [],
      },
      auth: {
        profile: null,
        status: 'loading',
        theme: 'dark',
        lang: 'en',
      },
    });
  });

  const mockProps = {
    _id: '1',
    title: 'Category 1',
    user: 'User 1',
    color: '#ff0000',
    key: 1,
    isForTask: false,
    activeCategories: [],
    setCategoryEditing: jest.fn(),
    setCategoryDeleting: jest.fn(),
    setCategoryInfo: jest.fn(),
    setActiveCategories: jest.fn(),
    isActive: false,
  };

  it('should render the category title', () => {
    render(
      <Provider store={store}>
        <Category {...mockProps} />
      </Provider>,
    );
    const titleElement = screen.getByText('Category 1');
    expect(titleElement).toBeInTheDocument();
  });

  it('should call setActiveCategories when clicked', () => {
    render(
      <Provider store={store}>
        <Category {...mockProps} />
      </Provider>,
    );
    const categoryElement = screen.getByTestId('category-element');
    fireEvent.click(categoryElement);
    expect(mockProps.setActiveCategories).toHaveBeenCalledTimes(1);
  });

  it('should call setCategoryEditing when pencil icon is clicked', () => {
    render(
      <Provider store={store}>
        <Category {...mockProps} />
      </Provider>,
    );
    const pencilIcon = screen.getByTestId('pencil-icon');
    fireEvent.click(pencilIcon);
    expect(mockProps.setCategoryEditing).toHaveBeenCalledTimes(1);
  });

  it('should call setCategoryDeleting when trash icon is clicked', () => {
    render(
      <Provider store={store}>
        <Category {...mockProps} />
      </Provider>,
    );
    const trashIcon = screen.getByTestId('trash-icon');
    fireEvent.click(trashIcon);
    expect(mockProps.setCategoryDeleting).toHaveBeenCalledTimes(1);
  });
});
