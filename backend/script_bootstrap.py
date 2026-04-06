from pathlib import Path
import sys


def add_backend_to_path() -> None:
    backend_dir = Path(__file__).resolve().parent
    backend_path = str(backend_dir)
    if backend_path not in sys.path:
        sys.path.insert(0, backend_path)
