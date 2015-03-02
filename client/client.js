'use strict';
var React = require('react'),
    Router = require('common/components/Router'),
    debug = require('debug')('freecc:client'),
    HistoryLocation = require('react-router').HistoryLocation,

    ContextStore = require('common/components/context/Store'),
    ContextActions = require('common/components/context/Actions');

var mountNode = document.getElementById('app');

debug('Matching Route');

ContextStore
  .filter(function(ctx) {
    return !!ctx.Handler;
  })
  .subscribe(function(ctx) {
    debug('rendering %s...', ctx.state.path);
    React.render(ctx.Handler(), mountNode, function() {
      debug('React rendered!');
    });
  });

Router(HistoryLocation)
  .run(function(Handler, state) {

    debug('Route found, %s rendering..', state.path);
    Handler = React.createFactory(Handler);
    var ctx = {
      Handler: Handler,
      state: state
    };
    ContextActions.setContext(ctx);
  });
