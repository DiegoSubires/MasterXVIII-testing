import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createEmptyLookup } from '#common/models';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('common/components/confirmation-dialog/useConfirmationDialog specs', () => {
  it('should return initial state correctly', () => {
    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should open dialog and set itemToDelete when onOpenDialog is called', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    const mockItem = { id: '1', name: 'Elemento a eliminar' };

    // Act
    act(() => {
      result.current.onOpenDialog(mockItem);
    });

    // Assert
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(mockItem);
  });

  it('should set isOpen to false when onClose is called', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    const mockItem = { id: '1', name: 'Elemento a eliminar' };

    // Abrimos primero el diálogo
    act(() => {
      result.current.onOpenDialog(mockItem);
    });

    // Act - Cerramos el diálogo
    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toBe(false);
  });

  it('should reset itemToDelete when onAccept is called', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    const mockItem = { id: '1', name: 'Elemento a eliminar' };

    // Abrimos el diálogo
    act(() => {
      result.current.onOpenDialog(mockItem);
    });

    // Act - Aceptamos la confirmación
    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });
});
