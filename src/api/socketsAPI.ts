import { io } from 'socket.io-client';

class socketsAPIClass {
  private socket: any;

  public init(token: string) {
    this.socket = io(
      `ws://${
        process.env.REACT_SOCKETS_API_URL || 'localhost:5000'
      }/notifications`,
      {
        transportOptions: {
          polling: {
            extraHeaders: {
              token,
            },
          },
        },
      },
    );
  }

  public confirmSubtask(subtaskId: string) {
    this.socket.emit('subtask:confirm', subtaskId);
  }

  public rejectSubtask(subtaskId: string) {
    this.socket.emit('subtask:reject', subtaskId);
  }

  public getSocket() {
    return this.socket;
  }

  public closeConnection() {
    this.socket.disconnect();
  }
}

const socketsAPI = new socketsAPIClass();
export default socketsAPI;
