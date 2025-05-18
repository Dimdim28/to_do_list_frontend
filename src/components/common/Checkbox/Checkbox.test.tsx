import { fireEvent,render, screen } from '@testing-library/react';

import taskAPI from '../../../api/taskAPI';

import { Checkbox } from './Checkbox';

jest.mock('../../../api/taskAPI');

describe('Checkbox', () => {
  const callback = jest.fn();

  beforeEach(() => {
    taskAPI.edittask = jest.fn().mockImplementation(async () => {
      return {
        status: 'success',
        _id: 'task-123',
        isCompleted: true,
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders checkbox with label', () => {
    render(<Checkbox isChecked={false} label="Check me" />);
    const checkboxElement = screen.getByLabelText('Check me');
    expect(checkboxElement).toBeInTheDocument();
  });

  it('calls callback when checkbox is clicked', () => {
    render(<Checkbox isChecked={false} label="Check me" callback={callback} />);
    const checkboxElement = screen.getByLabelText('Check me');
    fireEvent.click(checkboxElement);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Rounded if we have prop isRounded', () => {
    render(<Checkbox isChecked={false} label="Check me" isRounded />);
    const spanElement = screen.getByTestId('checkbox-span');
    expect(spanElement).toHaveClass('roundedCheckMark');
  });

  it('Is not rounded if we have not prop isRounded', () => {
    render(<Checkbox isChecked={false} label="Check me" />);
    const spanElement = screen.getByTestId('checkbox-span');
    expect(spanElement).toHaveClass('checkmark');
  });
});
