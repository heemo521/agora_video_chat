import { useEffect, useState } from 'react';

function App() {
  const [inCall, setInCall] = useState(false);

  return (
    <div className="App">
      {inCall ? <Call /> : <CallButton onClick={() => setInCall(true)} />}
    </div>
  );
}

export default App;
