# Cook & Bake Academy

Cook & Bake Academy is a market-validation website for a hands-on culinary school in Singapore. It presents a practical course catalogue, helps prospective learners find a suitable class, and tests demand through a lightweight course sign-up flow.

## Live site

[Visit Cook & Bake Academy](https://shakuarai.github.io/cook-and-bake/)

## What the experience includes

- A searchable catalogue of 20 cooking and baking courses
- Category and campus filters for Orchard Road and Bukit Timah
- A course assistant that recommends relevant classes from a learner's goals
- Course cards with fees, schedules, levels, locations, and upcoming intakes
- An accessible sign-up form with validation and allergy guidance
- Device-local sign-up storage for privacy-friendly market testing
- A device-local admin view with CSV export
- Responsive, keyboard-friendly layouts for desktop and mobile

## How sign-ups work

This validation build does not send personal information to a server by default. Submitted sign-ups are stored in the visitor's browser using local storage. The admin page can display and export only the sign-ups saved in that same browser on that same device.

Open `site/admin.html` from the deployed site path to review device-local submissions. A future production version can provide `window.SIGNUP_ENDPOINT` to connect the form to an approved backend.

## Run locally

The published static experience lives in `site/` and can be served by any local static web server. The repository also includes the source application and its build checks.

```bash
npm install
npm test
```

`npm test` builds the static output and verifies the course catalogue, sign-up validation, persistence, allergy warning, and CSV export behavior.

## Project structure

- `site/` — deployable static academy website
- `site/data/courses.csv` — course catalogue and intake data
- `app/` — source application
- `tests/` — rendered-output and interaction checks
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow

## Status

This is a market-validation prototype. Course details, campus information, contact addresses, and enrolment operations should be reviewed before production use.
