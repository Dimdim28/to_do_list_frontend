import { io } from 'socket.io-client';

import { NotificationClientEvents } from '../types/entities/Notification';

class socketsAPIClass {
  private socket: any;

  public init(token: string) {
    this.socket = io(
      `${process.env.REACT_SOCKETS_API_URL ? 'wss' : 'ws'}://${
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

  public confirmSubtask(subtaskId: string, receiverId: string) {
    this.socket.emit(NotificationClientEvents.SUBTASK_CONFIRM, {
      subtaskId,
      receiverId,
    });
  }

  public rejectSubtask(subtaskId: string, receiverId: string) {
    this.socket.emit(NotificationClientEvents.SUBTASK_REJECT, {
      subtaskId,
      receiverId,
    });
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
