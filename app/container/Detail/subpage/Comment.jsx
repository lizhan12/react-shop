import React from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ListComponent from '../../../components/CommentList';
import { getCommentData } from '../../../fetch/detail/detail'

import LoadMore from "../../../components/LoadMore" ;

import './style.less'

class Comment extends React.Component{
    constructor(props,context){
      super(props,context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
      this.state={
      	data:[],
      	hasMore:false,
      	isLoadingMore:false,
      	page:0
      }
      
   }
	render(){
		return(<div className="detail-comment-subpage">
				<h2>用户热评</h2>
            {
               this.state.data.length?<ListComponent data={this.state.data} />:<div>加载中</div>
            }
            {
               this.state.hasMore?<LoadMore isLoadingMore={this.state.isLoadingMore} 
               loadMoreFn={this.LoadMoreData.bind(this)}/> : ''
            }	 

			</div>)
	}
   componentDidMount() {
      this.loadFirstPageData()
   
   }
   loadFirstPageData() {
      const id = this.props.id ;
      const result = getCommentData(0,id);
      this.resultHandle(result);
   }
   LoadMoreData(){
      this.setState({
         isLoadingMore:true
      })
      const id = this.props.id;
      const page = this.state.page;
      const result = getCommentData(page,id);
      this.resultHandle(result)
      //增加page技术
      this.setState({
         isLoadingMore:false
      })
   }
   //处理数据
   resultHandle(result){
      result.then(res =>{
         return res.json()
      }).then(json =>{
         //增加page页面
         const page = this.state.page;
         this.setState({
            page:page+1
         })
         const hasMore = json.hasMore;
         const data = json.data;
         this.setState({
            hasMore:hasMore,
            data:this.state.data.concat(data)
         })
      }).catch(e =>{
         if(__DEV__){
            console.error("详情页面获取用户评论数据出错",e.message)
         }
      })
   }
}

export default Comment;