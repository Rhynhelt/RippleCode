export interface Task {
  id?: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'InProgress' | 'Done';
  createdAt?: Date;
  updatedAt?: Date;
} 