'use client';

import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messageRecieved, setMessageRecieved] = useState<string>("");

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("recieve_message", (data: unknown) => {
      setMessageRecieved(data.message);
    });
  }, [socket]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Message</h1>
      <input type="text" placeholder="Message..." onChange={(event) => setMessage(event.target.value)} />
      <button onClick={sendMessage}>Send message</button>
      <p>{messageRecieved}</p>
    </div>
  );
}
