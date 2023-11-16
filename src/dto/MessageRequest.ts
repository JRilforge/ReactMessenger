export default class MessageRequest {
    fromUserId: string;
    toUserId: string;
    content: string;

    constructor(fromUserId: string, toUserId: string, content: string) {
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.content = content;
    }
}