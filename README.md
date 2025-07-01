# JOB PORTAL APP

## _Overview_

JOB PORTAL APP is a job search platform that allows users to find jobs, upload resumes, and apply directly from their mobile device. It features personalized job recommendations, company reviews, salary insights, and real-time job alerts to make the job hunting process faster and more efficient. Ideal for job seekers across various industries.

## Component Overview

JOB PORTAL APP uses a number of open source projects to work properly:

- [NextJs] - Front end framework for bulding Single Page Application/Server side rendering


## Third party integrations

Different packages have been installed in order for the JOB PORTAL APP App to function properly.

- [@reduxjs/toolkit] - Simplifies Redux setup and provides powerful utilities for state management in a scalable way.
- [react-redux] - ts your React components to the Redux store using hooks like useSelector and useDispatch.
- [sass] - Enables writing modular and maintainable styles using SCSS syntax in your Next.js components.
- [axios] - A lightweight HTTP client to make API requests (e.g., login, job fetching) from frontend to backend.
- [tailwindcss] - Utility-first CSS framework for rapidly building modern, responsive UIs directly in markup.
- [jest / @testing-library/react / @testing-library/jest-dom] - Used for unit and component testing to ensure the UI behaves correctly under various scenarios.
- [@mui/material / @emotion/react / @emotion/styled] - Provides ready-to-use UI components and styling utilities (optional if you're not using Material UI).

## Installation

JOB PORTAL APP requires [ReactJS](https://react.dev/) v18+ to run.

#### Front-end setup

`.env-cmdrc` will enable the Next Js Application to fetch the environment variables depending upon the environment you are running on.

```sh
cd app
npm i
npm run dev
```

For building the Next Js Application onto other environments.

```sh
<!- For Dev environment--->
npm run build:dev

<!- For QA environment--->
npm run build:qa

<!- For staging environment--->
npm run build:staging

<!- For production environment--->
npm run build:prod
```

#### Back-end setup

The back-end server requires `.env` to get started. You can get that from Bitwarden or contact one of the other Devs to provide that.

```sh
cd server
npm i
npm run dev
```

## Code Structure

### Front-end
```
.
└── src/
    ├── assets/
    │   ├── images
    │   └── sass/
    │       ├── _mixins.scss
    │       ├── _variables.scss
    │       └── styles.scss
    ├── components <!--- Commonly used components --->/
    │   ├── ComponentA/
    │   │   ├── index.js
    │   │   ├── ComponentA.jsx
    │   │   └── _componentA.scss
    │   └── ComponentB/
    │       ├── index.js
    │       ├── ComponentB.jsx
    │       └── _componentB.scss      
    ├── pages/
    │   ├── PageA/
    │   │   ├── PageAComponent.jsx <!--- Independent components --->
    │   │   ├── PageA.jsx
    │   │   ├── pageA.scss
    │   │   └── index.js
    │   └── PageB/
    │       ├── PageB.jsx
    │       ├── pageB.scss
    │       └── index.js
    ├── redux/
    │   ├── Auth/
    │   │   └── authSlice.js
    │   ├── -
    │   ├── -
    │   ├── -
    │   └── store.js
    ├── routes/
    │   └── MainRouter.jsx
    ├── services/
    │   ├── stripeService.js
    │   ├── authService.js
    │   ├── -
    │   ├── -
    │   └── -
    ├── utils
    └── api.js
```

### Team Environments
TODO://
### Release Pipeline
TODO://

[NextJS]: https://nextjs.org/
[ReactJS]: https://react.dev/
[reactjs]: https://reactjs.org
[AWS Fargate]: https://aws.amazon.com/fargate/
[AWS SES]: https://aws.amazon.com/ses/
[AWS SDK]: https://aws.amazon.com/sdk-for-javascript/
[MySql]: https://www.mysql.com/
[Sequelize]: https://sequelize.org/master/
[Express Validator]: https://express-validator.github.io/docs/
[Passport]: http://www.passportjs.org/
[Passport Jwt]: http://www.passportjs.org/packages/passport-jwt/
[Stripe]: https://stripe.com/docs/api
[Graylog2]: https://www.npmjs.com/package/graylog2
[Swagger UI Express]: https://www.npmjs.com/package/swagger-ui-express
[Swagger-jsdoc]: https://github.com/Surnet/swagger-jsdoc