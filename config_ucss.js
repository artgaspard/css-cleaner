//print unused rules found, together with positions in CSS file:

module.exports = {
	"result": function(result) {
		for (var s in result.selectors) {
			if (result.selectors[s].matches_html === 0) {
				var pos_css = result.selectors[s].pos_css;
				var key = Object.keys(pos_css)[0];
				console.log(s + ": " + pos_css[key]);
			}
		}
	}
};
