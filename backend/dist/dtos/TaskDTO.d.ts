export type Estado = "Creada" | "En progreso" | "Bloqueada" | "Finalizada" | "Cancelada";
export interface CreateTaskDTO {
    titulo: string;
    descripcion: string;
    estado: Estado;
    responsable: string;
}
export interface UpdateTaskDTO {
    titulo?: string;
    descripcion?: string;
    estado?: Estado;
    responsable?: string;
}
export interface TaskResponseDTO {
    id: number;
    titulo: string;
    descripcion: string;
    estado: Estado;
    responsable: string;
    fechaCreacion: Date;
}
//# sourceMappingURL=TaskDTO.d.ts.map