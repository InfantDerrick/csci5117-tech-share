import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from './firebase'
import 'bootstrap/dist/css/bootstrap.css';

function ChatRoom() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
        setUsername(user.email.split("@")[0]);
      } else {
        setAuthenticated(false);
        navigate("/");
      }
    });
    return unsubscribe;
  }, [navigate]);

  const getMessages = async () => {
    
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const querySnapshot = await getDocs(q);
    const messagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    console.log(messagesData);
  }

  getMessages();


  // Fetch messages from Firestore on component mount
  /*  TODO: Fetch messages from Firestore and update state using onSnapshot listener
      The messages are ordered by timestamp in ascending order
      Unsubscribe from the listener when the component unmounts to prevent memory leaks */
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

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };


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