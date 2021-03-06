const attachFastClick = require('fastclick');

export function bootloader (main: any): void {
  function domReadyHandler() {
    document.removeEventListener('DOMContentLoaded', domReadyHandler, false);
    main();
  }

  switch (document.readyState) {
    case 'loading':
      document.addEventListener('DOMContentLoaded', domReadyHandler, false);
      break;
    case 'complete':
      attachFastClick(document.body);
      main();
      break;
    case 'interactive':
      main();
      break;
    default:
      main();
  }
}
