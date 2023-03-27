
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import ChatRoom from './ChatRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/chat" element={<ChatRoom/>} />
      </Routes>
    </Router>
  );
}

export default App;