import { test, module } from 'qunit';
import PouchDB from 'pouchdb';

module('Unit | pouchdb exports');

test('pouchdb exports', (assert) => {
  assert.ok(PouchDB, 'pouchdb exports an object');
});

test('pouchdb-find is loaded', (assert) => {
  let db = new PouchDB('MyDB', { adapter: 'memory' });
  assert.ok(typeof db.find === 'function', 'pouchdb#find is a function');
});
