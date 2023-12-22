import { io } from 'socket.io-client';

class socketsAPIClass {
  private socket: any;

  public init() {
    this.socket = io('ws://localhost:5000/notifications', {
      transportOptions: {
        polling: {
          extraHeaders: {
            token: window.localStorage.getItem('token') || '',
          },
        },
      },
    });

    console.log(this.socket);

    this.socket.on('newSubtaskConfirmation', (notification: Notification) => {
      console.log('newSubtaskConfirmation', notification);
    });
  }

  confirmSubtask(subtaskId: string) {
    this.socket.emit('subtask:confirm', subtaskId);
  }

  rejectSubtask(subtaskId: string) {
    this.socket.emit('subtask:reject', subtaskId);
  }

  // public listenForNewSubtaskConfirmation(
  //   callback: (notification: Notification) => void = () => {},
  // ) {
  //   this.socket.on('newSubtaskConfirmation', (notification: Notification) => {
  //     console.log('newSubtaskConfirmation', notification);
  //     callback(notification);
  //   });
  // }

  public getSocket() {
    return this.socket;
  }
}

const socketsAPI = new socketsAPIClass();
export default socketsAPI;
