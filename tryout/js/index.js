$(function () {
	var editor = ace.edit("editor");
	editor.getSession().setMode("ace/mode/javascript");
	editor.moveCursorTo(1, 14);
	editor.focus();

	setTimeout(function () {
		$("h1, input").addClass("animate");
	}, 0);

	$("#runButton").click(function () {
		eval(editor.getValue());
	});

	editor.on("change", function () { // Leave warning when file is edited.
		window.onbeforeunload = function () { return "You've edited the file."; }
	});
});
