# State Management Functionality   
Make data change in ui when it's value change without extra code. the class Store do evrything for you.
## How it works 

1.  Init your state 
    ```js
       const store = Store.init(/*state*/)
    ```
2. Register an event 
    ```js
        store.on(/*eventName*/,/*callback:(state)=>{}*/)
    ```
3. Fire a Registred event 
    ```js
        store.emit(/*eventName*/,/*data can be an object or a function that return an object */)
    ```


### Clone the repo and enjoy 