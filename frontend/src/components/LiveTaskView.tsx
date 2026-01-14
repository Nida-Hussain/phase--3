import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchTasks, updateTask, deleteTask } from '../lib/api';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

interface LiveTaskViewProps {
  filter: string;
  searchQuery: string;
  refreshTrigger?: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  due_date?: string;
  priority: string;
  tags: string[];
  created_at: string;
}

export default function LiveTaskView({ filter, searchQuery, refreshTrigger }: LiveTaskViewProps) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskData, setEditingTaskData] = useState<Partial<Task>>({});

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        if (user) {
          const tasksData = await fetchTasks();
          setTasks(tasksData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [user, refreshTrigger]);

  const handleStartEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      tags: task.tags
    });
  };

  const handleSaveEdit = async (taskId: string) => {
    try {
      if (!editingTaskData.title?.trim()) {
        setError('Title is required');
        return;
      }

      await updateTask(taskId, editingTaskData);
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, ...editingTaskData } as Task : task
      ));
      setEditingTaskId(null);
      setEditingTaskData({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskData({});
  };

  const filteredTasks = tasks.filter(task => {
    // Apply search filter
    const matchesSearch = !searchQuery ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Apply status filter
    let matchesStatus = true;
    if (filter === 'Active') {
      matchesStatus = !task.completed;
    } else if (filter === 'Completed') {
      matchesStatus = task.completed;
    }

    return matchesSearch && matchesStatus;
  });

  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    try {
      const updatedTask = await updateTask(taskId, { completed: !completed });
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, completed: !completed } : task
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center py-8">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No tasks found</div>
          <p className="text-gray-500 mt-2">
            {searchQuery
              ? 'Try adjusting your search terms'
              : filter === 'Completed'
                ? 'No completed tasks yet'
                : filter === 'Active'
                  ? 'No active tasks'
                  : 'Create your first task to get started'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            editingTaskId === task.id ? (
              // Edit mode
              <div
                key={task.id}
                className={`p-4 rounded-xl border bg-white/10 border-purple-500/50 transition-all`}
              >
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editingTaskData.title || ''}
                    onChange={(e) => setEditingTaskData({...editingTaskData, title: e.target.value})}
                    className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Task title"
                  />
                  <textarea
                    value={editingTaskData.description || ''}
                    onChange={(e) => setEditingTaskData({...editingTaskData, description: e.target.value})}
                    className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Description"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <select
                      value={editingTaskData.priority || task.priority}
                      onChange={(e) => setEditingTaskData({...editingTaskData, priority: e.target.value})}
                      className="px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <input
                      type="text"
                      value={Array.isArray(editingTaskData.tags) ? editingTaskData.tags.join(', ') : (editingTaskData.tags || task.tags).join(', ')}
                      onChange={(e) => setEditingTaskData({...editingTaskData, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                      className="flex-1 px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Tags (comma separated)"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleSaveEdit(task.id)}
                      className="flex items-center gap-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FaCheck /> Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // View mode
              <div
                key={task.id}
                className={`p-4 rounded-xl border transition-all ${
                  task.completed
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-white/5 border-white/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <button
                      onClick={() => handleToggleComplete(task.id, task.completed)}
                      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${
                        task.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-400 hover:border-purple-500'
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1">
                      <h3 className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className={`text-sm mt-1 ${task.completed ? 'text-gray-500' : 'text-gray-400'}`}>
                          {task.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {task.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                        {task.due_date && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                            {new Date(task.due_date).toLocaleDateString()}
                          </span>
                        )}
                        <span className={`px-2 py-1 text-xs rounded-full border ${
                          task.priority === 'High'
                            ? 'bg-red-500/20 text-red-300 border-red-500/30'
                            : task.priority === 'Medium'
                              ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                              : 'bg-green-500/20 text-green-300 border-green-500/30'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleStartEdit(task)}
                      className="text-blue-400 hover:text-blue-300 p-1"
                      title="Edit task"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Delete task"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}