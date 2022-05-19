import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('The "Search Movies" is once in the Document', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search Movies/i);
  expect(linkElement).toBeInTheDocument();
});

test('No progressbar in the document', () => {
  render(<App />);
  const loadingProgress = screen.queryByRole('progressbar');
  expect(loadingProgress).not.toBeInTheDocument();
});

test('After filling in the input field and pressing Enter, the progressbar appears on the Document', () => {
  render(<App />);
  const searchInputElement = screen.getByLabelText(/Search Movies/i);
  searchInputElement.value = 'Fighter';
  fireEvent.keyDown(searchInputElement, { key: 'Enter', code: 13, charCode: 13, keyCode: 13 });
  const loadingProgress = screen.queryByRole('progressbar');
  expect(loadingProgress).toBeInTheDocument();
});

test('After filling in the input field and click Search button, the progressbar appears on the Document', () => {
  render(<App />);
  const searchInputElement = screen.getByLabelText(/Search Movies/i);
  searchInputElement.value = 'Fighter';
  const searchButtonElement = screen.getByText("Search");
  fireEvent.click(searchButtonElement);
  const loadingProgress = screen.queryByRole('progressbar');
  expect(loadingProgress).toBeInTheDocument();
});


