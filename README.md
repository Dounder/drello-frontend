# Vue Quasar Template

Template using Quasar framework with docker

<div align="center"><img src="https://res.cloudinary.com/dj6nxwrae/image/upload/v1651285442/Dcode/dcode_dark_haksfw.svg" alt="Douglas Ramirez Logo" height="180" /></div>

## Development

1. Clone repository & Install dependencies

```bash
yarn
# or
npm install
```

2. Rename `.env.template` to `.env` and set base api url

```bash
# EXAMPLE
API_URL=https://api.example.com/api/v1
```

3. Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
docker compose up
# or detached
docker compose up -d
```

- To stop container run this...

```bash
docker compose down
# with volumes
docker compose down -v
```

---

## Production

1. Build image

```bash
docker build -t <tagname>:latest .
# or
docker build -t <tagname>:<tagversion> .
```

2. Run image in production container

```bash
docker run -it -p 9000:9000 --rm <tagname>:<tagversion>
```

---

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

---

### Technologies

<p align="center" style="display: flex; justify-content: center; align-items:flex-end; gap:1rem; flex-wrap:wrap;">
  <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer" style="display: grid; place-items: center;">
    <img height="100" src="https://vuejs.org/logo.svg" alt="Pinia logo">
    Vue JS
  </a>
    <a href="https://pinia.vuejs.org" target="_blank" rel="noopener noreferrer" style="display: grid; place-items: center;">
    <img height="100" src="https://pinia.vuejs.org/logo.svg" alt="Pinia logo">
    Pinia
  </a>
  <a href="https://quasar.dev/" target="_blank" rel="noopener noreferrer" style="display: grid; place-items: center;">
    <img height="100" src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" alt="Pinia logo">
    Quasar Framework
  </a>
  <a href="https://docs.docker.com/get-started/" target="_blank" rel="noopener noreferrer" style="display: grid; place-items: center;">
    <img height="100" style="object-fit:contain" src="https://www.svgrepo.com/show/331370/docker.svg" alt="Pinia logo">
    Docker
  </a>
  <a href="https://tanstack.com/query/v4/docs/overview" target="_blank" rel="noopener noreferrer" style="display: grid; place-items: center;">
    <img width="350" style="object-fit:contain" src="https://res.cloudinary.com/dj6nxwrae/image/upload/v1670533439/Screenshot_20221208_150252_uevd3p.png" alt="Pinia logo">
    <span> TanStack Query <sup>v4</sup> </span>
  </a>
</p>
