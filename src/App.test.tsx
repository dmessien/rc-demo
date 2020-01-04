import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import App from './App';
import classList from './classes';

it('renders without crashing', () => {
  const { container, getByText, unmount } = render(<App />);
  expect(getByText('RookieCookie')).toBeInTheDocument();

  unmount();

  expect(container.innerHTML).toBe('');
});

it('create button opens class form', async () => {
  const { getByText } = render(<App />);
  expect(getByText('Create')).toBeInTheDocument();

  fireEvent.click(getByText('Create'));

  const sidebarTitleNode = await waitForElement(() =>
    getByText('Create class')
  );
});

it('more info button opens modal', async () => {
  const { getAllByText, getByText } = render(<App />);

  const moreInfoButtons = getAllByText('More info');
  expect(moreInfoButtons.length).toEqual(classList.length);
  const firstButtonNode = moreInfoButtons[0];

  fireEvent.click(firstButtonNode);

  const modalTitleNode = await waitForElement(() => getByText('Class info'));
});
