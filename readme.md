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

#### [Form Validator](https://reactdemos.herokuapp.com/form-validator)
- Create form UI for registration form using different types of inputs
- Show error messages under inputs with error
- Implement basic validations for each input
- Show success if there are no errors

#### [Movie Seat Booking](https://reactdemos.herokuapp.com/movie-seat-booking)
- Allow user to pick a movie and select seats
- Unavailable seats cannot be selected and are marked out
- UI updates selections as user picks movie and seats
- Clearly differentiate between type of seat with appropriate legend and css styles

#### [Shopping Cart](https://reactdemos.herokuapp.com/shopping-cart)
- List products with a common style allowing user to pick their selections or remove them
- If there are items added to cart, Show user their order total with a preview of items allowing to change quantity
- Allow user to remove items from cart regardless they made change to quantity

#### [Expense Tracker](https://reactdemos.herokuapp.com/expense-tracker)
- Display transaction history with total income and expense
- Allow user to add new transaction
- Allow user to delete existing transaction
- Implement form validations

#### [Typing Speed Checker](https://reactdemos.herokuapp.com/typing-speed-checker)

- Allow user to choose difficulty level before they can begin testing typing speed
- Show countdown timer while user tests their typing speed
- Update score as user enters correct words
- Show typing speed per minute at the end of countdown clearing the test
