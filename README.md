# Typing Speed Test

A web-based typing speed test application built using **Next.js**, **React**, and **Tailwind CSS**. The app allows users to test their typing speed and accuracy. After the test, users can view their results, including Words Per Minute (WPM) and accuracy, and retake the test as many times as they like.

## Features

- Fetch random words from an API to type.
- Countdown timer (60 seconds) for the typing test.
- Calculates Words Per Minute (WPM) and accuracy.
- Displays results (WPM and accuracy) after the test.
- Option to retake the test.

## Technologies Used

- **Next.js**: For building the front-end and handling routing.
- **React**: To create interactive UI components.
- **Tailwind CSS**: For styling the application.
- **Axios**: For making API requests to fetch random words.

## Demo

[Link to live demo]

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/nehac710/fast-type.git
    ```

2. Navigate to the project directory:

    ```bash
    cd fast-type
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### Key Files

- `src/app/layout.tsx`: Sets up the layout and global styles.
- `src/app/page.tsx`: Contains the main typing test page that renders the typing test.
- `src/components/fast-type.js`: Implements the typing test functionality, including timer and word input.
- `src/components/results.js`: Displays the typing speed test results (WPM, accuracy) and allows users to retake the test.
- `src/styles/globals.css`: Contains global styles, including custom styles for the app.

## How to Use

1. Open the homepage.
2. Start typing the displayed words as quickly and accurately as possible.
3. When the timer ends, the results page will show your typing speed (WPM) and accuracy.
4. Click "Retake the Test" to try again.

## API

The app uses the following API to fetch random words:

- **Random Word API**: [https://random-word-api.herokuapp.com](https://random-word-api.herokuapp.com



