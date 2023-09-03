const axios = require('axios');

const FOLLOWERS_OR_FOLLOWING = true ? 'followers' : 'following';
const GITHUB_PROFILE = 'ThePrimeagen';
//High PAGE_LIMIT values can cause 'Error Code 429 too many requests' and greater fetching time.
const PAGE_LIMIT = 10;
const USERS = [];

//Fetch Github Users
(async () => {
  for (let START_PAGE = 1; START_PAGE <= PAGE_LIMIT; START_PAGE++) {
    const response = await axios(
      `https://github.com/${GITHUB_PROFILE}?page=${START_PAGE}&tab=${FOLLOWERS_OR_FOLLOWING}`
    ).catch(console.error);

    const GITHUB_RESPONSE = response.data;
    const BASE_STRING = 'users/';
    let LETTER_MATCH_COUNT = 0;
    let USER = '';

    if (GITHUB_RESPONSE) {
      for (i in GITHUB_RESPONSE) {
        if (GITHUB_RESPONSE[i] === BASE_STRING[LETTER_MATCH_COUNT]) {
          USER += GITHUB_RESPONSE[i];
          LETTER_MATCH_COUNT++;
        } else {
          USER = '';
          LETTER_MATCH_COUNT = 0;
        }

        if (USER.length === BASE_STRING.length) {
          let USERNAME_START_INDEX = 1;
          while (GITHUB_RESPONSE[Number(i) + USERNAME_START_INDEX] !== '/') {
            USER += GITHUB_RESPONSE[Number(i) + USERNAME_START_INDEX];
            USERNAME_START_INDEX++;
          }
          if (!USERS.includes(USER)) USERS.push(USER);
        }
      }
    }
  }

  //All users found within the pages range.
  console.log(`\nAll Users:\n${USERS.toString().replaceAll(',', '\n')}\n`);
  //Users found using a name.
  console.log(
    `Filtered Users:\n${USERS.filter((user) => user.includes('Insert a name'))
      .toString()
      .replaceAll(',', '\n')}`
  );
})();
