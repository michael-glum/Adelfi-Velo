// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { local, session } from 'wix-storage-frontend';
import wixLocation from 'wix-location';
import { checkChapterExists } from 'backend/sororities-server.web';

$w.onReady(function () {

	// If visitor has previously selected a sorority chapter, redirect to FOR SISTERS/Shopping page
	let selectedChapter = local.getItem('selectedChapter');
	if (selectedChapter) {
		wixLocation.to('/shopping');
	}

	// Change "FOR SISTERS" button to "FOR BRANDS and link back to home page"
	$w("#button5").label = "FOR BRANDS";
	$w("#button5").onClick(() => {
		wixLocation.to("/");
	})

	let dropdownList = $w("#dropdownList");
	let submitButton = $w("#submitButton");

	submitButton.onClick(() => {
		let selectedChapter = dropdownList.value;

		checkChapterExists(selectedChapter)
			.then(results => {
				if (results.length === 0) {
					// Selected chapter does not exist. Show error.
					dropdownList.value = "";
					dropdownList.onCustomValidation((value, reject) => {
						if (value === "") {
							reject("Chapter not found.");
						}
					});
				} else {
					// Selected chapter exists. Store it in local & session storage, then redirect to shopping page.
					session.setItem('selectedChapter', selectedChapter);
					local.setItem('selectedChapter', selectedChapter);
					wixLocation.to('/shopping');
				}
			})
			.catch(err => {
				console.log(err);
			})
	});
});
