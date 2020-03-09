# react-demos

A repo to showcase react work through demos of different ideas

![CI Status](https://github.com/dhruv-m-patel/react-demos/workflows/Continuous%20Integration/badge.svg)

### Setup

```
$ git clone git@github.com:dhruv-m-patel/react-demos.git
$ npm install
$ cp .env.example .env ## edit environment variables
$ npm run start-dev
```

### Projects

#### Form Validator
- Create form UI for registration form using different types of inputs
- Show error messages under inputs with error
- Implement basic validations for each input
- Show success if there are no errors

#### Movie Seat Booking
- Allow user to pick a movie and select seats
- Unavailable seats cannot be selected and are marked out
- UI updates selections as user picks movie and seats
- Clearly differentiate between type of seat with appropriate legend and css styles

#### Shopping Cart
- List products with a common style allowing user to pick their selections or remove them
- If there are items added to cart, Show user their order total with a preview of items allowing to change quantity
- Allow user to remove items from cart regardless they made change to quantity

Goal: Do all these projects with React: https://github.com/bradtraversy/vanillawebprojects
