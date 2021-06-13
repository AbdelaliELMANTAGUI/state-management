var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Store = /** @class */ (function () {
    // disable it
    function Store() {
        this.state = {};
        this.events = {};
    }
    Store.prototype.setInitialState = function (state) {
        this.state = __assign({}, state);
    };
    // instanciat one time in its life
    Store.init = function (initState) {
        var instance = Store.instance;
        instance.setInitialState(initState);
        return instance;
    };
    Store.prototype.deepFreeze = function (o) {
        var _this = this;
        Object.freeze(o);
        Object.keys(o).forEach(function (key) {
            if (o.hasOwnProperty(key) &&
                o[key] !== null &&
                (typeof o[key] === "object" || typeof o[key] === "function") &&
                !Object.isFrozen(o[key])) {
                _this.deepFreeze(o[key]);
            }
        });
        return o;
    };
    Store.prototype.on = function (eventName, cb) {
        if (typeof cb !== "function") {
            console.error("on( ,2nd arg must be a function)");
            return false;
        }
        console.log(this.events.hasOwnProperty(eventName));
        if (!this.events.hasOwnProperty(eventName)) {
            this.events[eventName] = [];
        }
        this.events[eventName].push({ cb: cb });
        return true;
    };
    Store.prototype.emit = function (eventName, payload) {
        var _this = this;
        if (typeof payload == "function")
            payload = payload(this.deepFreeze(this.state));
        if (Object.prototype.toString.call(payload) !== "[object Object]") {
            console.error("Payload should be an object");
            return false;
        }
        if (!this.events.hasOwnProperty(eventName)) {
            console.error("Event \"" + eventName + "\" does not exists");
            return false;
        }
        this.state = __assign(__assign({}, this.state), payload);
        this.events[eventName].forEach(function (_a) {
            var cb = _a.cb;
            cb(_this.deepFreeze(_this.state));
        });
        return true;
    };
    Store.instance = new Store();
    return Store;
}());
