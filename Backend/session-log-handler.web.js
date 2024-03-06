/************
.web.js file
************

Backend '.web.js' files contain functions that run on the server side and can be called from page code.

Learn more at https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/web-modules/calling-backend-code-from-the-frontend

****/

import {Permissions, webMethod} from 'wix-web-module';
import wixData from 'wix-data';

// Function called from Shopping page on session start. Populates batch for future processing.
export const logSessionStart = webMethod(
  Permissions.Anyone,
  async (chapter) => {
    const logEntry = {
      chapter: chapter,
    }

    try {
      const result = await wixData.insert("SessionStartLogs", logEntry);
      return result;
    } catch (err) {
      console.error("Error logging session start", err);
      // throw err;
    }
});

// Update session count for each chapter using batch processing approach. Executes daily via scheduled jobs.
export async function processSessionStartLogs() {
  let logs = [];
  let skip = 0;
  let results;

  // Use pagination to retrieve all session start logs
  do {
    results = await wixData.query("SessionStartLogs")
      .limit(1000)
      .skip(skip)
      .find();
    logs.push(...results.items);
    skip += results.items.length;
  } while (results.items.length > 0);

  // Aggregate session logs by chapter
  let sessionCountsByChapter = logs.reduce((acc, log) => {
    acc[log.chapter] = acc[log.chapter] || 0;
    acc[log.chapter]++;
    return acc;
  }, {});

  // Update each chapter's session count
  for (const [chapter, count] of Object.entries(sessionCountsByChapter)) {
    const chapterResults = await wixData.query("Sororities")
      .eq("chapter", chapter)
      .find();
    if (chapterResults.items.length > 0) {
      let chapter = chapterResults.items[0];
      let newCount = (chapter.visits || 0) + count; // Increment visits count
      // Update chapter with new visits count
      await wixData.update("Sororities", {...chapter, visits: newCount });
    }
  }

  // Cleanup processed logs
  for (const log of logs) {
    await wixData.remove("SessionStartLogs", log._id)
                 .catch(err => console.error('Failed to delete log: ${log._id}', err));
  }
}
