import { gLocaleObject } from '@/locale';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { ProChat } from '..';

describe('ProChat', () => {
  it('input area render worked', () => {
    const wrapper = render(
      <ProChat
        inputAreaRender={() => {
          return <div>RenderInputArea</div>;
        }}
      />,
    );
    expect(wrapper.getByText('RenderInputArea')).toBeTruthy();
  });

  it('i18n worked', () => {
    const app = render(<ProChat locale="en-US" />);
    const text = gLocaleObject('en-US');
    expect(app.queryByPlaceholderText(text.placeholder)).toBeTruthy();
  });

  it('onEditFinished callback', async () => {
    const fn = vi.fn();
    const APP = () => {
      return (
        <ProChat
          initialChats={[
            { id: '1', content: 'test', role: 'user', createAt: Date.now(), updateAt: Date.now() },
          ]}
          chatItemRenderConfig={{
            actionsCallbacks: {
              onEditFinished: fn,
            },
          }}
        />
      );
    };
    const app = render(<APP />);
    const editButton = app.baseElement.querySelectorAll('.anticon').item(1);
    await fireEvent.click(editButton);
    waitFor(() => {
      const confirmButton = app.queryByText('确 认');
      expect(confirmButton).toBeTruthy();
      fireEvent.click(confirmButton);
      expect(fn).toBeCalled();
    });
  });
});
