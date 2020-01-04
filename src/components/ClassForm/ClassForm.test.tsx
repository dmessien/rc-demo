import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import ClassForm from './ClassForm';

const noop = () => {};

it('renders without crashing', () => {
  const { container, getByText, unmount } = render(
    <ClassForm onCreate={noop} onDismiss={noop} />
  );
  expect(getByText('Create class')).toBeInTheDocument();

  unmount();

  expect(container.innerHTML).toBe('');
});

it('invalid form will not submit', () => {
  const { getByText } = render(<ClassForm onCreate={noop} onDismiss={noop} />);
  expect(getByText('Submit')).toBeDisabled();
});

it('invalid title field shows error', async () => {
  const { container, getByText } = render(
    <ClassForm onCreate={noop} onDismiss={noop} />
  );
  const input = container.querySelector('input[name="title"]');
  expect(input).toBeDefined();
  if (input) {
    fireEvent.blur(input);
  }

  const errorMessageNode = await waitForElement(() =>
    getByText('Title is required')
  );
});

it('invalid instructor field shows error', async () => {
  const { container, getByText } = render(
    <ClassForm onCreate={noop} onDismiss={noop} />
  );
  const titleInput = container.querySelector('input[name="instructor"]');
  expect(titleInput).toBeDefined();
  if (titleInput) {
    fireEvent.blur(titleInput);
  }

  const errorMessageNode = await waitForElement(() =>
    getByText('Instructor is required')
  );
});

it('invalid description field shows error', async () => {
  const { container, getByText } = render(
    <ClassForm onCreate={noop} onDismiss={noop} />
  );
  const input = container.querySelector('textarea[name="description"]');
  expect(input).toBeDefined();
  if (input) {
    fireEvent.blur(input);
  }

  const errorMessageNode = await waitForElement(() =>
    getByText('Description is required')
  );
});

it('select image button opens image selector modal', async () => {
  const { getByText } = render(<ClassForm onCreate={noop} onDismiss={noop} />);
  expect(getByText('Select an image')).toBeInTheDocument();

  fireEvent.click(getByText('Select an image'));

  const modalTitleNode = await waitForElement(() =>
    getByText('Image selector')
  );
});

it('close button fires onDismiss prop', () => {
  const mockOnDismiss = jest.fn();
  const { getByText } = render(
    <ClassForm onCreate={noop} onDismiss={mockOnDismiss} />
  );
  expect(getByText('Close')).toBeInTheDocument();

  fireEvent.click(getByText('Close'));

  expect(mockOnDismiss).toHaveBeenCalled();
});
