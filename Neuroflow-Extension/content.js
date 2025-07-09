let lastScrollY = window.scrollY;
let scrollEvents = 0;
let startTime = Date.now();

const scrollTracker = setInterval(() => {
  if (Math.abs(window.scrollY - lastScrollY) > 50) {
    scrollEvents++;
    lastScrollY = window.scrollY;
  }
}, 1000);

window.addEventListener('beforeunload', () => {
  const duration = Math.floor((Date.now() - startTime) / 1000);
  const payload = {
    url: window.location.href,
    timeSpent: duration,
    scrollEvents,
    timestamp: new Date().toISOString()
  };

  chrome.runtime.sendMessage({ type: 'LOG_BEHAVIOR', payload });
  clearInterval(scrollTracker);
});
