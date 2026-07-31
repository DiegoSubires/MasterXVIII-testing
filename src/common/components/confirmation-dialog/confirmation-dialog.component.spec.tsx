import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { vi, describe, it, expect } from 'vitest';

describe('common/components/confirmation-dialog/ConfirmationDialogComponent', () => {
  it('should not render the dialog content when isOpen is false', () => {
    // Arrange
    const props = {
      isOpen: false,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'Título de Prueba',
      labels: {
        closeButton: 'Cancelar',
        acceptButton: 'Aceptar',
      },
      children: '¿Estás seguro de realizar esta acción?',
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.queryByText('Título de Prueba')).not.toBeInTheDocument();
  });

  it('should render title, children content, and buttons when isOpen is true', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'Título de Prueba',
      labels: {
        closeButton: 'Cancelar',
        acceptButton: 'Aceptar',
      },
      children: '¿Estás seguro de realizar esta acción?',
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.getByText('Título de Prueba')).toBeInTheDocument();
    expect(
      screen.getByText('¿Estás seguro de realizar esta acción?')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Cancelar' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Aceptar' })).toBeInTheDocument();
  });

  it('should call onClose when clicking on the close button', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'Título de Prueba',
      labels: {
        closeButton: 'Cancelar',
        acceptButton: 'Aceptar',
      },
      children: 'Contenido del diálogo',
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const closeButton = screen.getByRole('button', { name: 'Cancelar' });
    fireEvent.click(closeButton);

    // Assert
    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.onAccept).not.toHaveBeenCalled();
  });

  it('should call onAccept and onClose when clicking on the accept button', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'Título de Prueba',
      labels: {
        closeButton: 'Cancelar',
        acceptButton: 'Aceptar',
      },
      children: 'Contenido del diálogo',
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const acceptButton = screen.getByRole('button', { name: 'Aceptar' });
    fireEvent.click(acceptButton);

    // Assert
    expect(props.onAccept).toHaveBeenCalledTimes(1);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
