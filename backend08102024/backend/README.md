---
name: Readme
menu: Backend
route: backend/README.md
---

# informacion Referente al backend(completar...)

stock-back
By. RMC
Agregado desde el documento original readme.md

# DOCKER

### Run Container in detached mode

```
 docker-compose up -d
```

### Enter the container

```
docker ps

docker exec -it <container id> /bin/sh
```

### Rebuilding Image if something needs to be changed

```
docker-compose build
```

or

```
docker-compose up --build
```

### Npm packages Post installation

`docker-compose run \<named-service> \<command>`

`` \<named-service>: Use container name used inside `docker-compose.yml` inside `service` section ``

`docker-compose run backend yarn add gulp-nodemon`
