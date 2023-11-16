'use client'

import Message from "@/domain/Message";
import Messenger from "@/ui/Messenger";
import {useEffect, useState} from "react";

export default function Home() {
  const [myUserId, setMyUserId] = useState<string>('');
  const [otherUserId, setOtherUserId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const myUserId = urlParams.get("mid") || ''
    const otherUserId = urlParams.get("oid") || ''

    setMyUserId(myUserId);
    setOtherUserId(otherUserId);
    async function fetchPreviousMessages() {
      const response = await fetch('http://localhost:4000/messages-between?a=' + myUserId + '&b=' + otherUserId, {
        method: 'get',
        headers: {
          'content-type': 'application/json; charset=UTF-8'
        }
      });

      let existingMessagesBetweenUs = []

      try {
        existingMessagesBetweenUs = await response.json();

        for (const message of existingMessagesBetweenUs) {
          message.mine = message.fromUserId === myUserId
        }
      } catch (e) {
        console.error(e);
      }

      setMessages(existingMessagesBetweenUs);
    }
    fetchPreviousMessages().then(r => {})
  }, []);

  return (
      <div className="container">

        <div className="row">
          <div id="title">
            <h1>React Messenger</h1>
          </div>
          <Messenger
              myUserId={myUserId}
              otherUserId={otherUserId}
              messageList={messages}/>
        </div>

      </div>
  );
}
