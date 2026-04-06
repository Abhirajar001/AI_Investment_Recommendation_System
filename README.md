
  # UX User Flow Diagram (Community)

  This is a code bundle for UX User Flow Diagram (Community). The original project is available at https://www.figma.com/design/gkR1DNW2dZmeFoMlg7GxUs/UX-User-Flow-Diagram--Community-.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Smoke test (one command)

  Run `npm run smoke:test` to automatically:
  - start the backend on `http://127.0.0.1:8001`
  - start the frontend on `http://127.0.0.1:5173`
  - check backend `/` and `/openapi.json`
  - check frontend `/`
  - stop both servers after the checks

  ## Repo hygiene check

  Run `npm run check:bytecode` to verify no Python cache artifacts are tracked in git
  (for example `__pycache__/` or `*.pyc` files).

  ## Admin bootstrap (fast)

  Promote a user to admin role:

  - `cd backend`
  - `.\venv\Scripts\python.exe .\promote_admin.py user@example.com --role admin`

  Demote back to standard user:

  - `.\venv\Scripts\python.exe .\promote_admin.py user@example.com --role user`

  List current admin users:

  - `.\venv\Scripts\python.exe .\list_admins.py`
  