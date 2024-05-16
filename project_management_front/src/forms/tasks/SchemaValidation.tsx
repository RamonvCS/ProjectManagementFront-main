import { z } from 'zod';

//Documento que representa las validaciones antes de enviar el formulario

const taskSchema = z.object({
  task_name: z.string().min(1, { message: "Task name is required." }),
  project_id: z.number().min(1, { message: "Task name is required." }),
  member_id: z.string().min(1, { message: "Member id is required." }),
  start_date: z.string()
    .optional(),
  end_date: z.string()
    .optional()
});


export { taskSchema };