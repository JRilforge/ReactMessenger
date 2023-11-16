import React from "react";
import MessageContentInput from "./MessageContentInput";
import Message from "../domain/Message";

class MessageComposer extends React.Component<{myUserId: string, otherUserId: string, messageList: Message[]}, {}> {
    render() {
        return (
            <div className="messenger-composer-view">
                <MessageContentInput
                    myUserId={this.props.myUserId}
                    otherUserId={this.props.otherUserId}
                    messageList={this.props.messageList}/>
            </div>
        );
    }
}

export default MessageComposer;