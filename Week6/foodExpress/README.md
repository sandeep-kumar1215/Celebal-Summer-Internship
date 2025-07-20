# Food Express - Swiggy Live API Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

Food Express is a React-based frontend web application that interfaces with Swiggy's live API to deliver a seamless food ordering experience.

## Features

- **Live Swiggy API Integration**: Fetches real-time restaurant and menu data
- **Modern UI with Shimmer Effects**: Implemented shimmer UI for loading states
- **State Management**: Uses Redux for centralized state management
- **Client-Side Routing**: React Router for smooth navigation
- **Cart Functionality**: Full-featured cart system with:
  - Add/remove items
  - Quantity adjustment
  - Price calculations
- **State Uplifting**: Proper component architecture with lifted state where needed

## Technologies Used

- React.js
- Redux (State Management)
- React Router (Client-side routing)
- Shimmer UI (Loading states)
- HTML5/ Tailwind
- JavaScript (ES6+)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sandeep-kumar1215/food-express.git
   ```
2. Navigate to the project directory:
   ```bash
   cd food-express
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
food-express/
├── public/                  # Static files
├── src/
│   ├── components/          # Reusable components
│   ├── redux/               # Redux store, actions, reducers
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main app component  
|
│── index.html               # Entry point
│── index.css                # tailwind
├── package.json
└── README.md
```



## Limitations

- This is a frontend-only application (no backend server)
- Uses Swiggy's public API which may have rate limits
- Cart data persists only during current session

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

