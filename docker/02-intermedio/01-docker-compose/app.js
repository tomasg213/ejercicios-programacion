const redis = require('redis');

const client = redis.createClient({
  socket: {
    host: 'redis',
    port: 6379
  }
});

async function main() {
  await client.connect();
  console.log('Conectado a Redis');

  await client.set('visitas', '0');
  const visitas = await client.get('visitas');
  console.log(`Visitas actuales: ${visitas}`);

  await client.incr('visitas');
  const nuevasVisitas = await client.get('visitas');
  console.log(`Visitas después del incremento: ${nuevasVisitas}`);

  await client.quit();
  console.log('Desconectado de Redis');
}

main().catch(console.error);
