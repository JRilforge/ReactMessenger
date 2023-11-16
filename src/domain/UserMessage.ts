import {ObjectId} from "mongodb";

export default class UserMessage {
    _id: ObjectId;
    fromUserId: string;
    toUserId: string;
    content: string;
    created: Date;

    constructor(_id: ObjectId, fromUserId: string, toUserId: string, content: string, created: Date) {
        this._id = _id;
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.content = content;
        this.created = created;
    }
}