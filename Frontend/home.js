// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { local } from 'wix-storage';
import wixLocation from 'wix-location';

$w.onReady(function () {
	// If visitor has previously selected a sorority chapter, redirect to FOR SISTERS/Shopping page
	let selectedChapter = local.getItem('selectedChapter');
	if (selectedChapter) {
		wixLocation.to('/shopping');
	}
});
