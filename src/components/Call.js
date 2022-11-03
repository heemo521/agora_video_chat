import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from '../settings';

export default function Call() {
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  useEffect(() => {
    let init = async (name) => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === 'video')
          setUsers((prevUsers) => [...prevUsers, user]);

        if (mediaType === 'audio') user.audioTrack.play();
      });
      client.on('user-unpublished', (user, mediaType) => {
        if (mediaType === 'audio' && user.audioTrack) user.audioTrack.stop();

        if (mediaType === 'video')
          setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      });

      client.on('user-left', (user) => {
        setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      });

      try {
        await client.join(config.appId, name, config.token, null);
      } catch (err) {
        console.log(err);
      }
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };
    if (ready && tracks) {
      try {
        init(channelName);
      } catch (err) {
        console.log(err);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelName, client, ready, tracks]);

  return (
    <Grid container direction="column" style={{ height: '100%' }}>
      <Grid item style={{ height: '5%' }}></Grid>
      <Grid item style={{ height: '95%' }}></Grid>
    </Grid>
  );
}
