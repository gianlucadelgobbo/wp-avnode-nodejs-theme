'use strict';

const express = require('express');
const { AsyncLocalStorage } = require('async_hooks');
const jsonfile = require('jsonfile');
const fs = require('fs');

require('dotenv').config();

// ── Per-request AsyncLocalStorage contexts ────────────────────────────────────
const configALS = new AsyncLocalStorage();  // active site config object
const i18nCtxALS = new AsyncLocalStorage(); // { localeData, lang, defaultLang }

// ── global.config: Proxy into the active request's site config ────────────────
global.config = new Proxy({}, {
  get(_, prop) {
    const s = configALS.getStore();
    return s ? s[prop] : undefined;
  },
  set(_, prop, val) {
    const s = configALS.getStore();
    if (s) s[prop] = val;
    return true;
  },
  has(_, prop) {
    const s = configALS.getStore();
    return s ? prop in s : false;
  }
});

// ── i18n globals: per-request context, safe under async concurrency ───────────
const _i18nDirty = {};  // { "prefix:lang": Set<key> } — pending writes in dev
const _i18nFlush = {};  // timers per "prefix:lang"

function _i18nAutoAdd(ctx, key) {
  if (process.env.NODE_ENV === 'production') return;
  const { localeData, prefix, locales } = ctx;
  locales.forEach(function(lang) {
    if (!localeData[lang]) localeData[lang] = {};
    if (key in localeData[lang]) return;
    localeData[lang][key] = key;
    const slot = prefix + ':' + lang;
    if (!_i18nDirty[slot]) _i18nDirty[slot] = new Set();
    _i18nDirty[slot].add(key);
    clearTimeout(_i18nFlush[slot]);
    _i18nFlush[slot] = setTimeout(function() {
      const path = __dirname + '/locales/' + prefix + '/' + lang + '.json';
      try {
        const existing = JSON.parse(fs.readFileSync(path, 'utf8'));
        _i18nDirty[slot].forEach(function(k) { if (!(k in existing)) existing[k] = k; });
        fs.writeFileSync(path, JSON.stringify(existing, null, 2) + '\n');
        _i18nDirty[slot].clear();
      } catch(e) {}
    }, 500);
  });
}

global.__ = function(key) {
  const ctx = i18nCtxALS.getStore();
  if (!ctx) return key;
  const { localeData, lang, defaultLang } = ctx;
  const val = (localeData[lang] && localeData[lang][key]) ||
              (lang !== defaultLang && localeData[defaultLang] && localeData[defaultLang][key]) ||
              null;
  if (!val) _i18nAutoAdd(ctx, key);
  return val || key;
};

global.__n = function(singular, plural, count) {
  return count === 1 ? singular : plural;
};

global.setLocale = function(lang) {
  const ctx = i18nCtxALS.getStore();
  if (ctx) ctx.lang = lang;
};

global.getLocale = function() {
  const ctx = i18nCtxALS.getStore();
  return ctx ? ctx.lang : 'en';
};

// ── Load all site configs ─────────────────────────────────────────────────────
const rawConfig = require('config');
const SITES = Object.keys(rawConfig).filter(function(k) {
  return rawConfig[k] && rawConfig[k].prefix;
});

