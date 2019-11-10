DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS users;

CREATE TABLE department(
department_id SERIAL PRIMARY KEY,
department_name VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE users
(
   user_id SERIAL PRIMARY KEY,
    user_name VARCHAR (255) UNIQUE NOT NULL,
    user_bio VARCHAR (2550),
department_id INT, 
    FOREIGN KEY (department_id) REFERENCES DEPARTMENT (department_id)

);

INSERT INTO department
    (department_name)
VALUES('Marketing');
INSERT INTO department
    (department_name)
VALUES('HR');
INSERT INTO department
    (department_name)
VALUES('Sales');
INSERT INTO department
    (department_name)
VALUES('IT');

INSERT INTO users
    (user_name, user_bio, department_id)
VALUES('Susan', 'cat lover', 1);
INSERT INTO users
    (user_name, user_bio, department_id)
VALUES('Abby', 'has a dog', 2);
INSERT INTO users
    (user_name, user_bio, department_id)
VALUES('Jim', 'too much coffee', 3);


