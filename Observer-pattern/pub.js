// https://refactoring.guru/design-patterns/observer
// https://dev.to/jucian0/pub-sub-pattern-a-brief-explanation-21ed
// subscribe to particular event data, not all events 
// subscribe to your interest only
/**
 * subscribe - this method helps a client to subscribe to a particular event and whenever that event is fired,
 * we execute callback. It should return method which when called unsubscribes the client from the event.
 * 
 * publish - this method helps to fire an event with some data. All subscriber get activated when event is published.
 * pub sub similar to event listener in frontend
 * 
 * There can be multiple subscribers for a single event. when stores(publisher) publish event, 
 * all subscribers get notified
 * 
 * multiple subscribers | entities can subscribe to a single event
 * But Every entity will be subscribing with its own callback
 * (means different actions will be performed when common event is fired)
 * 
 * one event has many subscribers
 */



class PubSub{

    constructor(){
        this.subscribers = {

        };  // {'event1': [callback1, callback2]...}  for each event, we have array of callbacks
    }


    /**
    * @param event -> string denoting unique event fired
    * @param callback -> a callback function to be executed when event is fired
    */

    subscribe(event, callback){
        // if no event is registered, create a new event
        if (!this.subscribers[event]){
            // Currently no subscribers callback was registered for this event
            this.subscribers[event] = [];

        }
        this.subscribers[event].push(callback);
        // return a method which when called unsubscribes the client from the event
        // first class function - function can be returned from another function
        return () => this.unsubscribe(event, callback);

    }

    unsubscribe(event, callback){
        // check if event was registered or not you are trying to unsubscribe
        if (!this.subscribers[event]){
            return;
        }

        // if event was registered, remove the callback from the event
      this.subscribers[event] = this.subscribers[event].filter(cb => cb !== callback);

    }

    /**
     * @param event -> string denoting unique event fired
     * @param data ->  For the given event, what data to be passed along with publishing the event 
     * 
     */

    publish(event, data){

        // if no subscribers are registered for the event, return
        if (!this.subscribers[event]){
           return;
        }

        this.subscribers[event].forEach(callback => {
                callback(data);
            });

    }
}

const pubSub = new PubSub();
const unsubIphone13A = pubSub.subscribe('iphone13', (data) => {
    console.log("Subscriber A: I am interested in iphone13", data);
});
const unsubIphone13B = pubSub.subscribe('iphone13', (data) => {
    console.log("Subscriber B: I am interested in iphone13", data);
});

const unsubIphone15A = pubSub.subscribe('iphone15', (data) => {
    console.log("Subscriber A: I am interested in iphone15", data);
});





// publish event iphone13 - fire an event for iphone13
console.log('Before Unsubscribed by A');
pubSub.publish('iphone13', {name: 'iphone13', price: 1000});
pubSub.publish('iphone15', {name: 'iphone15', price: 1500});

// unsubscribe iphone13A
unsubIphone13A();
console.log('After Unsubscribed by A');

pubSub.publish('iphone13', {name: 'iphone13', price: 1000});

/**
 * 
 * Output:
 *  Subscriber 1: I am interested in iphone13 { name: 'iphone13', price: 1000 }
 *  Subscriber 2: I am interested in iphone13 { name: 'iphone13', price: 1000 }
 *  Subscriber 1: I am interested in iphone15 { name: 'iphone15', price: 1500 }
 */