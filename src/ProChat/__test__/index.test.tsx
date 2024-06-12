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

    fireEvent.click(btns.item(2));
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
              onEdit: fn1,
              onRegenerate: fn,
              onDelete: fn2,
            },
          }}
        />
      );
    };
    const app = render(<APP />);
    const btns = app.baseElement.querySelector('.ant-editor-action-group-content');
    expect(btns.children.length).greaterThan(2);
    const regenerateButton = btns.children.item(0);
    const editButton = btns.children.item(1);
    const moreButton = btns.children.item(2);

    fireEvent.click(regenerateButton);
    waitFor(() => {
      expect(fn).toBeCalled();
    });

    fireEvent.click(editButton);
    waitFor(() => {
      const confirmButton = app.queryByText('确 认');
      expect(confirmButton).toBeTruthy();
      fireEvent.click(confirmButton);
      expect(fn1).toBeCalled();
    });

    fireEvent.click(moreButton);
    waitFor(() => {
      const delBtn = app.queryByText('删除');
      expect(delBtn).toBeTruthy();
      fireEvent.click(delBtn);
      expect(fn2).toBeCalled();
    });
  });
});
