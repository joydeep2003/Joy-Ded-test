import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Landing() {
  return (
    <main className="landing-page">
      <div className="landing-glow landing-glow-left" />
      <div className="landing-glow landing-glow-right" />

      <section className="landing-shell">
        <motion.span
          className="brand-chip"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
        >
          Smart workflow platform
        </motion.span>

        <motion.h1
          className="landing-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
        >
          Plan your tasks
        </motion.h1>

        <motion.p
          className="landing-subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.24, ease }}
        >
          Organize projects, track progress, and ship faster with a clean dashboard
          built for focused teams.
        </motion.p>

        <motion.div
          className="landing-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.34, ease }}
        >
          <Link to="/login" className="primary-btn cta-btn">
            Get started
          </Link>
          <Link to="/register" className="secondary-btn cta-outline">
            Create account
          </Link>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.42, ease }}
        >
          <article className="stat-card">
            <strong>Realtime view</strong>
            <p>Track projects and tasks from one place.</p>
          </article>
          <article className="stat-card">
            <strong>Fast execution</strong>
            <p>Create tasks and update progress in seconds.</p>
          </article>
          <article className="stat-card">
            <strong>Modern UI</strong>
            <p>Smooth interactions with clean visual hierarchy.</p>
          </article>
        </motion.div>
      </section>
    </main>
  );
}
