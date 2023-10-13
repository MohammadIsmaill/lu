import { AuthContext } from "@/app/store/auth-context";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Navbar() {
  const { logout, token } = useContext(AuthContext);
  const router = useRouter();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          Lebanese University - Course Review
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label
            onClick={() => {
              logout();
            }}
            tabIndex={0}
            className="btn btn-ghost"
          >
            Logout
          </label>
        </div>
      </div>
    </div>
  );
}
