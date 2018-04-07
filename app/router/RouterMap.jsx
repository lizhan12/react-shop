import React from "react";
import {BrowserRouter as Router, Route, Link,Switch} from "react-router-dom";
import {IndexRoute} from "react-router";
import App from "../container"
import City from "../container/City"
import Home from "../container/Home/index"
import Search from "../container/Search"
import Detail from "../container/Detail"
import User from "../container/User"
import NotFound from "../container/404"

class RouterMap extends React.Component{
	render(){

		return(
			<Router history={this.props.history}>
			<div>
				<App  component={App}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/city" component={City} />
					<Route path="/user" component={User} />
					<Route path="/search/:type(/:keyword)" component={Search} />
					<Route path="/detail/:id" component={Detail} />
					<Route path="*" component={NotFound} />
					</Switch>
				</App>
				
				</div>
			</Router>
			)
	}
}
export default RouterMap ;