export const throttle = (func:any, threshhold:any, scope?:any) => {
    threshhold || (threshhold = 250);
    let last:any, deferTimer:any;
    return function() {
      let context = scope || this;
  
      let now = Date.now(),
        args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function() {
          last = now;
          func.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        func.apply(context, args);
      }
    };
  };