import WebSocket from 'ws';
// import * from "./dev_notify_sender";

interface WsMsg {
  code: number;
  payload: any;
}

const server = new WebSocket.Server({ port: 8080 }, () => {
  console.info('WebSocketServer init done!');
});
server.on('connection', (ws, req) => {
  console.info('Reciced connection: ');

  function handleWsMsg(msg: WsMsg) {
    const ackCode = msg.code + 1;
    ws.send(
      JSON.stringify({
        code: ackCode,
        payload: {
          code: 0,
          message: `${msg.code} req success`,
        },
      })
    );
  }

  ws.on('message', msg => {
    console.info('Received msg:', msg);
    const wsMsg = JSON.parse(msg + '') as WsMsg;
    if (wsMsg.code && wsMsg.payload) {
      setTimeout(() => {
        handleWsMsg(wsMsg);
      }, 1000);
    }
  });
});
