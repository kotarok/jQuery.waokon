(function($) {
	$.fn.waokon = function(){
		var noLeftMarginWith = /[、。：；「」）！？＃＄％＆’＠]$/;
		var noRightMarginWith = /^[、。：；「」（！？＃＄％’℃€￡￠‰Å㏋㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡]/;
		var romanString = /[\w\s\.,"'+-=*\/!#\$%\|@&;:\[\]\{\}<>°'″′“”‘’]+/ig;
		var romanClass = 'waokon';
		var numberClass = 'waokonNumber';
		var shortMarginClass = 'shortMargin';
		var noLeftMarginClass = 'noLeftMargin';
		var noRightMarginClass = 'noRightMargin';
		var langIdentifier = 'en';

		return this.each(function(){
			var elem = $(this);

			elem.markTextByRegExp(romanString,$('<span class="'+romanClass+'" lang="'+langIdentifier+'" />'));
			$('.'+romanClass, elem).markTextByRegExp(/[\d,\.\s-]+/, $('<span class="'+numberClass+'" />'));

			var nodes = elem.contents();

			var trimSpace = function(_elem){
				var text = elem.text();
				elem.text(text.replace(/^\s+?([^\s]+)\s+$/,RegExp.$1))
			}

			var isNumber = function(){
				if(/^[\d,\.\s-]+$/.test($(nodes[i]).text())){
					return true;
				}
				return false;
			}

			var isShortMargin = function(i){
				if(/[\d\.,\(\)\/]+|^\w{1,3}$/.test($(nodes[i]).text())){
					return true;
				}
				return false;
			}

			var isNoLeftMargin = function(i){
				if(i==0){
					if(elem.css('display') == 'block'){
						return true;
					}else if(elem.is(':first-child') && elem.parent().css('display') == 'block'){
						return true;
					}
				}else if(noLeftMarginWith.test($(nodes[i-1]).text()) || noLeftMarginWith.test(nodes[i-1].data)){
					return true;
				}
				return false;
			}

			var isNoRightMargin= function(i){
				if(i<l-1 && typeof(nodes[i+1]) == 'object'){
					if(noRightMarginWith.test($(nodes[i+1]).text()) || noRightMarginWith.test(nodes[i+1].data) || $(nodes[i+1]).is('sub,sup')){
						return true;
					}
				}
				return false;
			}

			for(var i=0,l=nodes.length;i<l;i++){
				var node = $(nodes[i]);
				if(node.is('.'+romanClass)){
					//trimSpace(node);

					if(isNumber(i)){
						node.addClass(numberClass)
					}
					if(isShortMargin(i)){
						node.addClass(shortMarginClass)
					}
					if(isNoLeftMargin(i)){
						node.addClass(noLeftMarginClass)
					}
					if(isNoRightMargin(i)){
						node.addClass(noRightMarginClass)
					}
				}
			}

		});
	};
})(jQuery);