const throttle = (funcToCall, timeInterval) => {
    // initially gun is neither loaded nor overheated
    let isOverheated = false;
    let isLoaded = false;
  ​
    function shoot() {
      // when gun is shot it is overheated and not loaded
      isOverheated = true;
      isLoaded = false;
  ​
      // after timeInterval elapses,
      // gun should shoot if loaded
      // otherwise, it's no longer overheated
      setTimeout(() => {
        if (isLoaded) shoot();
        else isOverheated = false;
      }, timeInterval);
  ​
      // call funcToCall
      funcToCall();
    }
  ​
    // returned function will shoot gun if not overheated,
    // otherwise it will load gun
    return function () {
      if (!isOverheated) shoot();
      else isLoaded = true;
    };
  };