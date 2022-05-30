import React from 'react';
import Icon from './icon';
import './icon.example.scss'

const IconExample: React.FunctionComponent = () => {

  return (
    <div style={{color: '#0086e6'}} className="IconExample">
      <Icon name="alipay" style={ {width: '32px;', height: "32px"}}/>
      <Icon name="wechat" style={ {width: '32px;', height: "32px"}}/>
      <Icon name="qq" style={ {width: '32px;', height: "32px"}}/>
      <Icon name="loading" style={ {width: '32px;', height: "32px"}}/>
    </div>
  );
};

export default IconExample;