// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { local, session } from 'wix-storage-frontend';
import wixLocation from 'wix-location';
import wixData from 'wix-data';

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
		wixData.query('Sororities')
			.eq('chapter', selectedChapter)
			.find()
			.then(results => {
				if(results.items.length === 0) {
					// If the selected chapter is not found in the database, highlight the selection in red to show it is incorrect.
					dropdownList.value = "";
					dropdownList.onCustomValidation((value, reject) => {
  						if(value === "") {
    						reject("Chapter not found."); // Should show built in error box, but does not. 
  						}
					});
				} else {
					//submitButton.disable(); // (Low priority) Does not work as expected. Button should grey out after it is clicked. Possibly overriden by an End Hover event.
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
