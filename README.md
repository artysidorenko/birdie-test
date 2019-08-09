# Birdie Developer Test

This is a full-stack app designed to complete the [Birdie Web Developer Test](https://github.com/birdiecare/birdie-test).

[The deployed app can be accessed here.](https://birdie-client-asidorenko.herokuapp.com/)

## Set up

The webapp uses the following stack. Important tools not included on top of the original boilerplate are in prefixed with ADDED:

### Front end
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/introduction/getting-started)
* [TypeScript](https://www.typescriptlang.org/)
* [Redux sagas](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html)
* [Styled components](https://www.styled-components.com/)

* ADDED - [Chart.js](https://www.chartjs.org)


### Back end
* [Express](https://expressjs.com/)
* [MySQL](https://www.mysql.com/)
* [TypeScript](https://www.typescriptlang.org/)

* ADDED -[Sequelize ORM](https://sequelize.org)

## Notes and Gotcha's

1. Some of the presentation logic depends on the contents of the database. For example, caregiver assistance tasks are grouped based on the task_definition_description. If the data changes in the future, this may distort the chart data by adding previously undefined descriptions.
<br/>

2. The backend API can be accessed directly to pull the raw data at the following separate link:

ht<span>tps://birdie-server-asidorenko.herokuapp.com/api/events/< EVENT TYPE, OR LEAVE BLANK FOR ALL >?id=< CARE RECEIVER ID >
<br/>

3. You may find that front-end tests using Jest are not able to run on a freshly installed local build of this repository. This is because one of the app's lower level dependencies (node-fetch) makes use of a .mjs file which interfers with create-react-app's jest setup script.
**solution:** requires a manual tweak to the setup script in node_modules, by changing the moduleFileExtensions setting to what is shown below (moving mjs from the beginning to the end of the array). Unfortunately this needs to be repeated after every fresh npm install/update.

`/node_modules/react-scripts-redux-ts/scripts/utils/createJestConfig.js`

```js
moduleFileExtensions: [
      'web.ts',
      'ts',
      'web.tsx',
      'tsx',
      'web.js',
      'js',
      'web.jsx',
      'jsx',
      'json',
      'node',
      'mjs'         
    ],
```
