import random
import re
import uuid
from pathlib import Path

from mcp.server.mcpserver import MCPServer

CONTENT_DIR = Path(__file__).resolve().parent.parent
SKIP_FILES = {"AGENTS.md", "reglas_ingles.md"}
BLANK_WORDS = {
    "am", "is", "are", "was", "were",
    "can", "could", "should", "must", "may", "shall", "might", "would", "will",
    "do", "does",
}
SECTION_HINTS = ("ejercicios", "ejemplos de práctica")

exercises: dict[str, dict] = {}
server = MCPServer(
    "english-practice",
    instructions="Practica inglés con las reglas y ejercicios de los archivos .md del repositorio.",
)


def topic_files() -> dict[str, Path]:
    return {
        p.stem: p
        for p in sorted(CONTENT_DIR.glob("*.md"))
        if p.name not in SKIP_FILES
    }


def practice_sentences(path: Path) -> list[str]:
    sentences = []
    in_section = False
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("## "):
            in_section = any(h in line.lower() for h in SECTION_HINTS)
            continue
        if not in_section or not line.lstrip().startswith("- "):
            continue
        text = line.lstrip()[2:].strip()
        for part in text.split(" / "):
            part = part.strip().rstrip(".!?")
            if part and re.search(r"[A-Za-z]", part):
                sentences.append(part)
    return sentences


@server.tool()
def list_topics() -> list[dict]:
    """Lista los temas disponibles con sus secciones principales."""
    topics = []
    for name, path in topic_files().items():
        sections = [
            line[3:].strip()
            for line in path.read_text(encoding="utf-8").splitlines()
            if line.startswith("## ")
        ]
        topics.append({"topic": name, "sections": sections})
    return topics


@server.tool()
def get_rules(topic: str) -> str:
    """Devuelve el contenido completo de las reglas de un tema (nombre del archivo sin .md)."""
    files = topic_files()
    if topic not in files:
        return f"Tema no encontrado. Temas disponibles: {', '.join(files)}"
    return files[topic].read_text(encoding="utf-8")


@server.tool()
def generate_exercise(topic: str = "") -> dict:
    """Genera un ejercicio de completar el espacio a partir de las frases de práctica de un tema.
    Si topic está vacío, elige un tema al azar. Devuelve un id para usar en check_answer."""
    files = topic_files()
    candidates = []
    for name in ([topic] if topic else list(files)):
        if name not in files:
            return {"error": f"Tema no encontrado: {name}"}
        for sentence in practice_sentences(files[name]):
            words = sentence.split()
            for i, w in enumerate(words):
                if w.lower() in BLANK_WORDS:
                    candidates.append((name, sentence, i))
                    break
    if not candidates:
        return {"error": "No hay frases de práctica para generar ejercicios en ese tema."}

    name, sentence, index = random.choice(candidates)
    words = sentence.split()
    answer = words[index]
    words[index] = "____"
    exercise_id = uuid.uuid4().hex[:8]
    exercises[exercise_id] = {"answer": answer.lower(), "sentence": sentence}
    return {
        "id": exercise_id,
        "topic": name,
        "prompt": " ".join(words) + ".",
        "hint": f"Escribe la palabra que falta en el espacio ({name}).",
    }


@server.tool()
def check_answer(exercise_id: str, answer: str) -> dict:
    """Verifica la respuesta a un ejercicio generado con generate_exercise."""
    exercise = exercises.get(exercise_id)
    if exercise is None:
        return {"error": "Ejercicio no encontrado. Genera uno nuevo."}
    correct = answer.strip().lower() == exercise["answer"]
    result = {
        "correct": correct,
        "sentence": exercise["sentence"] + ".",
    }
    if not correct:
        result["expected"] = exercise["answer"]
    del exercises[exercise_id]
    return result


if __name__ == "__main__":
    server.run()
