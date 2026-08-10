(function () {
  const twitchLink = document.querySelector('a[href*="twitch.tv/rekize"]');

  if (!twitchLink) return;

  const tooltip = document.createElement('span');
  tooltip.textContent = 'Live';
  tooltip.setAttribute('aria-label', 'Live');
  tooltip.style.position = 'absolute';
  tooltip.style.top = '-8px';
  tooltip.style.right = '-8px';
  tooltip.style.padding = '2px 8px';
  tooltip.style.background = '#ff0000';
  tooltip.style.color = '#fff';
  tooltip.style.fontSize = '0.75rem';
  tooltip.style.fontWeight = '700';
  tooltip.style.lineHeight = '1';
  tooltip.style.border = '2px solid #000';
  tooltip.style.borderRadius = '999px';
  tooltip.style.boxShadow = '2px 2px 0 #000';
  tooltip.style.zIndex = '10';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.opacity = '0';
  tooltip.style.visibility = 'hidden';
  tooltip.style.transform = 'translateY(-4px)';
  tooltip.style.transition = 'opacity 0.2s ease';

  twitchLink.style.position = 'relative';
  twitchLink.appendChild(tooltip);

  fetch('https://cek-twitch.rekize.workers.dev/', {
    method: 'GET',
    cache: 'no-store'
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
    .then((payload) => {
      const hasLiveData = Array.isArray(payload?.data) && payload.data.length > 0;

      if (hasLiveData) {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
        tooltip.style.transform = 'translateY(0)';
      }
    })
    .catch(() => {
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
    });
})();
