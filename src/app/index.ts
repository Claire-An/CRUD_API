import { routes } from "./routes";
import http from "http";
import * as dotenv from "dotenv";
import { cpus } from 'node:os';
import cluster from 'node:cluster';

dotenv.config();
const PORT = process.env.PORT || 4000;

export const server = http.createServer(routes);

export const runServer = () => {
  if (process.argv[2] === "cluster") {
    const numCPUs = cpus().length;
    if (cluster.isPrimary) {
      console.log(`Primary ${process.pid} is running`);
    
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork({ PORT: +PORT + i });
      }
    
      cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
      });

      cluster.on('message', async (worker, message) => {
        worker.send(message);
      });
    } else {

      server.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on port:${PORT}`)
      });
    
    }
  } else {
    server.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  }
}

process.on('SIGINT', () => {
  server.close(() => process.exit());
});
