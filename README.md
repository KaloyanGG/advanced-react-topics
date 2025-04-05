# This is a React Application which utilizes the main React functionalities (simple and more complex).

Please do not try the recipes... 😆

## React topics used:

- useEffect/useState
- React Router, useNavigate, useLocation, loader
- useCallback, memo
- useReducer
- useQuery
- useRef
- React Portals
- Generic Component (FormInput)
- Redux Toolkit, selectors, actions, reducers, async thunk
- Custom hooks
- Lazy loading
- Error Boundary
- Suspense
- E2E Tests

## Non-react good practices:

- Responsive Design
- Custom Axios instance
- Good folder structure
- ESLint
- Nested CSS
- Implementing functionality of a library (react-hot-toast) from scratch and removing the library
- Dialog modal

## How to run the project:

1. Clone the repository
2. Make sure you have mongoDB installed and running on port 27017, also Node.js and TypeScript
3. Run `npm install`
4. Go into the server folder and run `npm install`
5. Run `npm start` in the server folder
6. Run `npm start` in the main folder
7. Open the browser and go to `http://localhost:/5173`
8. In case you want to run the tests - Make sure both the server and the client are running, then run 'npm run cy:open' command in the main folder, choose E2E Testing, choose the browser you prefer and from there you can run whichever test file you want
