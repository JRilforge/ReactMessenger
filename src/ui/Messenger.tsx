import MessagingView from './MessagingView'
import React from "react";
import Message from "../domain/Message";
import MessageComposer from "./MessageComposer";

class Messenger extends React.Component<{ myUserId: string, otherUserId: string, messageList: Message[] }, { count: number }> {
    render() {
        return (
            <div className="messenger-view">
                <MessagingView messageList={ this.props.messageList }/>
                <MessageComposer
                    myUserId={ this.props.myUserId }
                    otherUserId={ this.props.otherUserId }
                    messageList={ this.props.messageList }/>
            </div>
        );
    }
}

export default Messenger;