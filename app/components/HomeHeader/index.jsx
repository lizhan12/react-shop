import React from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from "react-router-dom";
import SearchInput from "../SearchInput"
import "./style.less"
import PropTypes from 'prop-types'
// require "./style.less";


class HomeHeader extends React.Component{
	
	static contextTypes = {
    router: PropTypes.object
  }
	constructor(props){
		super(props);


		// this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	
	
	render(){
		return(
				 <div id="home-header" className="clear-fix">
	                <div className="home-header-left float-left">
                        <Link to="/city">
                           <span>{this.props.cityName}</span>
                      
	                   
	                    &nbsp;
	                    <i className="icon-angle-down"></i>  
                       </Link>
	                </div>
                <div className="home-header-right float-right">
                    <i className="icon-user"></i>
                </div>
                <div className="home-header-middle">
                    <div className="search-container">
                        <i className="icon-search"></i>
                        <SearchInput value="" enterHandle={this.enterHandle.bind(this)} />
                    </div>
                </div>
            </div>
		)
	}
	componentDidMount() {
		
	}
	
	enterHandle(value){
		this.context.router.history.push('/search/all/'+encodeURIComponent(value))
		}
		// this.props.history.push()
}

export default HomeHeader ;