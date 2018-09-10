import { map } from 'rxjs/operators';
import * as Http from 'molen/dist/drivers/http';
import * as WebSocket from 'molen/dist/drivers/websocket';

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

const app: Http.HttpHandler = (input$) => {
  return input$.pipe(
    map(() => ({ body: [ 'Hi!' ] })),
  );
};
const httpServer = Http.driver(app, { port });

const wsApp: WebSocket.WebSocketHandler = (input$) => {
  return input$.pipe(
    map((input) => ({ }))
  );
};

WebSocket.driver(wsApp, { server: httpServer });