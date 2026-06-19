from __future__ import annotations

import socket
import sys
import threading
import time
import webbrowser
from pathlib import Path

from app import app, execute_schema


def resource_dir() -> Path:
    """兼容普通运行和 PyInstaller 打包后的运行目录。"""
    if getattr(sys, "frozen", False):
        return Path(sys.executable).resolve().parent
    return Path(__file__).resolve().parent


def find_free_port(start_port: int = 8876) -> int:
    for port in range(start_port, start_port + 100):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            if sock.connect_ex(("127.0.0.1", port)) != 0:
                return port
    return start_port


def open_browser_later(port: int) -> None:
    time.sleep(1.2)
    webbrowser.open(f"http://127.0.0.1:{port}")


if __name__ == "__main__":
    execute_schema()
    port = find_free_port()
    threading.Thread(target=open_browser_later, args=(port,), daemon=True).start()
    app.run(host="127.0.0.1", port=port, debug=False)
