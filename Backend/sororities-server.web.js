/************
.web.js file
************

Backend '.web.js' files contain functions that run on the server side and can be called from page code.

Learn more at https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/web-modules/calling-backend-code-from-the-frontend

****/

import { Permissions, webMethod } from "wix-web-module";
import wixData from 'wix-data';

export const checkChapterExists = webMethod(Permissions.Anyone, (chapter) => { 
  return wixData.query('Sororities')
	  .eq('chapter', chapter)
		.find()
		.then(results => {
      return results;
		})
		.catch(err => {
			console.log(err);
		});
});

export const getChapterNickname = webMethod(Permissions.Anyone, (chapter) => { 
  return wixData.query('Sororities')
	  .eq('chapter', chapter)
		.find()
		.then(results => {
      if (results.items.length > 0) {
        return results.items[0].nickname;
      }
		})
		.catch(err => {
			console.log(err);
		});
});
