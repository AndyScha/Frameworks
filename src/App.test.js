import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent, getByTestId } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders the initial UI correctly', () => {
    const { getByText, getByTestId, queryByRole } = render(<App />);

    expect(getByText('To-Do List')).toBeInTheDocument();
    expect(getByTestId('4')).toBeInTheDocument();
    expect(queryByRole('list')).toBeInTheDocument();
    expect(queryByRole('list')).toBeEmptyDOMElement();
    expect(getByText('Add Task')).toBeInTheDocument();
  });

  test('adds a task correctly', () => {
    const { getByTestId, getByText, getByRole } = render(<App />);

    const inputField = getByTestId('4');
    const addButton = getByText('Add Task');

    fireEvent.change(inputField, { target: { value: 'Task 1' } });
    fireEvent.click(addButton);

    expect(getByRole('list')).toBeInTheDocument();
    expect(getByText('Task 1')).toBeInTheDocument();
    expect(inputField.value).toBe('');
  });

  test('deletes a task correctly', () => {
    const { getByTestId, getByText, queryAllByRole, queryByText } = render(<App />);
  
    const inputField = getByTestId('4');
    const addButton = getByText('Add Task');
  
    fireEvent.change(inputField, { target: { value: 'Task 1' } });
    fireEvent.click(addButton);
    fireEvent.change(inputField, { target: { value: 'Task 2' } });
    fireEvent.click(addButton);
  
    const deleteButtons = queryAllByRole('button', { name: 'Delete' });
  
    fireEvent.click(deleteButtons[1]); // Delete the second task
  
    expect(queryByText('Task 2')).not.toBeInTheDocument();
    expect(getByText('Task 1')).toBeInTheDocument();
  });
  
test('validates and prevents empty task addition', () => {
    const { getByTestId, getByText, queryByRole } = render(<App />);

    const inputField = getByTestId('4');
    const addButton = getByText('Add Task');

    fireEvent.change(inputField, { target: { value: '   ' } });
    fireEvent.click(addButton);

    expect(queryByRole('list')).toBeInTheDocument();
    expect(queryByRole('list')).toBeEmptyDOMElement();
    expect(inputField.value).toBe('   ');
  });

  test('performs multiple additions and deletions correctly', () => {
    const { getByTestId, getByText, getByRole, getAllByRole, queryByText } = render(<App />);
  
    const inputField = getByTestId('4');
    const addButton = getByText('Add Task');
  
    fireEvent.change(inputField, { target: { value: 'Task 1' } });
    fireEvent.click(addButton);
    fireEvent.change(inputField, { target: { value: 'Task 2' } });
    fireEvent.click(addButton);
    fireEvent.change(inputField, { target: { value: 'Task 3' } });
    fireEvent.click(addButton);
  
    expect(getByRole('list')).toBeInTheDocument();
    expect(getByText('Task 1')).toBeInTheDocument();
    expect(getByText('Task 2')).toBeInTheDocument();
    expect(getByText('Task 3')).toBeInTheDocument();
  
    const deleteButtons = getAllByRole('button', { name: 'Delete' });
  
    fireEvent.click(deleteButtons[0]); // Delete the first task
  
    expect(queryByText('Task 1')).not.toBeInTheDocument();
    expect(getByText('Task 2')).toBeInTheDocument();
    expect(getByText('Task 3')).toBeInTheDocument();
  
    fireEvent.click(deleteButtons[0]); // Delete the second task
  
    expect(queryByText('Task 2')).not.toBeInTheDocument();
    expect(getByText('Task 3')).toBeInTheDocument();
  
    fireEvent.click(deleteButtons[0]); // Delete the remaining task
  
    expect(queryByText('Task 3')).not.toBeInTheDocument();
  });
  
});