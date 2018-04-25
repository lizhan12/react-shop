import React from "react";
import {bindActionCreators}from "redux";
import {connect} from "react-redux";
import './style.less';
import SearchHeader from "../../components/SearchHeader"
import SearchList from "./subpage/List"


class Search extends React.Component{
	 constructor(props, context) {
        super(props, context);
       
       
    }
	render(){
		const params = this.props.match.params
		return(<div>
				<SearchHeader keyword={params.keyword} />
				<SearchList keyword={params.keyword} category={params.category} />
			</div>)
	}
	componentDidMount() {
		console.log("params",this.props.match)

	}
	

}


export default Search