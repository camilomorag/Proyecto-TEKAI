import React, { useEffect, useState } from "react";
import { CreateTaskInput, Estado, Task } from "../types";

const ESTADOS: Estado[] = ["Creada", "En progreso", "Bloqueada", "Finalizada", "Cancelada"];

// Lista de responsables (puedes mover esto a un archivo de configuración si lo prefieres)
const RESPONSABLES = [
  "Juan Henao", 
  "María López", 
  "Carlos Ruiz", 
  "Ana Torres",
  "Pedro Gómez",
  "Laura Martínez"
];

type Props = {
  onSubmit: (data: CreateTaskInput) => void;
  defaultValues?: Task;
  onCancel?: () => void;
};

export default function TaskForm({ onSubmit, defaultValues, onCancel }: Props) {
  const [titulo, setTitulo] = useState(defaultValues?.titulo || "");
  const [descripcion, setDescripcion] = useState(defaultValues?.descripcion || "");
  const [estado, setEstado] = useState<Estado>(defaultValues?.estado || "Creada");
  const [responsable, setResponsable] = useState(defaultValues?.responsable || RESPONSABLES[0]);
  const [nuevoResponsable, setNuevoResponsable] = useState("");

  const agregarResponsable = () => {
    if (nuevoResponsable.trim() && !RESPONSABLES.includes(nuevoResponsable)) {
      RESPONSABLES.push(nuevoResponsable);
      setResponsable(nuevoResponsable);
      setNuevoResponsable("");
    }
  };

  useEffect(() => {
    if (defaultValues) {
      setTitulo(defaultValues.titulo);
      setDescripcion(defaultValues.descripcion);
      setEstado(defaultValues.estado);
      setResponsable(defaultValues.responsable);
    }
  }, [defaultValues]);

  return (
    <form
      className="task-form"
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ titulo, descripcion, estado, responsable });
      }}
    >
      <input 
        placeholder="Título" 
        value={titulo} 
        onChange={e => setTitulo(e.target.value)} 
        required 
      />
      
      <textarea 
        placeholder="Descripción" 
        value={descripcion} 
        onChange={e => setDescripcion(e.target.value)} 
        required 
      />
      
      <div className="row">
        <select 
          value={estado} 
          onChange={e => setEstado(e.target.value as Estado)}
          className="form-select"
        >
          {ESTADOS.map(es => <option key={es} value={es}>{es}</option>)}
        </select>
        
        <select 
          value={responsable} 
          onChange={e => setResponsable(e.target.value)}
          className="form-select"
        >
          {RESPONSABLES.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Opción para agregar nuevo responsable */}
      <div className="row">
        <input
          type="text"
          placeholder="Agregar nuevo responsable"
          value={nuevoResponsable}
          onChange={(e) => setNuevoResponsable(e.target.value)}
          className="form-input"
        />
        <button 
          type="button" 
          onClick={agregarResponsable}
          className="btn-secondary"
        >
          Agregar
        </button>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {defaultValues ? "Guardar cambios" : "Crear tarea"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}