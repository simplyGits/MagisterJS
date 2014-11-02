function smartTrans (selector, className) {
	$(selector).addClass(className);
	$(selector).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
		$(selector).css({ overflow: "auto" });
	});
}

$(function () {
	var editor = ace.edit("editor");
	editor.getSession().setMode("ace/mode/javascript");
	editor.moveCursorTo(0, 14);
	editor.focus();
	
	setTimeout(function () {
		smartTrans("h1, input", "animate");
	}, 0);
	
	$("#runButton").click(function () {
		eval(editor.getValue());
	});
});
