import { CreateTaskDTO } from "../dtos/TaskDTO";

const ESTADOS_PERMITIDOS = ["Creada", "En progreso", "Bloqueada", "Finalizada", "Cancelada"];

export function validateTaskInput(data: CreateTaskDTO) {
  if (!data.titulo || !data.descripcion || !data.estado || !data.responsable) {
    throw new Error("Todos los campos son obligatorios");
  }

  if (data.titulo.length > 100) {
    throw new Error("El título no puede exceder los 100 caracteres");
  }

  if (!ESTADOS_PERMITIDOS.includes(data.estado)) {
    throw new Error(`Estado inválido. Use uno de: ${ESTADOS_PERMITIDOS.join(", ")}`);
  }
}