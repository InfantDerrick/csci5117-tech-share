import { useState, useEffect } from "react";
import { collection, query, where, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import { db } from './firebase'
import 'bootstrap/dist/css/bootstrap.css';

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState(null);

  // Prompt user for username on component mount
  useEffect(() => {
    if (username == null) {
      const usernameInput = prompt("Please enter a username:");
      localStorage.setItem("username", usernameInput);
      setUsername(usernameInput);
    } else {
      setUsername(username);
    }
  }, []);

  // Fetch messages from Firestore on component mount
  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });
    return unsubscribe;
  }, []);

  // Add message to Firestore
  const sendMessage = async (content) => {
    await addDoc(collection(db, "messages"), {
      text: content,
      username: username,
      timestamp: new Date()
    });
  };

  // Filter messages based on search query
  const filteredMessages = messages.filter((message) =>
    message.text?.toLowerCase().includes(search.toLowerCase()) ||
    message.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container my-4">
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">Chat Room</h4>
      </div>
      <div className="card-body">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search messages or usernames"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ul className="list-group">
          {filteredMessages.map((message) => (
            <li className="list-group-item" key={message.id}>
              <span className="font-weight-bold">{message.username}: </span>
              <span>{message.text}</span>
            </li>
          ))}
        </ul>
        <div className="form-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a message"
            onKeyPress={(e) => {
              if (e.key === "Enter" && e.target.value.trim() !== "") {
                sendMessage(e.target.value.trim());
                e.target.value = "";
              }
            }}
          />
        </div>
      </div>
    </div>
  </div>
  );
}
export default ChatRoom