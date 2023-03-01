export class Message {
  title;
  message;
  isSent;

  constructor(title, message) {
    this.title = title;
    this.message = message;
    this.isSent = false;
  }
}
