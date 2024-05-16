import { z } from 'zod';

//Documento que representa las validaciones antes de enviar el formulario

const projectSchema = z.object({
  id: z.number().optional(),
  project_name: z.string().min(1, "Project name is required"),
  description: z.string().min(10, "Description should be at least 10 characters long"),
  status: z.enum(["Completed", "In progress", "Not Started"]),
});

export { projectSchema };
  