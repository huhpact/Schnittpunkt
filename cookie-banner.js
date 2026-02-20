const cookieTranslations = {
  de: {
    banner_title: 'Cookie-Einstellungen',
    banner_description: 'Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Sie können Ihre Einstellungen jederzeit anpassen.',
    accept_all: 'Alle akzeptieren',
    reject_all: 'Alle ablehnen',
    customize: 'Anpassen',
    save_preferences: 'Einstellungen speichern',
    cookie_policy: 'Cookie-Richtlinie',

    necessary_title: 'Notwendige Cookies',
    necessary_desc: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.',

    functional_title: 'Funktionale Cookies',
    functional_desc: 'Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung, wie z.B. Spracheinstellungen.',

    analytics_title: 'Analyse-Cookies',
    analytics_desc: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.',

    marketing_title: 'Marketing-Cookies',
    marketing_desc: 'Diese Cookies werden verwendet, um Ihnen relevante Werbung anzuzeigen.',

    always_active: 'Immer aktiv'
  },
  en: {
    banner_title: 'Cookie Settings',
    banner_description: 'We use cookies to improve your experience on our website. You can adjust your settings at any time.',
    accept_all: 'Accept All',
    reject_all: 'Reject All',
    customize: 'Customize',
    save_preferences: 'Save Preferences',
    cookie_policy: 'Cookie Policy',

    necessary_title: 'Necessary Cookies',
    necessary_desc: 'These cookies are required for basic website functionality and cannot be disabled.',

    functional_title: 'Functional Cookies',
    functional_desc: 'These cookies enable enhanced functionality and personalization, such as language settings.',

    analytics_title: 'Analytics Cookies',
    analytics_desc: 'These cookies help us understand how visitors interact with our website.',

    marketing_title: 'Marketing Cookies',
    marketing_desc: 'These cookies are used to show you relevant advertising.',

    always_active: 'Always Active'
  }
};

class CookieBanner {
  constructor() {
    this.preferences = this.loadPreferences();
    this.currentLang = localStorage.getItem('preferred-language') || 'de';
    this.init();
  }

  init() {
    this.injectStyles();

    if (!this.preferences.accepted) {
      this.showBanner();
    }

    this.setupEventListeners();
  }

