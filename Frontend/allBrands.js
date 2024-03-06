// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { local, session } from 'wix-storage-frontend';

$w.onReady(function () {
	let nicknameText = $w("#text81");
	let nickname = local.getItem("nickname") || session.getItem("nickname");
	if (nickname) {
		nicknameText.text = "x " + nickname;
		nicknameText.show();
	} else {
		nicknameText.hide();
	}

	// Make the central Adelfi logo link back to the shopping page
	$w("#vectorImage22").link = "/shopping";
});
