// export sync, findAllusers, findAllDepartments
const pg= require('pg');
const {Client} = pg;

const client = new Client ('postgres://localhost/acme');
client.connect();
    

const SQL= `
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS department;

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
    FOREIGN KEY (department_id) REFERENCES department(department_id)
    ON DELETE CASCADE 

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
`
const sync=async()=>{
  try{
    await client.query(SQL);
  }  catch (e) {
      console.log("error iwth sql");
      process.exit(1);
  }
}

const getAllDepartments = async()=>{
    const response = await client.query('SELECT * FROM department');
    return response.rows;
}
const getAllUsers = async()=>{
    const response = await client.query('SELECT * FROM users');
    return response.rows;
}
module.exports = {
    sync,
    getAllDepartments,
    getAllUsers
};

// module.exports = (FILE, validator) => {
//   const writeJSON = data => {
//     return new Promise((resolve, reject) => {
//       fs.writeFile(FILE, JSON.stringify(data, null, 2), err => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve();
//         }
//       });
//     });
//   };

//   const readJSON = () => {
//     return new Promise((resolve, reject) => {
//       fs.readFile(FILE, (err, data) => {
//         if (data) {
//           try {
//             resolve(JSON.parse(data.toString()));
//           } catch (ex) {
//             reject(ex);
//           }
//         } else {
//           reject(err);
//         }
//       });
//     });
//   };

//   const destroy = id => {
//     return findAll().then(items => {
//       return writeJSON(items.filter(item => item.id !== id * 1));
//     });
//   };

//   const create = item => {
//     return findAll()
//       .then(items => {
//         const error = validator(item, items);
//         if (error) {
//           throw { message: error };
//         }
//         const maxId = items.reduce((acc, items) => {
//           if (items.id > acc) {
//             acc = items.id;
//           }
//           return acc;
//         }, 0);
//         item.id = maxId + 1;
//         items.push(item);
//         return writeJSON(items);
//       })
//       .then(() => {
//         return item;
//       });
//   };
//   const findAll = () => {
//     return readJSON();
//   };
//   return {
//     findAll,
//     create,
//     destroy
//   };
// };
