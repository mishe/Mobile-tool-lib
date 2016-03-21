/**
 * 阉割版的backbone
 * 只保留了event view history router模块
 *
 */

var Backbone = {};
Backbone.VERSION = '1.2.1';
Backbone.$ = $;

// Backbone.Events

var Events = Backbone.Events = {};

var eventSplitter = /\s+/;
var eventsApi = function (iteratee, memo, name, callback, opts) {
    var i = 0, names;
    if (name && typeof name === 'object') {
        // Handle event maps.
        if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
        for (names = _.keys(name); i < names.length; i++) {
            memo = iteratee(memo, names[i], name[names[i]], opts);
        }
    } else if (name && eventSplitter.test(name)) {
        // Handle space separated event names.
        for (names = name.split(eventSplitter); i < names.length; i++) {
            memo = iteratee(memo, names[i], callback, opts);
        }
    } else {
        memo = iteratee(memo, name, callback, opts);
    }
    return memo;
};

Events.on = function (name, callback, context) {
    return internalOn(this, name, callback, context);
};

var internalOn = function (obj, name, callback, context, listening) {
    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
        context: context,
        ctx: obj,
        listening: listening
    });
    if (listening) {
        var listeners = obj._listeners || (obj._listeners = {});
        listeners[listening.id] = listening;
    }
    return obj;
};

Events.listenTo = function (obj, name, callback) {
    if (!obj) return this;
    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
    var listeningTo = this._listeningTo || (this._listeningTo = {});
    var listening = listeningTo[id];

    if (!listening) {
        var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
        listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
    }

    internalOn(obj, name, callback, this, listening);
    return this;
};

var onApi = function (events, name, callback, options) {
    if (callback) {
        var handlers = events[name] || (events[name] = []);
        var context = options.context, ctx = options.ctx, listening = options.listening;
        if (listening) listening.count++;

        handlers.push({callback: callback, context: context, ctx: context || ctx, listening: listening});
    }
    return events;
};

Events.off = function (name, callback, context) {
    if (!this._events) return this;
    this._events = eventsApi(offApi, this._events, name, callback, {
        context: context,
        listeners: this._listeners
    });
    return this;
};

Events.stopListening = function (obj, name, callback) {
    var listeningTo = this._listeningTo;
    if (!listeningTo) return this;

    var ids = obj ? [obj._listenId] : _.keys(listeningTo);

    for (var i = 0; i < ids.length; i++) {
        var listening = listeningTo[ids[i]];

        if (!listening) break;

        listening.obj.off(name, callback, this);
    }
    if (_.isEmpty(listeningTo)) this._listeningTo = void 0;

    return this;
};

var offApi = function (events, name, callback, options) {
    if (!events) return;

    var i = 0, listening;
    var context = options.context, listeners = options.listeners;
    if (!name && !callback && !context) {
        var ids = _.keys(listeners);
        for (; i < ids.length; i++) {
            listening = listeners[ids[i]];
            delete listeners[listening.id];
            delete listening.listeningTo[listening.objId];
        }
        return;
    }

    var names = name ? [name] : _.keys(events);
    for (; i < names.length; i++) {
        name = names[i];
        var handlers = events[name];

        if (!handlers) break;

        var remaining = [];
        for (var j = 0; j < handlers.length; j++) {
            var handler = handlers[j];
            if (
                callback && callback !== handler.callback &&
                callback !== handler.callback._callback ||
                context && context !== handler.context
            ) {
                remaining.push(handler);
            } else {
                listening = handler.listening;
                if (listening && --listening.count === 0) {
                    delete listeners[listening.id];
                    delete listening.listeningTo[listening.objId];
                }
            }
        }

        if (remaining.length) {
            events[name] = remaining;
        } else {
            delete events[name];
        }
    }
    if (_.size(events)) return events;
};

Events.once = function (name, callback, context) {
    // Map the event into a `{event: once}` object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
    return this.on(events, void 0, context);
};

Events.listenToOnce = function (obj, name, callback) {
    // Map the event into a `{event: once}` object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
    return this.listenTo(obj, events);
};

