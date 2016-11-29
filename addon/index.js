
export default class PouchDB extends BaseClass() {
  constructor(name, options = {}) {
    if (isFastBoot && options.adapter === 'memory') {
      options.db = FastBoot.require('memdown');
      delete options.adapter;
    }

    super(name, options);
  }
}

const isFastBoot = typeof FastBoot !== 'undefined';

function BaseClass() {
  if (isFastBoot) {
    return FastBoot.require('pouchdb')
      .plugin(FastBoot.require('pouchdb-find'));
  }

  return self.PouchDB;
}
