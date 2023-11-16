import React from "react";
import MessageView from "./MessageView";
import Message from "../domain/Message";

class MessagingView extends React.Component<{messageList: Message[]}, {}> {
    render() {
        return (
            <div className="messaging-view">
                {this.props.messageList.map((message: Message) => {
                    return <MessageView
                        created={ message.created }
                        sender={ message.sender }
                        content={ message.content }/>
                })}
            </div>
        );
    }
}

export default MessagingView;