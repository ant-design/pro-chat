import { gLocaleObject } from '@/locale';
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

  it('i18n worked', () => {
    const app = render(<ProChat locale="en-US" />);
    const text = gLocaleObject('en-US');
    expect(app.queryByPlaceholderText(text.placeholder)).toBeInTheDocument();
  });
});
