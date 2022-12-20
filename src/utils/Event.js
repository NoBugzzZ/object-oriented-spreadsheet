class EventEmitter {
  constructor(name = "") {
    this.queue = {};
    this.name = name;
  }
  on(event, callback) {
    if (!(this.queue.hasOwnProperty(event))) {
      this.queue[event] = [];
    }
    this.queue[event].push(callback);
    // console.log("[on] ", event);
  }
  emit(event,...params) {
    // console.log("[emit]", event)
    if (this.queue.hasOwnProperty(event)) {
      this.queue[event].forEach(callback => callback(...params))
    }
  }
}
export default EventEmitter;
// const event=new EventEmitter("test");
// event.on("event",(a,b)=>{
//   const c=a+b;
//   return c;
// })
// console.dir(event,{depth:null})