import React from "react";
import HomeHeader from "../../components/HomeHeader";
import Category from "../../components/Category";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from "react-redux";


class Home extends React.Component{
	constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

	render(){
		return(<div>
				<HomeHeader cityName={this.props.userinfo.cityName}/>
				<Category />
				
			</div>)
	}
}
function mapStateToProps(state){
	console.log(state)
	return{
		userinfo:state.userinfo
	}
}

function mapDispatchToProps(dispatch){
	return{
		
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)