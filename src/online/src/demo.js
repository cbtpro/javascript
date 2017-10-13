import intl from 'react-intl-universal';
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import styles from './styles.css';
import styles2 from './styles.scss';

class Demo extends Component {

  constructor(props) {
    super(props);
  };

  componentDidMount() {
  };

  renderDemo() {
    return (
      <div>
        <h1 className={styles.hello}>{intl.get('HELLO_WORLD')}</h1>
        <h2 className="hello1">{intl.get('HELLO', {name:'Human', where:'Seibertron'})}</h2>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderDemo()}
      </div>
    );
  };

};

export default Demo;