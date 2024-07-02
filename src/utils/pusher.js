// pusher.js
import Pusher from 'pusher';


const pusher = new Pusher({
  appId: "1828090",
  key: "cae19a2847464acb8f1c",
  secret: "bc0a8ba2011761850df8",
  cluster: "eu",
  useTLS: true
});

export default pusher;
