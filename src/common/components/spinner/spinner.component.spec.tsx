import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePromiseTracker } from 'react-promise-tracker';
import { vi, describe, it, expect } from 'vitest';
import { SpinnerComponent } from './spinner.component';

// Mock de la librería react-promise-tracker
vi.mock('react-promise-tracker', () => ({
  usePromiseTracker: vi.fn(),
}));

describe('common/components/spinner/SpinnerComponent specs', () => {
  it('should not render spinner/modal when promiseInProgress is false', () => {
    // Arrange
    vi.mocked(usePromiseTracker).mockReturnValue({
      promiseInProgress: false,
    });

    // Act
    render(<SpinnerComponent />);

    // Assert
    // Al no haber promesas en curso, el modal no debe existir en el DOM
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });

  it('should render spinner/modal when promiseInProgress is true', () => {
    // Arrange
    vi.mocked(usePromiseTracker).mockReturnValue({
      promiseInProgress: true,
    });

    // Act
    render(<SpinnerComponent />);

    // Assert
    // Comprobamos que el Modal se ha montado y abierto
    const modal = screen.getByRole('presentation');
    expect(modal).toBeInTheDocument();
  });
});
