import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import './example.scss'
import IconExample from './lib/icon/icon.example';
import ButtonExample from './lib/button.example';
import DialogExample from './lib/dialog/dialog.example';
import LayoutExample from './lib/layout/layout.example'
import {Aside, Content, Footer, Header, Layout,} from './lib/layout/layout';


ReactDOM.render(
	<Router>
		<Layout className="site-page">
			<Header className="site-header">
				<div className="logo">
					<div>logo</div>
					<span> Lian-ui </span>
				</div>
			</Header>
			<Layout>
				<Aside className="site-aside">
					<h2>组件</h2>
					<ul>
						<li>
							<NavLink to="/icon">Icon</NavLink>
						</li>
						<li>
							<NavLink to="/dialog">对话框</NavLink>
						</li>
						<li>
							<NavLink to="/layout">布局</NavLink>
						</li>
					</ul>
				</Aside>
				<Content className="site-main">
					<Route path="/icon" component={IconExample}/>
					<Route path="/button" component={ButtonExample}/>
					<Route path="/dialog" component={DialogExample}/>
					<Route path="/layout" component={LayoutExample}/>
				</Content>
			</Layout>
			<Footer className="site-footer">
				&copy;11
			</Footer>
		</Layout>
	</Router>
	, document.querySelector('#root'));