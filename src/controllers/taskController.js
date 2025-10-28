import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}

export async function getTaskById(req, res) {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);
    return res.status(200).json(task);
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details || ['ID must be a number'],
      });
    }

    if (error.status === 404) {
      return res.status(404).json({ error: 'Task not found' });
    }

    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
