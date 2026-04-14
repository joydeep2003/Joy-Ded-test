INSERT INTO users (id, name, email, password, created_at)
VALUES (
  gen_random_uuid(),
  'Test User',
  'test@example.com',
  '$2b$12$KIXQp0examplehashedpassword',
  NOW()
);

INSERT INTO projects (id, name, description, owner_id, created_at)
VALUES (
  gen_random_uuid(),
  'Sample Project',
  'Test project',
  (SELECT id FROM users LIMIT 1),
  NOW()
);

INSERT INTO tasks (id, title, status, priority, project_id, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Task 1', 'todo', 'low', (SELECT id FROM projects LIMIT 1), NOW(), NOW()),
(gen_random_uuid(), 'Task 2', 'in_progress', 'medium', (SELECT id FROM projects LIMIT 1), NOW(), NOW()),
(gen_random_uuid(), 'Task 3', 'done', 'high', (SELECT id FROM projects LIMIT 1), NOW(), NOW());