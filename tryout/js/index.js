$(function () {
	var editor = ace.edit("editor");
	editor.getSession().setMode("ace/mode/javascript");
	editor.moveCursorTo(1, 14);
	editor.focus();

	var request = JSON.stringify({
		url: "http://www.google.nl/",
		method: "GET"
	});
	$.post("https://smallproxy.herokuapp.com/", request, function (result, status, jqHXR) {
		if (jqHXR.status !== 200) {
			$("#runButton").text("Proxy is broken af");
		} else {
			$("#runButton")
				.prop("disabled", false)
				.val("RUN!");
		}
	}).fail(function(e){
		$("#runButton").text("Can't reach proxy.");
	});

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
