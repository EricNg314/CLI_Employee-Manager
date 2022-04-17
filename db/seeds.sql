USE employee_db;
INSERT INTO department (name) 
VALUES
  ('Finance'),
  ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Finance Manager', 110000, 1),
  ('Jr. Accountant', 45000, 1),
  ('Sales Manager', 100000, 2),
  ('Jr. Sales Associate', 40000, 2);

-- Adding Managers
INSERT INTO employee (first_name, last_name, role_id)
VALUES 
  ('Paul', 'Cézanne', 1),
  ('Pierre-Auguste', 'Renoir', 3);

-- Adding employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ('Tiger', 'Lake', 2, 1),
  ('Snow', 'Ridge', 4, 2);