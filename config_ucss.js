module.exports = {
	"result": function(result) {
		// Do something with the result object, e.g. print every rule
		// found, together with positions in CSS file:
		for (var s in result.selectors) {
		// Only unused rules:
			if (result.selectors[s].matches_html === 0) {
			// Print position(s), given it's only one CSS file:
				var pos_css = result.selectors[s].pos_css;
				var key = Object.keys(pos_css)[0];
				console.log(s + ": " + pos_css[key]);
			}
		}
	}
};
