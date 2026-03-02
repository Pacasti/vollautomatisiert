(function () {
  'use strict';

  var STORAGE_KEY = 'cookie-consent';

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      // localStorage unavailable — banner will reappear next visit
    }
  }

  function removeBanner(banner) {
    banner.classList.add('cookie-banner--hidden');
    banner.addEventListener('transitionend', function () {
      banner.remove();
    });
  }

  function createBanner() {
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');

    banner.innerHTML =
      '<div class="cookie-banner__content">' +
        '<p>We use cookies to improve your experience. Learn more in our ' +
        '<a href="datenschutz.html">Privacy Policy</a>.</p>' +
        '<div class="cookie-banner__actions">' +
          '<button class="btn btn--primary cookie-banner__btn" id="cookie-accept">Accept</button>' +
          '<button class="btn btn--outline cookie-banner__btn" id="cookie-reject">Reject</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      setConsent('accepted');
      removeBanner(banner);
    });

    document.getElementById('cookie-reject').addEventListener('click', function () {
      setConsent('rejected');
      removeBanner(banner);
    });
  }

  function init() {
    if (!getConsent()) {
      createBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