var onceMap = function (map, name, callback, offer) {
    if (callback) {
        var once = map[name] = _.once(function () {
            offer(name, once);
            callback.apply(this, arguments);
        });
        once._callback = callback;
    }
    return map;
};

Events.trigger = function (name) {
    if (!this._events) return this;

    var length = Math.max(0, arguments.length - 1);
    var args = Array(length);
    for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

    eventsApi(triggerApi, this._events, name, void 0, args);
    return this;
};

var triggerApi = function (objEvents, name, cb, args) {
    if (objEvents) {
        var events = objEvents[name];
        var allEvents = objEvents.all;
        if (events && allEvents) allEvents = allEvents.slice();
        if (events) triggerEvents(events, args);
        if (allEvents) triggerEvents(allEvents, [name].concat(args));
    }
    return objEvents;
};

var triggerEvents = function (events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
        case 0:
            while (++i < l) (ev = events[i]).callback.call(ev.ctx);
            return;
        case 1:
            while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1);
            return;
        case 2:
            while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2);
            return;
        case 3:
            while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
            return;
        default:
            while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
            return;
    }
};
Events.bind = Events.on;
Events.unbind = Events.off;

_.extend(Backbone, Events);


// Backbone.View

var View = Backbone.View = function (options) {
    this.cid = _.uniqueId('view');
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
};

var delegateEventSplitter = /^(\S+)\s*(.*)$/;

var viewOptions = ['el', 'id', 'attributes', 'className', 'tagName', 'events'];

_.extend(View.prototype, Events, {

    tagName: 'div',

    $: function (selector) {
        return this.$el.find(selector);
    },

    initialize: function () {
    },

    render: function () {
        return this;
    },

    remove: function () {
        this._removeElement();
        this.stopListening();
        return this;
    },

    _removeElement: function () {
        this.$el.remove();
    },

    setElement: function (element) {
        // this.undelegateEvents();
        this._setElement(element);
        this.delegateEvents();
        return this;
    },

    _setElement: function (el) {
        this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
        this.el = this.$el[0];
    },

    delegateEvents: function (events) {
        events || (events = _.result(this, 'events'));
        if (!events) return this;
        this.undelegateEvents();
        for (var key in events) {
            var method = events[key];
            if (!_.isFunction(method)) method = this[method];
            if (!method) continue;
            var match = key.match(delegateEventSplitter);
            this.delegate(match[1], match[2], _.bind(method, this));
        }
        return this;
    },

    delegate: function (eventName, selector, listener) {
        this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
        return this;
    },

    undelegateEvents: function () {
        if (this.$el) {
            this.$el.off('.delegateEvents' + this.cid);
        } else if (this.el) {
            $(this.el).off();
        }
        return this;
    },

    undelegate: function (eventName, selector, listener) {
        this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
        return this;
    },
    _createElement: function (tagName) {
        return document.createElement(tagName);
    },

    _ensureElement: function () {
        if (!this.el) {
            var attrs = _.extend({}, _.result(this, 'attributes'));
            if (this.id) attrs.id = _.result(this, 'id');
            if (this.className) attrs['class'] = _.result(this, 'className');
            this.setElement(this._createElement(_.result(this, 'tagName')));
            this._setAttributes(attrs);
        } else {
            this.setElement(_.result(this, 'el'));
        }
    },

    _setAttributes: function (attributes) {
        this.$el.attr(attributes);
    }

});


// Backbone.Router

var Router = Backbone.Router = function (options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;

    this.initialize.apply(this, arguments);
    this._bindRoutes();
};

