var items = [
	"node.js",
	"meteor",
	"browserside"
];
var current = 0;

$(function () {
	setInterval(function () {
		$("div#frameworks").animate({ opacity: 0 }, 1000, function (){
			$(this)
				.text(items[current++ % items.length])
				.animate({opacity: 1}, 1000);
		});
	}, 3000);
});