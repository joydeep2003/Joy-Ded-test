import { logout } from "../auth/auth";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      className="topbar glass-card"
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <h1>TaskFlow Workspace</h1>
      <button
        className="secondary-btn"
        onClick={() => {
          logout();
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </motion.header>
  );
}