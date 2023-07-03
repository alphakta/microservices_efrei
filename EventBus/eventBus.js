export const EventBus = {
    subscribers: {
        any: []
    },

    subscribe: function (type, fn) {
        type = type || 'any';
        if (typeof this.subscribers[type] === 'undefined') {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(fn);
    },

    unsubscribe: function (type, fn) {
        if(!this.subscribers[type]) return;
        for (let i = 0; i < this.subscribers[type].length; i++) {
            if (this.subscribers[type][i] === fn) {
                this.subscribers[type].splice(i, 1);
            }
        }
    },

    publish: function (type, ...args) {
        if(!this.subscribers[type]) return;
        for (let i = 0; i < this.subscribers[type].length; i++) {
            this.subscribers[type][i](...args);
        }
    }
}