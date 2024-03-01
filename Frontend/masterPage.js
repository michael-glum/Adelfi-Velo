// The code in this file will load on every page of your site
import wixLocation from 'wix-location';


$w.onReady(function () {
	// If not on FOR SISTERS/Shopping page, hide "x Sorority" text
	if (wixLocation.path[0] != "shopping") {
		$w("#text81").hide();
	}
});
