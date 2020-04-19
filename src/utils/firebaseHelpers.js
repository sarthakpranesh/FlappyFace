import * as firebase from 'firebase';

export const checkUserExists = username => {
  return new Promise(async (resolve, reject) => {
    console.log(username);
    const user = firebase
      .database()
      .ref('leaderboard/')
      .child(username);

    user
      .once('value')
      .then(u => {
        const userObject = u.val();
        resolve(userObject);
      })
      .catch(err => {
        console.log(err);
        resolve(false);
      });
  });
};
