(function (root) {
  'use strict';
  // Public configuration only. Affiliate destinations and secrets belong on the server.
  const games = [
    { id: 'cash-farming', name: 'CASH FARMING', image: 'assets/cash-farming.png', number: '01', catalogOnly: true },
    { id: 'falling-pickaxe', name: 'FALLING PICKAXE', image: 'assets/falling-pickaxe-cutout.png', number: '02' },
    { id: 'ice-fishing', name: 'ICE FISHING', image: 'assets/ice-fishing.png', number: '03' },
    { id: 'tower-rush', name: 'TOWER RUSH', image: 'assets/tower-rush-cutout.png', number: '04' },
  ];
  const sources = {
    tt1: 'TikTok · Brasil', tt2: 'TikTok · Chile', yt1: 'YouTube · GAMEBOYS CLIPS',
    ig1: 'Instagram · falling.pickaxe1', ig2: 'Instagram · falling.pickaxe2',
    fb1: 'Facebook · Matias Gonzales',
    ctg1: 'Facebook · Crazy Time Community',
    ctg2: 'Facebook · Crazy Time Bonus Games',
    ctg3: 'Facebook · Crazy Time Results & Statistics',
    ctg4: 'Facebook · Crazy Time Brasil',
    ctg5: 'Facebook · Crazy Time en Español',
  };
  const config = Object.freeze({ games: Object.freeze(games), sources: Object.freeze(sources) });
  if (typeof module !== 'undefined' && module.exports) module.exports = config;
  else root.HubConfig = config;
})(typeof window !== 'undefined' ? window : globalThis);
