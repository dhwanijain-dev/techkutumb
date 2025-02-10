//// filepath: /D:/HTML/tldraw/frontend/src/components/ChatContainer.jsx
// ...existing code...
import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatContainer() {
    const [name, setName] = useState("");
    const [tempName, setTempName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const handleMessage = (data) => {
            setMessages((prev) => [...prev, data]);
        };
        socket.on("message", handleMessage);

        return () => {
            socket.off("message", handleMessage);
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== "") {
            socket.emit("message", { name, text: message });
            setMessage("");
        }
    };

    return (
        
        <div className="chat-container border-0 rounded-3xl bottom-10 left-10 absolute z-10" style={{ padding: "20px", border: "1px solid #ccc" }}>
            {!name ? (
                <div>
                    <input
                        type="text"
                        className="p-1 outline-none"
                        placeholder="Enter your name"
                        onChange={(e) => setTempName(e.target.value)}
                    />
                    <button  onClick={() => setName(tempName)}>Join</button>
                </div>
            ) : (
                <div>
                    <div className="messages" style={{ height: "200px", overflowY: "auto" }}>
                        {messages.map((msg, index) => (
                            <p key={index}>
                                <strong>{msg.name}:</strong> {msg.text}
                            </p>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
}
// ...existing code...