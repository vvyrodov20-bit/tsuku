'use strict';
const { randomUUID } = require('node:crypto');
const prefix = () => (process.env.TRACKING_NAMESPACE || 'gamehub:v2') + ':';
const key = value => prefix() + value;
async function command(...args) {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw Object.assign(new Error('Tracking storage is not configured'), { code: 'storage_unconfigured' });
  const response = await fetch(url.replace(/\/$/, ''), {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args), signal: AbortSignal.timeout(5000),
  });
  const data = await response.json();
  if (!response.ok || data.error) throw Object.assign(new Error('Tracking storage unavailable'), { code: 'storage_unavailable' });
  return data.result;
}
async function get(name) {
  const value = await command('GET', key(name));
  return value == null ? null : JSON.parse(value);
}
async function set(name, value) { return command('SET', key(name), JSON.stringify(value)); }
async function withLock(name, callback) {
  const lockKey = key('lock:' + name), token = randomUUID();
  let acquired = false;
  for (let i = 0; i < 15; i++) {
    if (await command('SET', lockKey, token, 'NX', 'PX', 60000)) { acquired = true; break; }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  if (!acquired) throw Object.assign(new Error('Visitor is being updated'), { code: 'busy', retryAfter: 2 });
  const assertOwned = async () => {
    if (await command('GET', lockKey) !== token) throw Object.assign(new Error('Lock expired'), { code: 'busy', retryAfter: 2 });
  };
  try { return await callback(assertOwned); }
  finally {
    await command('EVAL', "if redis.call('GET',KEYS[1]) == ARGV[1] then return redis.call('DEL',KEYS[1]) else return 0 end", 1, lockKey, token).catch(() => {});
  }
}
async function nextNumber() { return command('INCR', key('visitor-number')); }
module.exports = { get, set, command, key, withLock, nextNumber };
