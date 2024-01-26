import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';

const app = new Hono();

app.use('/public/*', serveStatic({ root: './' }));

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/html', (c) => {
  return c.redirect('/public/test.html');
});

const port = 5000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
