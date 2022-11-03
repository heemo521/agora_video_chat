import { useState } from 'react';
import Call from './components/Call';
import CallButton from './components/CallButton';

function App() {
  const [inCall, setInCall] = useState(false);

  return (
    <div className="App">
      {inCall ? <Call /> : <CallButton setInCall={() => setInCall(true)} />}
    </div>
  );
}

export default App;
