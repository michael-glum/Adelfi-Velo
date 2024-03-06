// The code in this file will load on every page of your site
import wixLocation from 'wix-location';

$w.onReady(function () {
	// If not on FOR SISTERS/Shopping page, hide "x Sorority" text
	let shoppingPages = ["shopping", "local-brands", "top-brands", "more-brands", "all-brands"]
	let currentPage = wixLocation.path[0];
	if (!shoppingPages.includes(currentPage)) {
		$w("#text81").hide();
	} else {
		switchMenuItems();
		// Make the Adelfi logo in the header link back to the shopping page
		$w("#vectorImage2").link = "/shopping";
		if (currentPage != "shopping") {
			// Let "FOR SISTERS" button skip sorority selection
			$w("#button5").link = "/shopping";
		}
	}
});

function switchMenuItems() {
	let myMenu = $w("#horizontalMenu2");

	const newMenuItems = [
		{ "label": "TOP BRANDS", "link": "/top-brands"},
		{ "label": "LOCAL BRANDS", "link": "/local-brands"},
		{ "label": "MORE", "link": "/more-brands"},
		{ "label": "ALL", "link": "/all-brands"}
	];

	myMenu.menuItems = [];
	myMenu.menuItems = newMenuItems.map(item => {
		return {
			"label": item.label,
			"link": item.link
		};
	});
}
