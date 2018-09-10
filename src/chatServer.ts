import * as WebSocket from 'molen/dist/drivers/websocket';
import { merge, Subject } from 'rxjs';
import { map, withLatestFrom, filter, tap } from 'rxjs/operators';
import { setDatabaseStream } from './database';
import { Message } from './entity/Message';

interface ConnectionResponse {
  user: string;
}
interface MessageResponse {
  user: string;
  message: string;
}
type Response = MessageResponse | ConnectionResponse;


export const chatServer: WebSocket.WebSocketHandler = (input$) => {
  const responses$ = merge(
    newConnections(input$),
    messages(input$),
  );

  setDatabaseStream(responses$.pipe(
    filter(response => typeof response.broadcast === 'string'),
    map((response) => {
      // TODO: Represent all possible message types here
      const data: MessageResponse = JSON.parse(response.broadcast as string)
      const row = new Message();
      row.user = data.user;
      row.content = data.message;

      return row;
    }),
  ));

  return responses$;
};

const newConnections: WebSocket.WebSocketHandler = (input$) => {
  return WebSocket.onMessage('connect', input$).pipe(
    map((input) => ({
      message: JSON.stringify({ user: 'System', message: `Welcome User ${input.id}!` }),
      broadcast: JSON.stringify({ user: 'System', message: `User ${input.id} connected.` }),
    })),
  );
};

const messages: WebSocket.WebSocketHandler = (input$) => {
  return WebSocket.onMessage(/msg\:(.*)/, input$).pipe(
    map((input) => ({
      broadcast: JSON.stringify({ user: `User ${input.id}`, message: input.data.substr(4) }),
    })),
  );
};
