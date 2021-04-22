var _cartstack = _cartstack || [];
var cartstack_trackVisitor = 1;
_cartstack.push(['setSiteID', 'k49dWltK']); /* required */

var cartstack_cartPageURL = '_finalize.main';
var cartstack_checkoutPageURLs = ['','',''];
var cartstack_successPageURL = '/IBE5_EXT.CHECK_ITIN';
var cartstack_isconfirmation = 0;
var cartstack_debug = 0;

var cartstack_pageurl = window.location.href.toLowerCase();

var cartstack_cartTotal = '';
var cartstack_dataItems = [];
var cartstack_tracking = 0;

if (cartstack_cartPageURL.length > 0 && cartstack_pageurl.indexOf(cartstack_cartPageURL.toLowerCase()) >= 0)
{
  _cartstack.push(['setAPI', 'tracking']);
  cartstack_tracking = 1;
  cartstack_cartTotal = 'span#totinfinal';
  //cartstack_dataItems.push(["ArrivalDate","div.room-detail-1 p:1"],["DepartureDate","div.room-detail-1 p:2"]);
  if (cartstack_debug) { console.log('cs: track-cart'); }
}
else if (cartstack_successPageURL.length > 0 && cartstack_pageurl.indexOf(cartstack_successPageURL.toLowerCase()) >= 0)
{
  _cartstack.push(['setAPI', 'confirmation']);
  cartstack_isconfirmation = 1;
  if (cartstack_debug) { console.log('cs: confirmation'); }
}
else
{
  var cartstack_checkoutURLExists = 0;
  for (var i=0; i<cartstack_checkoutPageURLs.length; i++)
  {
    var cartstack_checkoutPageURL = cartstack_checkoutPageURLs[i].toLowerCase();
    if (cartstack_checkoutPageURL.length > 0 && cartstack_pageurl.indexOf(cartstack_checkoutPageURL) >= 0)
    {
      cartstack_checkoutURLExists = 1;
    }
  }

  if (cartstack_checkoutURLExists)
  {
    _cartstack.push(['setAPI', 'tracking']);
    if (cartstack_debug) { console.log('cs: track-checkout'); }
  }
  else
  {
    _cartstack.push(['setAPI', 'capture']);
    if (cartstack_debug) { console.log('cs: capture'); }
  }
}

function cartstack_getTracking()
{
	(function(){
		
		if (typeof cartstack_getElement != 'undefined')
		{
			var _arrivalDate = cartstack_getElement("", "div.room-description div.cs_c:room-detail-1 p:1", false);
			var _departDate = cartstack_getElement("", "div.room-description div.cs_c:room-detail-1 p:2", false);
			
			if (_arrivalDate != '')
			{
				var _arrivalDatePieces = _arrivalDate.innerHTML.replace('  ', ' ').split('<br>');
				
				if (_arrivalDatePieces.length > 1)
				{
					_arrivalDatePieces = _arrivalDatePieces[1].split(' ');
					_arrivalDate = _arrivalDatePieces[1].replace(',', '')+'-'+_arrivalDatePieces[0].toUpperCase()+'-'+_arrivalDatePieces[2].substr(2);
					
					
					_cartstack.push(["setDataItem", { "ArrivalDate" : _arrivalDate }]);
				}
			}
			
			if (_departDate != '')
			{
				var _departDatePieces = _departDate.innerHTML.replace('  ', ' ').split('<br>');
				
				if (_departDatePieces.length > 1)
				{
					_departDatePieces = _departDatePieces[1].split(' ');
					_departDate = _departDatePieces[1].replace(',', '')+'-'+_departDatePieces[0].toUpperCase()+'-'+_departDatePieces[2].substr(2);
					
					_cartstack.push(["setDataItem", { "DepartureDate" : _departDate }]);
				}
			}
		}
		
		if (typeof cartstack_regex != 'undefined')
		{
			var _email = document.getElementById('email');
			
			if (_email && _email.value.length > 0 && cartstack_regex.test(_email.value))
			{
			  _cartstack.push(['setEmail', _email.value]);
			}
		}
	})();
}

(function(){var y = document.getElementsByTagName('script');var l=1;for(var i=0; i < y.length; i++){if (y[i].src == 'https://api.cartstack.com/js/cartstack_utility.js'){l=0;}}if(l){var s = document.createElement('script');s.type = 'text/javascript';s.async = true;s.src = 'https://api.cartstack.com/js/cartstack_utility.js';var x = document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);}})();

(function(){function cartstack_load(){var y = document.getElementsByTagName('script');var l=1;for(var i=0; i < y.length; i++){if (y[i].src == 'https://api.cartstack.com/js/cartstack.js'){l=0;}}if(l){var s = document.createElement('script');s.type = 'text/javascript';s.async = true;s.src = 'https://api.cartstack.com/js/cartstack.js';var x = document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);}}if(cartstack_isconfirmation){cartstack_load();}else{var _interval=setInterval(function(){if(document.readyState==='complete'){clearInterval(_interval);cartstack_load();}},1000);}})();