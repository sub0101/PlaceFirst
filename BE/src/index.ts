import { app } from './app';
import { Server } from 'http';
import env from './config';
const server:Server = app.listen(env.PORT, () => {
    console.log(`Server is running at http://localhost:${env.PORT}`);
  });
  

