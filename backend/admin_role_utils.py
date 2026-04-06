from sqlalchemy import inspect, text


def users_table_has_role_column(conn) -> bool:
    inspector = inspect(conn)
    if not inspector.has_table("users"):
        return False

    return any(column["name"] == "role" for column in inspector.get_columns("users"))


def ensure_users_role_column(conn) -> None:
    if users_table_has_role_column(conn):
        return

    conn.execute(text("ALTER TABLE users ADD COLUMN role VARCHAR NOT NULL DEFAULT 'user'"))
