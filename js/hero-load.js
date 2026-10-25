(function () {
  const header = document.querySelector('#page-header.full_page');
  const curtain = document.getElementById('page-load-curtain');

  if (!header) {
    if (curtain) curtain.remove();
    return;
  }

  function finish() {
    document.body.classList.add('page-loaded');
    if (curtain) curtain.classList.add('is-done');
    setTimeout(function () {
      if (curtain && curtain.parentNode) curtain.parentNode.removeChild(curtain);
    }, 700);
  }

  const style = header.getAttribute('style') || '';
  const match = style.match(/url\(['"]?([^'")]+)/);
  const img = new Image();
  let imgReady = false;
  let pageReady = document.readyState === 'complete';

  function tryFinish() {
    if (imgReady && pageReady) finish();
  }

  img.onload = img.onerror = function () {
    imgReady = true;
    tryFinish();
  };

  if (match && match[1]) {
    img.src = match[1];
  } else {
    imgReady = true;
  }

  if (!pageReady) {
    window.addEventListener('load', function () {
      pageReady = true;
      tryFinish();
    });
  }

  tryFinish();
  setTimeout(finish, 8000);
})();
