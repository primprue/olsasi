import argon2 from "argon2";

const password = "clave123";
const hash = await argon2.hash(password);

console.log(hash);


//node generaclave.mjs 
//da en consola 
//$argon2id$v=19$m=65536,t=3,p=4$In6Wd+VbeW43/pPhfAorCA$RBc8PuNFBpVtoQJCVQB07Yozh6rGy09gH7mmc2rqxeE
//copiarlo y en mysql ejecutar :
//INSERT INTO Usuarios.usuarios (usuario, password_hash)
//VALUES('pepe', '$argon2id$v=19$m=65536,t=3,p=4$In6Wd+VbeW43/pPhfAorCA$RBc8PuNFBpVtoQJCVQB07Yozh6rGy09gH7mmc2rqxeE');

