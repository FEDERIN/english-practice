# English Practice MCP

Servidor MCP que lee las reglas y frases de práctica de los `.md` de la carpeta padre y genera ejercicios de completar el espacio.

## Requisitos

```
pip install "mcp[cli]"
```

## Herramientas

- `list_topics()`: temas disponibles y sus secciones.
- `get_rules(topic)`: contenido completo de las reglas de un tema (nombre del archivo sin `.md`).
- `generate_exercise(topic="")`: genera un ejercicio con un espacio en blanco. Si `topic` está vacío, elige un tema al azar. Devuelve un `id`.
- `check_answer(exercise_id, answer)`: verifica la respuesta. Si es incorrecta, muestra la correcta.

Los ejercicios salen de las secciones que contienen "Ejercicios" o "Ejemplos de práctica" en los `.md`. Para agregar ejercicios, añade frases en esas secciones.

## Probar

```
python server.py
```

## Conectar a un cliente

Ejemplo de configuración (ajusta la ruta de Python si hace falta):

```json
{
  "mcpServers": {
    "english-practice": {
      "command": "python",
      "args": ["C:\\Portafolio\\Private\\English\\mcp_practica\\server.py"]
    }
  }
}
```
