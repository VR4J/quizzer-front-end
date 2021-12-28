import Observer from './websocket/observer.js'
import Player from './websocket/player.js'

const SESSION_ID_ITEM = "SESSION-ID"

if(window.location.pathname === '/player.html') {
  const STORE = window.localStorage;

  if(STORE.getItem(SESSION_ID_ITEM) == null) {
    STORE.setItem(SESSION_ID_ITEM, UUID())
  }
  
  let session_id = STORE.getItem(SESSION_ID_ITEM)
  let is_connected = Player.RECONNECT(session_id)

  setInterval(() => {
    if (! is_connected) {
      is_connected = Player.RECONNECT(session_id)
    }
  }, 5000)
}

if(window.location.pathname === '/') {
  Observer.CONNECT(UUID());
}

function UUID() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}