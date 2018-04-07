import React from 'react'
import { render } from 'react-dom';
import {Provider} from "react-redux";
import {hashHistory} from "react-router-dom";
import RouterMap from "./router/RouterMap";
import configStore from "./store/configStore.js";
import "./static/css/common.less";
import "./static/css/font.css";
const store =configStore();
render(
   		<Provider store={store}>
			<RouterMap history={hashHistory} />
   		</Provider>,
       
   
    document.getElementById('root')
)
