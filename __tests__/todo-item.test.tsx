// @ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoItem from '@/components/todo-item';


describe('TodoItem', () => {
  it(' should crosses the title if the todo is done', () => {

    const testTodo = {
      id: '1',
      title: 'Sample Todo',
      done: true,
      dueDate: new Date(), 
      content: 'demo'
    };

    render(<TodoItem todo={testTodo} />);

    const titleElement = screen.getByText('Sample Todo');
    expect(titleElement).toHaveClass('line-through');
  });
  it('should NOT crosses the title if the todo is done', () => {

    const testTodo = {
      id: '1',
      title: 'Sample Todo',
      done: false,
      dueDate: new Date(), 
      content: 'demo'
    };

    render(<TodoItem todo={testTodo} />);

    const titleElement = screen.getByText('Sample Todo');
    expect(titleElement).not.toHaveClass('line-through');
  });
});