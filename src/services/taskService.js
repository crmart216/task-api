import * as taskRepository from '../repositories/taskRepo.js';

export async function getAllTasks() {
  return taskRepository.findAll();
}

export async function createTask(newTask) {
  return taskRepository.create(newTask);
}

export async function getTaskById(id) {
  if (isNaN(id)) {
    const error = new Error('Validation failed');
    error.status = 400;
    error.details = ['ID must be a number'];
    throw error;
  }

  const task = await taskRepository.findById(Number(id));
  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    throw error;
  }

  return task;
}