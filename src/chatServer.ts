import * as WebSocket from 'molen/dist/drivers/websocket';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

interface ConnectionResponse {
  user: string;
}
interface MessageResponse {
  user: string;
  message: string;
}
type Response = MessageResponse | ConnectionResponse;

export const chatServer: WebSocket.WebSocketHandler = (input$) => {
  return merge(
    newConnections(input$),
    messages(input$),
  );
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
