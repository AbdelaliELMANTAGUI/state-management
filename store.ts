class Store {
    private static instance = new Store()
    private state:any = {}
    private events:any = {}

    // disable it
    private constructor() {}
    private setInitialState(state:object){
        this.state = {...state}
    }
    // instanciat one time in its life
    public static init(initState:object) {
        let {instance} = Store
        instance.setInitialState(initState)
        return instance
    }
    private deepFreeze(o) {
    Object.freeze(o);
    Object.keys(o).forEach((key) => {
      if (
        o.hasOwnProperty(key) &&
        o[key] !== null &&
        (typeof o[key] === "object" || typeof o[key] === "function") &&
        !Object.isFrozen(o[key])
      ) {
        this.deepFreeze(o[key]);
      }
    });

    return o;
  }
    on(eventName:string,cb:(()=>any)){
        if(typeof cb !== "function"){
            console.error("on( ,2nd arg must be a function)")
            return false
        }
        console.log(this.events.hasOwnProperty(eventName),)
        if(!this.events.hasOwnProperty(eventName)){
            this.events[eventName] = []
        }        
        this.events[eventName].push({cb})
        return true;
    }
    emit(eventName:string,payload:(object|((par)=>any))){
        if (typeof payload == "function") payload = payload(this.deepFreeze(this.state));
        if (Object.prototype.toString.call(payload) !== "[object Object]") {
            console.error("Payload should be an object");
            return false;
        }
        if (!this.events.hasOwnProperty(eventName)) {
            console.error(`Event "${eventName}" does not exists`);
            return false;
        }
        this.state = { ...this.state, ...payload };
        this.events[eventName].forEach(({ cb }) => {
            cb(this.deepFreeze(this.state));
        });
        return true;
    }
}