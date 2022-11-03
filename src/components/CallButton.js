import { Button } from '@material-ui/core';

export default function CallButton({ setInCall }) {
  return (
    <Button variant="contained" color="primary" onClick={setInCall}>
      Join Call
    </Button>
  );
}
