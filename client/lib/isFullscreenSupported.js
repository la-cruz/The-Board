export default function getBrowserFullscreenElementProp() {
  if (typeof document.fullscreenElement !== 'undefined') {
    return 'fullscreenElement';
  }

  if (typeof document.mozFullScreenElement !== 'undefined') {
    return 'mozFullScreenElement';
  }

  if (typeof document.msFullscreenElement !== 'undefined') {
    return 'msFullscreenElement';
  }

  if (typeof document.webkitFullscreenElement !== 'undefined') {
    return 'webkitFullscreenElement';
  }

  return false;
}
