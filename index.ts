import * as Http from 'molen/dist/drivers/http';
import * as WebSocket from 'molen/dist/drivers/websocket';
import { resolve } from 'path';

import { chatServer } from './src/chatServer';

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

const app: Http.HttpHandler = (input$) => {
  return Http.serveStatic(resolve(__dirname, 'public'), input$);
};
const httpServer = Http.driver(app, { port });

WebSocket.driver(chatServer, { server: httpServer });
