import React from "react";
import { timeDifference } from '../util/Utils'

class MessageView extends React.Component<{ created: Date, sender: string, content: string }, {relativePeriod: string }> {
    interval: NodeJS.Timeout;
    componentDidMount() {
        const newState: object = {
            relativePeriod: timeDifference(this.props.created)
        };
        this.interval = setInterval(() => this.setState(newState), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <div className="message-view">
                <div className="message-header-view">
                    <div className="message-sender-view">${this.props.sender}</div>
                    <div className="message-created-date-view">{this.state.relativePeriod}</div>
                </div>
                <div className="message-content-view">${this.props.content}</div>
            </div>
        );
    }
}

export default MessageView;