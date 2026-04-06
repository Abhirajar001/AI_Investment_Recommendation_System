import argparse
import sys

from sqlalchemy import text

from script_bootstrap import add_backend_to_path

add_backend_to_path()

from app.database import engine
from admin_role_utils import ensure_users_role_column


def main() -> int:
    parser = argparse.ArgumentParser(description="Promote or demote a user role.")
    parser.add_argument("email", help="User email to update")
    parser.add_argument("--role", choices=["user", "admin"], default="admin", help="Role to set")
    args = parser.parse_args()

    email = args.email.strip().lower()

    with engine.begin() as conn:
        ensure_users_role_column(conn)

        row = conn.execute(
            text("SELECT id, email, role FROM users WHERE lower(email) = :email LIMIT 1"),
            {"email": email},
        ).first()

        if not row:
            print(f"ERROR: user not found for email '{email}'")
            return 1

        conn.execute(
            text("UPDATE users SET role = :role WHERE id = :id"),
            {"role": args.role, "id": row.id},
        )

        print(f"OK: {row.email} role changed from '{(row.role or 'user')}' to '{args.role}'")
        return 0


if __name__ == "__main__":
    sys.exit(main())
