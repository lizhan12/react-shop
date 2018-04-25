import React from "react";
import {connect} from "react-redux";
import * as hashHistory from 'react-router-dom'
import Header from "../../components/Header" ;
import CurrentCity from "../../components/CurrentCity" ;
import CityList from "../../components/CityList" ;
import {CITYNAME} from "../../config/localStorageKey";
import LocalStorage from "../../util/localStorage";
import {bindActionCreators}from "redux";
import * as redux from "redux";
import * as userInfoActionsFromOtherFile from "../../actions/userinfo.js"
import "./style.less";
class City extends React.Component{

	render(){
		return (<div>
               <Header title="请选择城市" />
               <CurrentCity cityName={this.props.userinfo.cityName}/>
               <CityList changeFn={this.changeCity.bind(this)} />
          
         </div>)
	}
   componentDidMount(){
      console.log('redux',this.props.history)
   }
   changeCity(newCity){
      if(newCity==null)return;

      //修改redux
      const userinfo= this.props.userinfo;
      userinfo.cityName=newCity;
      this.props.userInfoActions.update(userinfo)
      //修改localStorage

      localStorage.setItem(CITYNAME,newCity)
      //返回首页
      this.props.history.push("/")

   }
}

function mapStateToProps(state){
   return{
      userinfo:state.userinfo
   }
}

function mapDispatchToProps(dispatch){
   return{
         userInfoActions:bindActionCreators(userInfoActionsFromOtherFile,dispatch)
   }
}
export default connect(mapStateToProps,mapDispatchToProps)(City)