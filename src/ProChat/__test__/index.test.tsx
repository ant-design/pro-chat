import { render } from '@testing-library/react';
import { ProChat } from '..';

describe('ProChat', () => {
  it('input area render worked', () => {
    const wrapper = render(
      <ProChat
        renderInputArea={() => {
          return <div>RenderInputArea</div>;
        }}
      />,
    );
    expect(wrapper.getByText('RenderInputArea')).toBeInTheDocument();
  });
});
