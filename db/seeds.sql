USE employee_db;
INSERT INTO department (name) 
VALUES
  ('Council'),
  ('Finance'),
  ('Sales'),
  ('Research');

INSERT INTO role (title, salary, department_id)
VALUES
  ('President', 1000000000, 1),
  ('Finance Manager', 110000, 2),
  ('Jr. Accountant', 45000, 2),
  ('Sales Manager', 100000, 3),
  ('Jr. Sales Associate', 40000, 3),
  ('Inventor', 1000000, 4);

-- Adding Managers
INSERT INTO employee (first_name, last_name, role_id)
VALUES 
  ('Paul', 'Cézanne', 2),
  ('Pierre-Auguste', 'Renoir', 4),
  ('Morty', '304-X', 1),
  ('Rick', 'C-137', 5);

-- Adding employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ('Tiger', 'Lake', 3, 1),
  ('Snow', 'Ridge', 5, 2);