//Data object que representa una tarea, esta interfaz es
//utilizada tanto para crear/editar y plasmar la informacion de un task
export interface Task {
  task_id?: number;
  member_id?: number;
  member_name?: string;
  project_id?: number;
  task_name?: string;
  start_date?: string;
  end_date?: string;
}


// Data object que representa el conjunto de tareas de un proyecto
export interface ProjectTasks {
  project_id?: number;
  project_name?: string;
  tasks: Task[];
}