var optionalParam = /\((.*?)\)/g;
var namedParam = /(\(\?)?:\w+/g;
var splatParam = /\*\w+/g;
var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;


_.extend(Router.prototype, Events, {


    initialize: function () {
    },


    route: function (route, name, callback) {
        if (!_.isRegExp(route)) route = this._routeToRegExp(route);
        if (_.isFunction(name)) {
            callback = name;
            name = '';
        }
        if (!callback) callback = this[name];
        var router = this;

        Backbone.history.route(route, function (fragment) {
            //route before 陈材华添加
            router._beforeRoute && router._beforeRoute(name);
            var args = router._extractParameters(route, fragment);
            if (router.execute(callback, args, name) !== false) {
                router.trigger.apply(router, ['route:' + name].concat(args));
                router.trigger('route', name, args);
                Backbone.history.trigger('route', router, name, args);
            }
        });
        return this;

    },


    execute: function (callback, args, name) {
        if (callback) callback.apply(this, args);
    },


    navigate: function (fragment, options) {

        Backbone.history.navigate(fragment, options);
        return this;
    },

    _bindRoutes: function () {
        if (!this.routes) return;
        this.routes = _.result(this, 'routes');
        var route, routes = _.keys(this.routes);
        while ((route = routes.pop()) != null) {
            this.route(route, this.routes[route]);
        }
    },


    _routeToRegExp: function (route) {
        route = route.replace(escapeRegExp, '\\$&')
            .replace(optionalParam, '(?:$1)?')
            .replace(namedParam, function (match, optional) {
                return optional ? match : '([^/?]+)';
            })
            .replace(splatParam, '([^?]*?)');
//      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
//        陈材华 路由不区分大小写
        return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$', 'i');
    },

    _extractParameters: function (route, fragment) {
        var params = route.exec(fragment).slice(1);
        return _.map(params, function (param, i) {
            // Don't decode the search params.
            if (i === params.length - 1) return param || null;
            return param ? decodeURIComponent(param) : null;
        });
    }

});

// Backbone.History

var History = Backbone.History = function () {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    if (typeof window !== 'undefined') {
        this.location = window.location;
        this.history = window.history;
    }
};


var routeStripper = /^[#\/]|\s+$/g;


var rootStripper = /^\/+|\/+$/g;


var pathStripper = /#.*$/;


History.started = false;


_.extend(History.prototype, Events, {


    interval: 50,


    atRoot: function () {
        var path = this.location.pathname.replace(/[^\/]$/, '$&/');
        return path === this.root && !this.getSearch();
    },


    matchRoot: function () {
        var path = this.decodeFragment(this.location.pathname);
        var root = path.slice(0, this.root.length - 1) + '/';
        return root === this.root;
    },


    decodeFragment: function (fragment) {
        return decodeURI(fragment.replace(/%25/g, '%2525'));
    },


    getSearch: function () {
        var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
        return match ? match[0] : '';
    },


    getHash: function (window) {
        var match = (window || this).location.href.match(/#(.*)$/);
        return match ? match[1] : '';
    },


    getPath: function () {
        var path = this.decodeFragment(
            this.location.pathname + this.getSearch()
        ).slice(this.root.length - 1);
        return path.charAt(0) === '/' ? path.slice(1) : path;
    },


    getFragment: function (fragment) {
        if (fragment == null) {
            if (this._usePushState || !this._wantsHashChange) {
                fragment = this.getPath();
            } else {
                fragment = this.getHash();
            }
        }
        return fragment.replace(routeStripper, '');
    },


    start: function (options) {
        if (History.started) throw new Error('Backbone.history has already been started');
        History.started = true;


        this.options = _.extend({root: '/'}, this.options, options);
        this.root = this.options.root;
        this._wantsHashChange = this.options.hashChange !== false;
        this._hasHashChange = 'onhashchange' in window;
        this._useHashChange = this._wantsHashChange && this._hasHashChange;
        this._wantsPushState = !!this.options.pushState;
        this._hasPushState = !!(this.history && this.history.pushState);
        this._usePushState = this._wantsPushState && this._hasPushState;
        this.fragment = this.getFragment();


        this.root = ('/' + this.root + '/').replace(rootStripper, '/');


        if (this._wantsHashChange && this._wantsPushState) {


            if (!this._hasPushState && !this.atRoot()) {
                var root = this.root.slice(0, -1) || '/';
                this.location.replace(root + '#' + this.getPath());

                return true;


            } else if (this._hasPushState && this.atRoot()) {
                this.navigate(this.getHash(), {replace: true});
            }

        }


        if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
            this.iframe = document.createElement('iframe');
            this.iframe.src = 'javascript:0';
            this.iframe.style.display = 'none';
            this.iframe.tabIndex = -1;
            var body = document.body;
            // Using `appendChild` will throw on IE < 9 if the document is not ready.
            var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
            iWindow.document.open();
            iWindow.document.close();
            iWindow.location.hash = '#' + this.fragment;
        }


        var addEventListener = window.addEventListener || function (eventName, listener) {
                return attachEvent('on' + eventName, listener);
            };


        if (this._usePushState) {
            addEventListener('popstate', this.checkUrl, false);
        } else if (this._useHashChange && !this.iframe) {
            addEventListener('hashchange', this.checkUrl, false);
        } else if (this._wantsHashChange) {
            this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
        }

        if (!this.options.silent) return this.loadUrl();
    },


    stop: function () {

        var removeEventListener = window.removeEventListener || function (eventName, listener) {
                return detachEvent('on' + eventName, listener);
            };


        if (this._usePushState) {
            removeEventListener('popstate', this.checkUrl, false);
        } else if (this._useHashChange && !this.iframe) {
            removeEventListener('hashchange', this.checkUrl, false);
        }


        if (this.iframe) {
            document.body.removeChild(this.iframe);
            this.iframe = null;
        }


        if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
        History.started = false;
    },


    route: function (route, callback) {
        this.handlers.unshift({route: route, callback: callback});
    },

    checkUrl: function (e) {
        var current = this.getFragment();


        if (current === this.fragment && this.iframe) {
            current = this.getHash(this.iframe.contentWindow);
        }

        if (current === this.fragment) return false;
        if (this.iframe) this.navigate(current);
        this.loadUrl();
    },


    loadUrl: function (fragment) {

        if (!this.matchRoot()) return false;
        fragment = this.fragment = this.getFragment(fragment);
        return _.any(this.handlers, function (handler) {
            if (handler.route.test(fragment)) {
                handler.callback(fragment);
                return true;
            }
        });
    },


    navigate: function (fragment, options) {
        if (!History.started) return false;
        if (!options || options === true) options = {trigger: !!options};

        fragment = this.getFragment(fragment || '');


        var root = this.root;
        if (fragment === '' || fragment.charAt(0) === '?') {
            root = root.slice(0, -1) || '/';
        }
        var url = root + fragment;

        fragment = this.decodeFragment(fragment.replace(pathStripper, ''));

        if (this.fragment === fragment) return;
        this.fragment = fragment;

        if (this._usePushState) {
            this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);


        } else if (this._wantsHashChange) {
            this._updateHash(this.location, fragment, options.replace);
            if (this.iframe && (fragment !== this.getHash(this.iframe.contentWindow))) {
                var iWindow = this.iframe.contentWindow;


                if (!options.replace) {
                    iWindow.document.open();
                    iWindow.document.close();
                }

                this._updateHash(iWindow.location, fragment, options.replace);
            }


        } else {
            return this.location.assign(url);
        }
        if (options.trigger) return this.loadUrl(fragment);
    },


    _updateHash: function (location, fragment, replace) {
        if (replace) {
            var href = location.href.replace(/(javascript:|#).*$/, '');
            location.replace(href + '#' + fragment);
        } else {

            location.hash = '#' + fragment;
        }
    }

});


Backbone.history = new History;

// Helpers

var extend = function (protoProps, staticProps) {
    var parent = this;
    var child;


    if (protoProps && _.has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function () {
            return parent.apply(this, arguments);
        };
    }

    _.extend(child, parent, staticProps);

    var Surrogate = function () {
        this.constructor = child;
    };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;


    if (protoProps) _.extend(child.prototype, protoProps);


    child.__super__ = parent.prototype;

    return child;
};

Router.extend = View.extend = History.extend = extend;

module.exports = Backbone;

