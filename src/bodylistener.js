export const bodylistener = {
  init: function () {
    window.testrunIteration = 0
    $('body').on("click", ".js-icon", function(e) {
      updateHiddenField($(this));
    })

    function updateHiddenField(element) {
      window.testrunIteration++
      console.log('### testrunIteration: ' + window.testrunIteration)
      const passw = document.querySelector('.js-passw');
      const passwVal = passw.value || '';
      const passwNumb = element.data('passw');

      console.log(`### before passwVal: '${passwVal}' ### value + new: ${passwVal} + ${passwNumb} => ${passwVal}${passwNumb}`);
      passw.value = (`${passwVal}${passwNumb}`);
      console.log(passw.value)
    }
  }
}


// When page loads init component
let ready = function(f){
  /in/.test(document.readyState) ? setTimeout(function () { ready(f);}, 9) : f();
}

ready(bodylistener.init);
