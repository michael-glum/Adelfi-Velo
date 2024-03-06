// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixLocation from 'wix-location';
import { local, session } from 'wix-storage-frontend';
import { logSessionStart } from 'backend/session-log-handler.web';
import { getChapterNickname } from 'backend/sororities-server.web';

$w.onReady(function () {
	// Hide "x Sorority" text until the correct nickname has been retrieved from the database
	let sororityText = $w("#text81");
	sororityText.hide();

	// Change "FOR SISTERS" button to "FOR BRANDS" and link back to home page
	$w("#button5").label = "FOR BRANDS";
	$w("#button5").onClick(() => {
		// Remove selectedChapter from storage (when returning to the FOR BRANDS/HOME page) so that visitors can change their chapter next visit
		local.removeItem('selectedChapter');
		session.removeItem('selectedChapter');
		wixLocation.to("/");
	})

	// Retrieve visitor's sorority chapter
	let selectedChapter = local.getItem('selectedChapter') || session.getItem('selectedChapter');
	
	if (selectedChapter) {
		// Replace "x Sorority" text with correct nickname from database and display it
		getChapterNickname(selectedChapter)
			.then(nickname => {
				if (nickname) {
					sororityText.text = "x " + nickname;
					sororityText.show();
					local.setItem("nickname", nickname);
					session.setItem("nickname", nickname);
					if (session.getItem("sessionCounted") !== "true") {
						// Log a session for the selected chapter (for future batch processing)
						logSessionStart(selectedChapter);
						session.setItem("sessionCounted", "true");
					}
					console.log("nickname:" + nickname);
				} else {
					// If the selected chapter does not exist in the database, redirect to the sorority selection page
					session.removeItem('selectedChapter');
					local.removeItem('selectedChapter');
					wixLocation.to('/sorority-selection');
				}
			})
			.catch(err => {
				console.log("Error fetching chapter nickname:", err);
			});
	} else {
		// If no chapter association is found, redirect to sorority selection page
		wixLocation.to("/sorority-selection");
	}

	// Make the central Adelfi logo link back to the shopping page
	$w("#vectorImage22").link = "/shopping";
});
