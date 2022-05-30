import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import React from 'react';
import './importIcons';
import './icon.scss'
import classes, {createScopedClasses} from '../helpers/classes';



const componentName = 'Icon';
const sc = createScopedClasses(componentName);


interface IconProps extends React.HTMLAttributes<HTMLElement>  {
  name: string;
  fill?: string;
  beforemount?: (el: Element | null | Text) => void;
  aftermount?: (el: Element | null | Text) => void;
}

class Icon extends React.Component<IconProps> {
  static displayName = componentName;
  static defaultProps = {};
  static propTypes = {
    name: PropTypes.string.isRequired,
    fill: PropTypes.string,
  };

  componentWillMount() {
    this.props.beforemount && this.props.beforemount(ReactDOM.findDOMNode(this));
  }

  componentDidMount() {
    this.props.aftermount && this.props.aftermount(ReactDOM.findDOMNode(this));
  }
	render() {
		const {className, style, name, fill, ...rest} = this.props;
		return (
			<span className={classes(sc('wrapper'), className)} style={style} {...rest}>
        <svg className={classes(sc('', name))}
						 style={{fill}}>
          <use xlinkHref={`#${name}`}/>
        </svg>
      </span>
		);
	}
}

export default Icon;