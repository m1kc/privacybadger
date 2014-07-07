console.log('hi from domain exception');

chrome.runtime.onConnect.addListener(
  function(port){

    port.onMessage.addListener(function(msg){
      var dialog = '<div id="pbDialog" class="privacyBadgerDialog">' +
      '<div id="pbLogo"><img src="' + chrome.extension.getURL("icons/badger-48.png") + '"></div>'+
      '<h2>Privacy Badger Alert!</h2>' +
      '<div class="clear"></div>' +
      '<h3>Logging into ' + msg.whitelistDomain + ' can allow them to track you around the web.</h3>' +
      '<button class="pbButton" id="allow_all">Always allow ' + msg.whitelistDomain + '.</button>' +
      '<button class="pbButton" id="allow_once">Only allow ' + msg.whitelistDomain + ' on this site.</button>' +
      '<button class="pbButton" id="never">Continue blocking ' + msg.whitelistDomain + ' for now.</button>' +
      '</div>';
      if(msg.action == "attemptWhitelist"){
        console.log('attempting whitelist');
        var body = document.getElementsByTagName('body')[0];
        var diagBox = document.createElement('div');
        diagBox.innerHTML = dialog;
        body.appendChild(diagBox);
        var buttons = document.getElementsByClassName("pbButton");
        for(var i =0; i < buttons.length; i++){
          var elem = buttons[i];   
          elem.addEventListener('mouseup',function(e){
            var action = e.currentTarget.id;
            port.postMessage({action: action});

            diagBox.parentNode.removeChild(diagBox);
            for (var prop in diagBox) { delete diagBox[prop]; }

            return false;
          })
        }
      }
    });

  }
);

