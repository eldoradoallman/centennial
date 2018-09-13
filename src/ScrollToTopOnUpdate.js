import { Component } from 'react';

class ScrollToTopOnUpdate extends Component {
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return null;
  }
}

export default ScrollToTopOnUpdate;
