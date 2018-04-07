import React from "react";
import {CITYNAME} from "../config/localStorageKey";
import LocalStorage from "../util/localStorage";
import {bindActionCreators}from "redux";
import {connect} from "react-redux";
import * as userInfoActionsFromOtherFile from "../actions/userinfo.js"

class App extends React.Component{
	 constructor(props, context) {
        super(props, context);
        this.state={
        	initDone:false
        }
       
    }

	render(){

		return(<div>
				{this.state.initDone?this.props.children:<div>加载中....</div>}
			</div>)
	}
	componentDidMount(){

		let that=this;
		let cityName=LocalStorage.getItem(CITYNAME);
		if(cityName==null){
			cityName="北京";
		}
		this.props.userInfoActions.update({
			cityName:cityName
		})
		this.setState({
			initDone:true
		})
		console.log(cityName);
		
	}


}
function mapStateToProps(state){
	return{}
}

function mapDispatchToProps(dispatch){
	return{
		userInfoActions:bindActionCreators(userInfoActionsFromOtherFile,dispatch)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App)