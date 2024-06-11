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

  it('actions custom configure', async () => {
    const app = render(
      <ProChat
        chatItemRenderConfig={{
          actionsProps: {
            user: {
              actions: ['regenerate', 'edit'],
              moreActions: ['del', 'copy'],
            },
          },
        }}
      />,
    );

    const btns = app.baseElement.querySelectorAll('.anticon');

    await fireEvent.click(btns.item(2));
    waitFor(() => {
      const regenerate = app.queryByText('重新生成');
      expect(regenerate).not.toBeTruthy();
    });
  });

  it('onEditFinished callback', async () => {
    const fn = vi.fn();
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    const APP = () => {
      return (
        <ProChat
          initialChats={[
            { id: '1', content: 'test', role: 'user', createAt: Date.now(), updateAt: Date.now() },
          ]}
          chatItemRenderConfig={{
            actionsCallbacks: {
              onEditFinished: fn1,
              onRegenerateFinished: fn,
              beforeDelFinished: fn2,
            },
          }}
        />
      );
    };
    const app = render(<APP />);
    const btns = app.baseElement.querySelectorAll('.anticon');
    expect(btns.length).greaterThan(3);

    const regenerateButton = btns.item(0);
    const editButton = btns.item(1);
    const moreButton = btns.item(2);

    await fireEvent.click(regenerateButton);
    waitFor(() => {
      expect(fn).toBeCalled();
    });

    await fireEvent.click(editButton);
    waitFor(() => {
      const confirmButton = app.queryByText('确 认');
      expect(confirmButton).toBeTruthy();
      fireEvent.click(confirmButton);
      expect(fn1).toBeCalled();
    });

    await fireEvent.click(moreButton);
    waitFor(() => {
      const delBtn = app.queryByText('删除');
      expect(delBtn).toBeTruthy();
      fireEvent.click(delBtn);
      expect(fn2).toBeCalled();
    });
  });
});
