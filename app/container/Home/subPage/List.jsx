import React from "react";
import "./style.less" ;
import {getListData} from "../../../fetch/home/home";
import ListComponent from "../../../components/List"
import LoadMore from "../../../components/LoadMore"
import PureRenderMixin from 'react-addons-pure-render-mixin';
class List extends React.Component{
   constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
         hasMore:false,
         data:[],
         page:1,
         isHasMore:false
        }
    }

   render(){
      return(<div>
         <h1 className="home-list-title">猜你喜欢</h1>
         {this.state.data.length?<ListComponent data={this.state.data} />:"加载中....."}
        {this.state.hasMore?<LoadMore isHasMore={this.state.isHasMore} loadMoreFn={this.loadMoreData.bind(this)} />:""}
         </div>)
        
        }
   
   componentDidMount(){
      var cityName=this.props.cityName;
      const result=getListData(cityName,0);
      console.log(result);
      this.resultHandle(result)
   }
    resultHandle(result){
      result.then(res=>{
         return res.json()
      }).then(json=>{
         console.log(json.data)

         this.setState({
            hasMore:json.hasMore,
            data:this.state.data.concat(json.data)
         })
      })
    }
    loadMoreData(){
      this.setState({isHasMore:true})
      console.log(this.state.isHasMore)
       var cityName=this.props.cityName;
      let page=this.state.page;
      const result=getListData(cityName,page);
      this.resultHandle(result);
      this.setState({
        page:page+1,
        isHasMore:false
      })


    }


}

export default List;