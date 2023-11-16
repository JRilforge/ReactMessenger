import React from "react";
import Message from "../domain/Message";

class MessageContentInput extends React.Component<{myUserId: string, otherUserId: string, messageList: Message[]}, {value: string, iconClass: string}> {
    constructor(props: any) {
        super(props);

        this.state = {value: '', iconClass: 'fas fa-paper-plane'}
    }

    async sendMessage(e: React.MouseEvent) {
        const messageContent: string = this.state.value;

        if (messageContent) {
            this.setState({iconClass: 'fas fa-circle-notch fa-spin'})

            const response = await fetch("/send-message", {
                method: 'post',
                headers: {
                    'content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    fromUserId: this.props.myUserId,
                    toUserId: this.props.otherUserId,
                    content: messageContent
                })
            });

            try {
                const persistedMessage = await response.json();

                const message: Message = new Message(
                    persistedMessage.sender,
                    persistedMessage.content,
                    persistedMessage.created,
                    true);

                this.props.messageList.push(message)
            } catch (e) {
                console.log(e);
            }

            this.setState({iconClass: 'fas fa-paper-plane'})
        }
    }

    handleKeyUp(e: React.KeyboardEvent) {
        this.setState({value: (e.target as HTMLInputElement)?.value || ''})
    }
    handleChange(e: React.ChangeEvent) {
        this.setState({value: (e.target as HTMLInputElement)?.value || ''})
    }
    render() {
        return (
            <div className="message-content-form-view">
                <input className="message-content-input" value={this.state.value} type="text" placeholder="Input Message" onKeyUp={this.handleKeyUp} onChange={this.handleChange}></input>
                <span className="send-btn" onClick={this.sendMessage}>
                    <i className={this.state.iconClass}></i>
                </span>
            </div>
        );
    }
}

export default MessageContentInput;