# Weatheria

[Live Demo](https://farisfitrijuraidi.github.io/weather-app/)

Weatheria is a clean and modern weather dashboard built to demonstrate my ability to handle complex data from external sources and manage assets in a professional development environment. This project was created as part of the JavaScript curriculum in The Odin Project.

The primary goal was to build an application that communicates with a weather server to provide users with real-time information for any location, while ensuring that private data remains hidden in a public repository.

---

## Features

- **Real-Time Weather Data**: I integrated the Visual Crossing API to fetch current conditions, including temperature, wind speed, UV index, and humidity.
- **Dynamic Visual Icons**: The application automatically updates the central graphic to match current conditions. I built a custom system that maps text descriptions from the server to specific SVG files.
- **Location Search & Validation**: Users can search for any city name. I implemented form validation to ensure only valid text is sent to the server, preventing unnecessary API errors.
- **Polished Loading States**: To improve user experience, I added a loading spinner and status messages that appear while data is being fetched.
- **Automated Date Formatting**: I used the `date-fns` library to display the current day and date in a friendly, readable format.
- **Secure Secrets Management**: I implemented a professional-grade security system to protect private API keys using environment variables.

---

## What I Learned

This project was a fantastic challenge that helped me move beyond basic coding and start using professional-grade tools and security practices.

### Handling Asynchronous Data

I learned how to use `async` and `await` to communicate with external servers. This taught me how to handle the wait time between a user action and the data arriving, which is a vital part of building responsive websites.

### Webpack Asset Management

I discovered how a bundler (a tool that packages code files) like Webpack handles images and fonts. I learned that you cannot simply point to an image path in your JavaScript; you must import the file so Webpack can include it in the final folder when the app is built.

### Clean DOM Architecture

I built a helper function called `createNode` to keep the interface logic organised. Instead of writing dozens of repetitive lines to create every piece of the dashboard, this helper allowed me to generate new parts of the screen efficiently, keeping the project tidy and easy to read.

---

## Cybersecurity and Secrets Management

Because I am currently studying for a Master of Computer Science and practicing on TryHackMe, I wanted to ensure this project followed a Secure Software Development Life Cycle.

### The Problem: API Key Exposure

In early versions, I had my private API key written directly inside my code. If I had uploaded that to GitHub, anyone could have stolen my credentials. In the world of cybersecurity, this is a major vulnerability known as Credential Leakage.

### The Solution: Environment Variables

I implemented a three-step security system to solve this:

1.  **Isolation**: I moved the secret key into a private file called `.env`.
2.  **Protection**: I used a `.gitignore` file to ensure the secret file is never uploaded to the internet.
3.  **Injection**: I configured `dotenv-webpack` to act as a secure messenger, grabbing the key from my private file and injecting it into the code only during the final build process.

---

## Tools and Technologies

- **JavaScript (ES6+)**: Used for core logic and asynchronous API communication.
- **Webpack**: Used to bundle the project and manage separate development and production environments.
- **date-fns**: A lightweight library used for precise and friendly date formatting.
- **CSS Grid & Flexbox**: Used to build the modern, card-based layout.

---

## Acknowledgements

- **The Odin Project**: For the core curriculum and project requirements.
- **Visual Crossing**: For the weather data and API access.
- **Lucide/MDI**: For the clean, minimalist weather icons.
