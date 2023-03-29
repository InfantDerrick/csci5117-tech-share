import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from './firebase'
import 'bootstrap/dist/css/bootstrap.css';

function ChatRoom() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("baseUser");
  const [authenticated, setAuthenticated] = useState(true); //should change later



  // Fetch messages from Firestore on component mount
  /*  TODO: Fetch messages from Firestore and update state using onSnapshot listener
      The messages are ordered by timestamp in ascending order
      Unsubscribe from the listener when the component unmounts to prevent memory leaks */

  const filteredMessages = messages.filter((message) =>
    message.text?.toLowerCase().includes(search.toLowerCase()) ||
    message.username?.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = () => {};



  // TODO: Implement the handleLogout function which signs the user out using the Firebase auth API and redirects them to the home page.
  const handleLogout = () => {};

  /* TODO: This useEffect hook listens for changes in the user's authentication state. 
    When the user logs in or logs out, it updates the state of the username and authentication status. 
    If the user is not authenticated, it redirects them to the login page.
  */


  return (
    <div>
      {authenticated ? 
      (        <div className="container my-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">CSCI 5117 - Chat Room</h4>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
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
              
              <li className={message.username === username ? 'list-group-item bg-light' : 'list-group-item'} key={message.id}>
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 font-weight-bold">{message.username}</h5>
                    <span className="text-muted">{new Date(message.timestamp.seconds * 1000).toLocaleTimeString()}</span>
                  </div>
                  <p className="mb-0">{message.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <form className="mt-3" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group d-flex">
              <input
                type="text"
                className="form-control mr-2"
                placeholder="Enter a message"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    sendMessage(e.target.value.trim());
                    e.target.value = "";
                  }
                }}
              />
              <button className="btn btn-primary">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>) : (<></>)}
    </div>
  );
}
export default ChatRoom