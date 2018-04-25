import React from "react";
import HomeHeader from "../../components/HomeHeader";
import Category from "../../components/Category";
import Ad from "./subPage/Ad";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from "react-redux";
import List from "./subPage/List"


class Home extends React.Component{
	constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

	render(){
		return(<div>
				<HomeHeader cityName={this.props.userinfo.cityName}/>
				<Category />
				<Ad />
				<List cityName={this.props.userinfo.cityName} />
				
			</div>)
	}
}
function mapStateToProps(state){
	
	return{
		userinfo:state.userinfo
	}
}

function mapDispatchToProps(dispatch){
	return{
		
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)