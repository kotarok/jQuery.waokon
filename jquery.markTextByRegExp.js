/**
 * @param query {RegExp}
 * @wrapElement wrapElement {jQuery}
 **/
(function($) {
	$.fn.markTextByRegExp = function(query,wrapElement){
		var REtag = '<\\/?[^>]+?\\/?>';
		var REtagDivider = new RegExp(REtag+'|[^<>]*','gi');
		return this.each(function(){
			var elem = $(this);

			var srcs = elem.html().match(REtagDivider);
			for(var i=0,l=srcs.length;i<l;i++){
				var obj = srcs[i];
				if(!RegExp(REtag).test(obj)){
					srcs[i] = obj.replace(query,function(matched){
						return $('<div />').append(wrapElement.html(matched)).html();
					})
				}
			}
			elem.html(srcs.join(''));
		})
	}
})(jQuery);