import { render, fireEvent, screen } from '@testing-library/react';

import Category from './Category';

describe('Category component', () => {
  const mockProps = {
    _id: '1',
    title: 'Category 1',
    user: 'User 1',
    color: '#ff0000',
    key: 1,
    isForTask: false,
    setCategoryEditing: jest.fn(),
    setCategoryDeleting: jest.fn(),
    setCategoryInfo: jest.fn(),
    setActiveCategories: jest.fn(),
    isActive: false,
    taskFetchingParams: {},
  };

  it('should render the category title', () => {
    render(<Category {...mockProps} />);
    const titleElement = screen.getByText('Category 1');
    expect(titleElement).toBeInTheDocument();
  });

  it('should call setActiveCategories when clicked', () => {
    render(<Category {...mockProps} />);
    const categoryElement = screen.getByTestId('category-element');
    fireEvent.click(categoryElement);
    expect(mockProps.setActiveCategories).toHaveBeenCalledTimes(1);
  });

  it('should call setCategoryEditing when pencil icon is clicked', () => {
    render(<Category {...mockProps} />);
    const pencilIcon = screen.getByTestId('pencil-icon');
    fireEvent.click(pencilIcon);
    expect(mockProps.setCategoryEditing).toHaveBeenCalledTimes(1);
  });

  it('should call setCategoryDeleting when trash icon is clicked', () => {
    render(<Category {...mockProps} />);
    const trashIcon = screen.getByTestId('trash-icon');
    fireEvent.click(trashIcon);
    expect(mockProps.setCategoryDeleting).toHaveBeenCalledTimes(1);
  });
});
