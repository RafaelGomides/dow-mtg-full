import React from "react";
import { BrowserRouter } from "react-router-dom";
import * as routes from "../index.routes";
import { Provider } from "react-redux";
import { render } from "react-dom";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose } from 'redux';

/* Redux Reducers */
import Reducers from "../../../reducers/index";

/* Enhancers */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* Middlewares */
let middlewares = [thunkMiddleware];

/* Redux Store */
const store = createStore(Reducers, composeEnhancers(applyMiddleware(...middlewares)));

// const App = () => {
//   return (
//     <BrowserRouter>
//       <routes.default />
//     </BrowserRouter>
//   );
// }



/* App Render */
render(
	<Provider store={store}>
		<BrowserRouter>
			<routes.default />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root"),
);


// export default App;
