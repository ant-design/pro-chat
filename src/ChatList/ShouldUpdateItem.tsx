import isEqual from 'fast-deep-equal';
import { Component } from 'react';

class ShouldUpdateItem extends Component<
  {
    shouldUpdate?: (prevProps: any, nextProps: any) => boolean;
    children: React.ReactNode;
    [key: string]: any;
  },
  any
> {
  shouldComponentUpdate(nextProps: any) {
    if (nextProps.shouldUpdate) {
      return nextProps.shouldUpdate(this.props, nextProps);
    }
    try {
      return !isEqual(this.props, nextProps);
    } catch (error) {
      return true;
    }
  }
  render() {
    return this.props.children;
  }
}

export default ShouldUpdateItem;
