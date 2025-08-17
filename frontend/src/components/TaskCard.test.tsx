import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskCard from './TaskCard';
import { Task } from '../types';

describe('TaskCard', () => {
  const mockTask: Task = {
    id: 1,
    titulo: 'Test Task',
    descripcion: 'Test Description',
    estado: 'Creada',
    responsable: 'Test User',
    fechaCreacion: new Date().toISOString()
  };

  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  it('renders task information correctly', () => {
    render(<TaskCard task={mockTask} onDelete={mockOnDelete} onEdit={mockOnEdit} />);
    
    expect(screen.getByText(mockTask.titulo)).toBeInTheDocument();
    expect(screen.getByText(mockTask.descripcion)).toBeInTheDocument();
    expect(screen.getByText(`👤 ${mockTask.responsable}`)).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', async () => {
    const { user } = require('@testing-library/user-event').default;
    render(<TaskCard task={mockTask} onDelete={mockOnDelete} onEdit={mockOnEdit} />);
    
    const deleteButton = screen.getByText('🗑️');
    await user.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
  });

  it('calls onEdit when edit button is clicked', async () => {
    const { user } = require('@testing-library/user-event').default;
    render(<TaskCard task={mockTask} onDelete={mockOnDelete} onEdit={mockOnEdit} />);
    
    const editButton = screen.getByText('✏️');
    await user.click(editButton);
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
  });
});