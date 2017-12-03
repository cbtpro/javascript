var debounce = function(idle, action){
  var last
  return function(){
    var ctx = this, args = arguments
    clearTimeout(last)
    last = setTimeout(function(){
        action.apply(ctx, args)
    }, idle)
  }
}
window.onload = function() {
	var delayTime = document.getElementById('delayTime');
	var labelKey = document.getElementById('key');
	var labelKeyCode = document.getElementById('keyCode');
	var events = [];
	document.body.addEventListener('keydown', function() {
		events.push(arguments[0]);
		var action = function() {
			if(events.length > 0) {
				var key = '';
				var keyCode = '';
				var key = events.map(function(event) {
					return event.key===' '?'空格':event.key;
				});
				var keyCode = events.map(function(event) {
					return event.keyCode;
				});
				key = key.join(',');
				keyCode = keyCode.join(',');
				labelKey.innerHTML = key;
				labelKeyCode.innerHTML = keyCode;
				events = [];
			}
		};
		debounce(delayTime.value,action)();
	});
};