const allConfigs = {};
SITES.forEach(function(site) {
  const cfg = JSON.parse(JSON.stringify(rawConfig[site]));
  cfg.root = __dirname;

  const acc = cfg.accounts;
  if (acc) {
    if (acc.emails && acc.emails.gmail) {
      acc.emails.gmail.user     = process.env.GMAIL_USER;
      acc.emails.gmail.password = process.env.GMAIL_PASSWORD;
    }
    if (acc.newsletter && 'api_key' in acc.newsletter) {
      acc.newsletter.api_key = process.env.NEWSLETTER_API_KEY;
    }
    if (acc.recaptcha) {
      const p = site.toUpperCase() + '_';
      acc.recaptcha.site_key   = process.env[p + 'RECAPTCHA_SITE_KEY']   || process.env.RECAPTCHA_SITE_KEY;
      acc.recaptcha.secret_key = process.env[p + 'RECAPTCHA_SECRET_KEY'] || process.env.RECAPTCHA_SECRET_KEY;
    }
    if (acc.facebook) {
      const p = site.toUpperCase() + '_';
      acc.facebook.client_secret = process.env[p + 'FACEBOOK_CLIENT_SECRET'];
    }
  }
  if (site === 'lpm') {
    cfg.PAYPAL_CLIENT_ID             = process.env.LPM_PAYPAL_CLIENT_ID;
    cfg.PAYPAL_CLIENT_SECRET         = process.env.LPM_PAYPAL_CLIENT_SECRET;
    cfg.PAYPAL_CLIENT_ID_SANDBOX     = process.env.LPM_PAYPAL_CLIENT_ID_SANDBOX;
    cfg.PAYPAL_CLIENT_SECRET_SANDBOX = process.env.LPM_PAYPAL_CLIENT_SECRET_SANDBOX;
    if (acc && acc.paypal_client_id !== undefined) acc.paypal_client_id = process.env.LPM_PAYPAL_CLIENT_ID;
  }

  allConfigs[site] = cfg;
});

// ── Load editions cache ────────────────────────────────────────────────────────
['lpm','lcf','chromosphere','digitalatium','visualsound','visualsoundacademy','fotonica','shockart','electrokids','mam'].forEach(function(site) {
  if (!allConfigs[site] || !allConfigs[site].meta) return;
  const file = __dirname + '/cache/' + site + '_editions.json';
  if (fs.existsSync(file)) {
    jsonfile.readFile(file, function(err, obj) {
      if (!err) allConfigs[site].meta.editions = obj;
    });
  }
});

// ── Load locale JSON files per site ───────────────────────────────────────────
const localeData = {};
SITES.forEach(function(site) {
  const cfg = allConfigs[site];
  localeData[site] = {};
  (cfg.locales || [cfg.default_lang || 'en']).forEach(function(lang) {
    try {
      localeData[site][lang] = JSON.parse(
        fs.readFileSync(__dirname + '/locales/' + cfg.prefix + '/' + lang + '.json', 'utf8')
      );
    } catch(e) {
      localeData[site][lang] = {};
    }
  });
});

// ── Site detection map (production hostname + local_domain for dev) ────────────
const hostnameMap = {};
SITES.forEach(function(site) {
  const cfg = allConfigs[site];
  [cfg.domain, cfg.local_domain].forEach(function(domainStr) {
    if (!domainStr) return;
    try {
      const h = new URL(domainStr).hostname;
      hostnameMap[h] = site;
      hostnameMap['www.' + h] = site;
    } catch(e) {}
  });
});

function detectSite(req) {
  return hostnameMap[req.hostname] || null;
}

// ── Express app ───────────────────────────────────────────────────────────────
const app = express();
app.root = __dirname;

// ── Build per-site routers ─────────────────────────────────────────────────────
const siteRouters = {};
SITES.forEach(function(site) {
  const router = express.Router();
  try {
    require('./app/routes/' + allConfigs[site].router)(router);
    siteRouters[site] = router;
  } catch(e) {
    console.error('[' + site + '] router load failed:', e.message);
  }
});

// ── Setup: session, body-parser, helmet, static files ────────────────────────
require('./setup')(app, express);

// ── Per-request dispatch ──────────────────────────────────────────────────────
app.use(function(req, res, next) {
  const site = detectSite(req);
  if (!site || !siteRouters[site]) return next();

  const siteConfig = allConfigs[site];
  const i18nCtx = {
    localeData:  localeData[site] || {},
    lang:        siteConfig.default_lang || 'en',
    defaultLang: siteConfig.default_lang || 'en',
    prefix:      siteConfig.prefix,
    locales:     siteConfig.locales || [siteConfig.default_lang || 'en']
  };

  configALS.run(siteConfig, function() {
    i18nCtxALS.run(i18nCtx, function() {
      siteRouters[site](req, res, next);
    });
  });
});

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || '3000', 10);

const server = app.listen(PORT, function() {
  console.log('Single-instance server on port ' + PORT + ' [' + SITES.length + ' sites] in ' + process.env.NODE_ENV + ' mode');
});

if (process.env.NODE_ENV === 'dev') server.timeout = 480000;
