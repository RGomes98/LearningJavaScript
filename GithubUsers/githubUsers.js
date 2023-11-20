// Profile Settings
const followersOrFollowing = true ? 'followers' : 'following';
const githubProfile = 'ThePrimeagen';
const nameToFilter = null;

// High pageLimit values can cause 'Error Code 429 too many requests' and greater fetching time
const pageLimit = 10;
const users = [];

// Fetch Profile
(async () => {
  for (let startPage = 1; startPage < pageLimit; startPage++) {
    try {
      const response = await fetch(
        `https://github.com/${githubProfile}?page=${startPage}&tab=${followersOrFollowing}`
      );

      const plainHTML = await response.text();
      const baseString = 'users/';
      let charMatchCount = 0;
      let user = '';

      for (const i in plainHTML) {
        const currentIndex = Number(i);
        const currentHTMLChar = plainHTML[i];
        const currentBaseStringChar = baseString[charMatchCount];
        const isUserMatching = user.length === baseString.length;

        if (currentHTMLChar === currentBaseStringChar) {
          user += currentHTMLChar;
          charMatchCount++;
        } else {
          user = '';
          charMatchCount = 0;
        }

        if (isUserMatching) {
          user = '';
          let userCharCount = 0;

          while (plainHTML[currentIndex + userCharCount] !== '/') {
            user += plainHTML[currentIndex + userCharCount];
            userCharCount++;
          }

          const isUserValid = !users.includes(user) && user !== githubProfile;
          if (isUserValid) users.push(user);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // All users found within the pages range
  console.log(`\nAll Users: \n${users.toString().replaceAll(',', '\n')}\n`);

  // All users found using a name
  console.log(
    `Filtered Users: \n${users
      .filter((user) => user.toLowerCase().includes(nameToFilter))
      .toString()
      .replaceAll(',', '\n')}`
  );
})();
