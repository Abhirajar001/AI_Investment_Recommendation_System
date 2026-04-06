import sys

from sqlalchemy import text

from app.database import engine
from admin_role_utils import users_table_has_role_column


def main() -> int:
    with engine.begin() as conn:
        if not users_table_has_role_column(conn):
            print("No admin users found.")
            return 0

        rows = conn.execute(
            text(
                "SELECT id, email, full_name, role "
                "FROM users "
                "WHERE lower(coalesce(role, 'user')) = 'admin' "
                "ORDER BY email ASC"
            )
        ).fetchall()

    if not rows:
        print("No admin users found.")
        return 0

    for row in rows:
        print(f"{row.email}\t{row.full_name}\t{row.role}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