  loadPreferences() {
    const stored = localStorage.getItem('cookie-preferences');
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      accepted: false,
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: null
    };
  }

  savePreferences() {
    this.preferences.accepted = true;
    this.preferences.timestamp = new Date().toISOString();
    localStorage.setItem('cookie-preferences', JSON.stringify(this.preferences));
    this.applyCookiePreferences();
  }

  applyCookiePreferences() {
    if (this.preferences.analytics) {
      console.log('Analytics cookies enabled');
    }

    if (this.preferences.marketing) {
      console.log('Marketing cookies enabled');
    }

    if (this.preferences.functional) {
      console.log('Functional cookies enabled');
    }
  }

  showBanner() {
    const banner = this.createBannerHTML();
    document.body.insertAdjacentHTML('beforeend', banner);

    setTimeout(() => {
      const bannerEl = document.getElementById('cookieBanner');
      if (bannerEl) {
        bannerEl.classList.add('show');
      }
    }, 500);
  }

  hideBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 300);
    }
  }

  showSettings() {
    const settings = this.createSettingsHTML();
    document.body.insertAdjacentHTML('beforeend', settings);

    setTimeout(() => {
      const settingsEl = document.getElementById('cookieSettings');
      if (settingsEl) {
        settingsEl.classList.add('show');
      }
    }, 10);

    this.setupSettingsListeners();
  }

  hideSettings() {
    const settings = document.getElementById('cookieSettings');
    if (settings) {
      settings.classList.remove('show');
      setTimeout(() => settings.remove(), 300);
    }
  }

  createBannerHTML() {
    const t = cookieTranslations[this.currentLang];

    return `
      <div class="cookie-banner" id="cookieBanner">
        <div class="cookie-banner-content">
          <div class="cookie-banner-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
              <path d="M8.5 8.5v.01"></path>
              <path d="M16 15.5v.01"></path>
              <path d="M12 12v.01"></path>
              <path d="M11 17v.01"></path>
              <path d="M7 14v.01"></path>
            </svg>
          </div>
          <div class="cookie-banner-text">
            <h3 class="cookie-banner-title">${t.banner_title}</h3>
            <p class="cookie-banner-description">${t.banner_description}</p>
          </div>
          <div class="cookie-banner-actions">
            <button class="cookie-btn cookie-btn-text" id="cookieCustomize">
              ${t.customize}
            </button>
            <button class="cookie-btn cookie-btn-secondary" id="cookieReject">
              ${t.reject_all}
            </button>
            <button class="cookie-btn cookie-btn-primary" id="cookieAccept">
              ${t.accept_all}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  createSettingsHTML() {
    const t = cookieTranslations[this.currentLang];

    return `
      <div class="cookie-settings-overlay" id="cookieSettings">
        <div class="cookie-settings-modal">
          <div class="cookie-settings-header">
            <h2>${t.banner_title}</h2>
            <button class="cookie-settings-close" id="cookieSettingsClose">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="cookie-settings-body">
            <p class="cookie-settings-intro">${t.banner_description}</p>

            <div class="cookie-category">
              <div class="cookie-category-header">
                <div class="cookie-category-info">
                  <h3>${t.necessary_title}</h3>
                  <p>${t.necessary_desc}</p>
                </div>
                <div class="cookie-toggle-container">
                  <span class="cookie-always-active">${t.always_active}</span>
                </div>
              </div>
            </div>

            <div class="cookie-category">
              <div class="cookie-category-header">
                <div class="cookie-category-info">
                  <h3>${t.functional_title}</h3>
                  <p>${t.functional_desc}</p>
                </div>
                <label class="cookie-toggle">
                  <input type="checkbox" id="functionalCookies" ${this.preferences.functional ? 'checked' : ''}>
                  <span class="cookie-toggle-slider"></span>
                </label>
              </div>
            </div>

            <div class="cookie-category">
              <div class="cookie-category-header">
                <div class="cookie-category-info">
                  <h3>${t.analytics_title}</h3>
                  <p>${t.analytics_desc}</p>
                </div>
                <label class="cookie-toggle">
                  <input type="checkbox" id="analyticsCookies" ${this.preferences.analytics ? 'checked' : ''}>
                  <span class="cookie-toggle-slider"></span>
                </label>
              </div>
            </div>

            <div class="cookie-category">
              <div class="cookie-category-header">
                <div class="cookie-category-info">
                  <h3>${t.marketing_title}</h3>
                  <p>${t.marketing_desc}</p>
                </div>
                <label class="cookie-toggle">
                  <input type="checkbox" id="marketingCookies" ${this.preferences.marketing ? 'checked' : ''}>
                  <span class="cookie-toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div class="cookie-settings-footer">
            <a href="cookies.html" class="cookie-policy-link">${t.cookie_policy}</a>
            <div class="cookie-settings-actions">
              <button class="cookie-btn cookie-btn-secondary" id="cookieRejectSettings">
                ${t.reject_all}
              </button>
              <button class="cookie-btn cookie-btn-primary" id="cookieSaveSettings">
                ${t.save_preferences}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.id === 'cookieAccept') {
        this.acceptAll();
      } else if (e.target.id === 'cookieReject') {
        this.rejectAll();
      } else if (e.target.id === 'cookieCustomize') {
        this.showSettings();
      }
    });
  }

  setupSettingsListeners() {
    const closeBtn = document.getElementById('cookieSettingsClose');
    const saveBtn = document.getElementById('cookieSaveSettings');
    const rejectBtn = document.getElementById('cookieRejectSettings');
    const overlay = document.getElementById('cookieSettings');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hideSettings());
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.saveSettings());
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', () => {
        this.rejectAll();
        this.hideSettings();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.hideSettings();
        }
      });
    }
  }

  acceptAll() {
    this.preferences.functional = true;
    this.preferences.analytics = true;
    this.preferences.marketing = true;
    this.savePreferences();
    this.hideBanner();
  }

  rejectAll() {
    this.preferences.functional = false;
    this.preferences.analytics = false;
    this.preferences.marketing = false;
    this.savePreferences();
    this.hideBanner();
  }

  saveSettings() {
    const functional = document.getElementById('functionalCookies');
    const analytics = document.getElementById('analyticsCookies');
    const marketing = document.getElementById('marketingCookies');

    if (functional) this.preferences.functional = functional.checked;
    if (analytics) this.preferences.analytics = analytics.checked;
    if (marketing) this.preferences.marketing = marketing.checked;

    this.savePreferences();
    this.hideSettings();
    this.hideBanner();
  }

  injectStyles() {
    if (document.getElementById('cookie-banner-styles')) return;

    const styles = `
      <style id="cookie-banner-styles">
        .cookie-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--bg-white);
          box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          z-index: 9999;
          transform: translateY(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cookie-banner.show {
          transform: translateY(0);
        }

        .cookie-banner-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .cookie-banner-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .cookie-banner-text {
          flex: 1;
          min-width: 250px;
        }

        .cookie-banner-title {
          font-family: var(--font-serif-1);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.5rem 0;
        }

        .cookie-banner-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        .cookie-banner-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .cookie-btn {
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
          border: none;
          white-space: nowrap;
        }

        .cookie-btn-primary {
          background: var(--primary);
          color: white;
        }

        .cookie-btn-primary:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px var(--primary-glow);
        }

        .cookie-btn-secondary {
          background: var(--bg-light);
          color: var(--text-primary);
        }

        .cookie-btn-secondary:hover {
          background: #e5e7eb;
        }

        .cookie-btn-text {
          background: transparent;
          color: var(--primary);
          text-decoration: underline;
        }

        .cookie-btn-text:hover {
          color: var(--primary-dark);
        }

        .cookie-settings-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .cookie-settings-overlay.show {
          opacity: 1;
        }

        .cookie-settings-modal {
          background: var(--bg-white);
          border-radius: var(--radius-lg);
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-xl);
          transform: scale(0.9);
          transition: transform 0.3s ease;
        }

        .cookie-settings-overlay.show .cookie-settings-modal {
          transform: scale(1);
        }

        .cookie-settings-header {
          padding: 2rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cookie-settings-header h2 {
          font-family: var(--font-serif-1);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .cookie-settings-close {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-light);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .cookie-settings-close:hover {
          background: #e5e7eb;
          color: var(--text-primary);
        }

        .cookie-settings-body {
          padding: 2rem;
          overflow-y: auto;
          flex: 1;
        }

        .cookie-settings-intro {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin: 0 0 2rem 0;
          line-height: 1.6;
        }

        .cookie-category {
          margin-bottom: 2rem;
        }

        .cookie-category:last-child {
          margin-bottom: 0;
        }

        .cookie-category-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .cookie-category-info {
          flex: 1;
        }

        .cookie-category-info h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 0.5rem 0;
        }

        .cookie-category-info p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        .cookie-toggle-container {
          flex-shrink: 0;
        }

        .cookie-always-active {
          font-size: 0.85rem;
          color: var(--text-light);
          font-weight: 500;
        }

        .cookie-toggle {
          position: relative;
          display: inline-block;
          width: 52px;
          height: 28px;
          cursor: pointer;
        }

        .cookie-toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .cookie-toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #cbd5e1;
          transition: 0.3s;
          border-radius: 28px;
        }

        .cookie-toggle-slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
        }

        .cookie-toggle input:checked + .cookie-toggle-slider {
          background-color: var(--primary);
        }

        .cookie-toggle input:checked + .cookie-toggle-slider:before {
          transform: translateX(24px);
        }

        .cookie-settings-footer {
          padding: 1.5rem 2rem;
          border-top: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cookie-policy-link {
          font-size: 0.9rem;
          color: var(--primary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .cookie-policy-link:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }

        .cookie-settings-actions {
          display: flex;
          gap: 0.75rem;
        }

        @media (max-width: 768px) {
          .cookie-banner {
            padding: 1rem;
            border-radius: 16px 16px 0 0;
          }

          .cookie-banner-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .cookie-banner-icon {
            width: 40px;
            height: 40px;
          }

          .cookie-banner-text {
            min-width: 100%;
          }

          .cookie-banner-title {
            font-size: 1.1rem;
          }

          .cookie-banner-description {
            font-size: 0.9rem;
          }

          .cookie-banner-actions {
            width: 100%;
            flex-direction: column;
          }

          .cookie-btn {
            width: 100%;
            justify-content: center;
          }

          .cookie-settings-modal {
            max-height: 95vh;
            margin: 0;
            border-radius: var(--radius-md);
          }

          .cookie-settings-header {
            padding: 1.5rem;
          }

          .cookie-settings-header h2 {
            font-size: 1.5rem;
          }

          .cookie-settings-body {
            padding: 1.5rem;
          }

          .cookie-settings-footer {
            padding: 1rem 1.5rem;
            flex-direction: column;
            align-items: stretch;
          }

          .cookie-settings-actions {
            width: 100%;
            flex-direction: column;
          }

          .cookie-policy-link {
            text-align: center;
          }
        }

        @media (min-width: 769px) {
          .cookie-banner {
            left: auto;
            right: 2rem;
            bottom: 2rem;
            max-width: 450px;
            border-radius: var(--radius-lg);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          }

          .cookie-banner-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .cookie-banner-actions {
            width: 100%;
            flex-direction: column;
          }

          .cookie-btn {
            width: 100%;
            justify-content: center;
          }
        }
      </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CookieBanner();
  });
} else {
  new CookieBanner();
}
