import { useState } from 'react';
import VideoCall from './components/VideoCall';
import CallButton from './components/CallButton';

function App() {
  const [inCall, setInCall] = useState(false);

  return (
    <div
      className="App"
      style={{
        height: '80vh',
        maxWidth: '800px',
        width: '100%',
        margin: '100px auto',
      }}
    >
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <CallButton setInCall={() => setInCall(true)} />
      )}
    </div>
  );
}

export default App;
