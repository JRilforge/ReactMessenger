'use client'

class Message {
    sender: string;
    content: string;
    created: Date;
    mine: boolean;

    constructor(sender: string, content: string, created: Date, mine?: boolean) {
        this.sender = sender;
        this.content = content;
        this.created = created;
        this.mine = mine || false;
    }
}

export default Message;