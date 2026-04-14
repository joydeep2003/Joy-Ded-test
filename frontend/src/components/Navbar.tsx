import { logout } from "../auth/auth";

export default function Navbar() {
  return (
    <div style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
      <button onClick={() => {
        logout();
        window.location.href = "/login";
      }}>
        Logout
      </button>
    </div>
  );
}