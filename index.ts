import * as Http from 'molen/drivers/http';
import * as WebSocket from 'molen/drivers/websocket';
import { resolve } from 'path';
import { merge } from 'rxjs';

import { chatServer } from './src/chatServer/chatServer';
import { latestMessages } from './src/webServer/messages';

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

const app: Http.HttpHandler = (input$) => {
  return merge(
    latestMessages(input$),
    Http.serveStatic(resolve(__dirname, 'public'), input$),
  );
};
const httpServer = Http.driver(app, { port });

WebSocket.driver(chatServer, { server: httpServer });
