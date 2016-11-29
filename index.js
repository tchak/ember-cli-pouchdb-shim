/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

module.exports = {
  name: 'pouchdb',

  included(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;

    if (!isFastBoot()) {
      this.importBrowserDependencies(app);
    }

    return app;
  },

  importBrowserDependencies(app) {
    if (arguments.length < 1) {
      throw new Error('Application instance must be passed to import');
    }

    var vendor = this.treePaths.vendor;

    app.import({
      development: vendor + '/pouchdb/pouchdb.js',
      production: vendor + '/pouchdb/pouchdb.min.js'
    });

    app.import({
      development: vendor + '/pouchdb/pouchdb.memory.js',
      production: vendor + '/pouchdb/pouchdb.memory.min.js'
    });

    app.import({
      development: vendor + '/pouchdb/pouchdb.find.js',
      production: vendor + '/pouchdb/pouchdb.find.min.js'
    });
  },

  treeForVendor(vendorTree) {
    if (isFastBoot()) {
      return vendorTree;
    } else {
      return this.treeForBrowserVendor(vendorTree);
    }
  },

  treeForBrowserVendor(vendorTree) {
    var trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(moduleToFunnel('pouchdb'));
    trees.push(moduleToFunnel('pouchdb-find'));

    return mergeTrees(trees);
  }
};

function moduleToFunnel(moduleName) {
  return new Funnel(resolveModulePath(moduleName), {
    srcDir: 'dist',
    destDir: 'pouchdb',
    include: [new RegExp(/\.js$/)]
  });
}

function resolveModulePath(moduleName) {
  return path
    .dirname(require.resolve(moduleName))
    .replace(/lib$/, '');
}

// Checks to see whether this build is targeting FastBoot. Note that we cannot
// check this at boot time--the environment variable is only set once the build
// has started, which happens after this file is evaluated.
function isFastBoot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}
