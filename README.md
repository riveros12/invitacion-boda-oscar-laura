# Invitación de boda — Oscar & Laura

## Ejecutar

1. Instala Node.js 20 o superior.
2. Abre una terminal en esta carpeta.
3. Ejecuta `npm install`.
4. Ejecuta `npm run dev`.

Para publicar: `npm run build`. El resultado queda en `dist`.

## Música para la versión pública

La invitación publicada funciona sin audio hasta disponer de una pista autorizada.

Para activarla:

1. Copia el archivo autorizado como `public/audio/musica-boda.mp3`.
2. Copia `.env.production.example` como `.env.production`.
3. Ejecuta `npm run check` y publica los cambios.

La versión local usa `.env.local` y puede conservar una pista privada que no se sube al repositorio.

Antes de compartir, revisa en `src/Invitacion.jsx` los teléfonos, el lugar y los horarios.
