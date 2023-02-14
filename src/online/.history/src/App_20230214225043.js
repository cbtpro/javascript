import intl from "react-intl-universal";
import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Rx from 'rxjs/Rx';

import Demo from './Demo';
import AutoCompletion from './components/autocompletion';

//国际化
const SUPPOER_LOCALES = [
  {
    name: "English",
    value: "en-US"
  },
  {
    name: "简体中文",
    value: "zh-CN"
  },
  {
    name: "繁體中文",
    value: "zh-TW"
  },
  {
    name: "français",
    value: "fr-FR"
  },
  {
    name: "日本の",
    value: "ja-JP"
  }
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultLocale: navigator.language || 'zh-CN'
    };
    this.onSelectLocale = this.onSelectLocale.bind(this);
    this.initI18N();
  };

  componentDidMount() {
    
  }

  initI18N(lang) {
    debugger;
    const currentLocale = lang || this.state.defaultLocale;
    intl.init({
      currentLocale,
      locales: {
        [currentLocale]: require(`./locales/${currentLocale}`)
      }
    });
  };

  onSelectLocale(e) {
    let lang = e.target.value;
    this.setState({
      defaultLocale:lang
    });
    this.initI18N(lang);
  }

  renderLocaleSelector() {
    return (
      <select onChange={this.onSelectLocale} defaultValue={this.state.defaultLocale}>
        <option value="" disabled>Change Language</option>
        {
          SUPPOER_LOCALES.map(locale => (
          <option key={locale.value} value={locale.value}>{locale.name}</option>
          ))
        }
      </select>
    );
  };

  render() {
    return (
      <div>
        {this.renderLocaleSelector()}
        <Demo />
        <AutoCompletion />
      </div>
    );
  };

};

export default App