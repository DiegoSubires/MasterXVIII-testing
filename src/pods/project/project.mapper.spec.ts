import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';

describe('pods/project/project.mapper specs', () => {
  it('should return empty project when project is null', () => {
    // Arrange
    const project = null as unknown as apiModel.Project;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return empty project when project is undefined', () => {
    // Arrange
    const project = undefined as unknown as apiModel.Project;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should map project and handle empty employees array correctly', () => {
    // Arrange
    const apiProject: apiModel.Project = {
      id: '1',
      name: 'Proyecto Test',
      externalId: 'PRJ-001',
      comments: 'Sin empleados',
      isActive: true,
      employees: [],
    };

    const expectedProject: viewModel.Project = {
      id: '1',
      name: 'Proyecto Test',
      externalId: 'PRJ-001',
      comments: 'Sin empleados',
      isActive: true,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(apiProject);

    // Assert
    expect(result).toEqual(expectedProject);
  });

  it('should map project and its employee list from API model to ViewModel', () => {
    // Arrange
    const apiProject: apiModel.Project = {
      id: '1',
      name: 'Proyecto Alpha',
      externalId: 'PRJ-002',
      comments: 'Con empleados asignados',
      isActive: true,
      employees: [
        {
          id: 'emp-1',
          isAssigned: true,
          employeeName: 'John Doe',
        },
        {
          id: 'emp-2',
          isAssigned: false,
          employeeName: 'Jane Smith',
        },
      ],
    };

    const expectedProject: viewModel.Project = {
      id: '1',
      name: 'Proyecto Alpha',
      externalId: 'PRJ-002',
      comments: 'Con empleados asignados',
      isActive: true,
      employees: [
        {
          id: 'emp-1',
          isAssigned: true,
          employeeName: 'John Doe',
        },
        {
          id: 'emp-2',
          isAssigned: false,
          employeeName: 'Jane Smith',
        },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(apiProject);

    // Assert
    expect(result).toEqual(expectedProject);
  });
});
