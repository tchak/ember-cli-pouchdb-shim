const isFastBoot = typeof FastBoot !== 'undefined';

const PouchDB = isFastBoot ? FastBoot.require('pouchdb')
  .plugin(FastBoot.require('pouchdb-find'))
  .defaults({ db: FastBoot.require('memdown') }) : self.PouchDB;

export default PouchDB;
