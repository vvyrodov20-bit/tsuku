(function (root) {
  'use strict';
  // Public configuration only. Affiliate destinations and secrets belong on the server.
  const games = [
    { id: 'falling-pickaxe', name: 'FALLING PICKAXE', image: 'assets/falling-pickaxe-cutout.png', number: '01' },
    { id: 'ice-fishing', name: 'ICE FISHING', image: 'assets/ice-fishing.png', number: '02' },
    { id: 'tower-rush', name: 'TOWER RUSH', image: 'assets/tower-rush-cutout.png', number: '03' },
  ];
  const sources = {
    tt1: 'TikTok · Brasil', tt2: 'TikTok · Chile',
    ig1: 'Instagram · falling.pickaxe1', fb1: 'Facebook · Matias Gonzales',
  };
  const config = Object.freeze({ games: Object.freeze(games), sources: Object.freeze(sources) });
  if (typeof module !== 'undefined' && module.exports) module.exports = config;
  else root.HubConfig = config;
})(typeof window !== 'undefined' ? window : globalThis);
