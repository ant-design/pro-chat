import { Copy, Edit, RotateCw, Trash } from 'lucide-react';

import { ActionIconGroupItems } from '@/ActionIconGroup';

interface ChatListActionsBar {
  copy: ActionIconGroupItems;
  del: ActionIconGroupItems;
  divider: { key: 'divider'; type: 'divider' };
  edit: ActionIconGroupItems;
  regenerate: ActionIconGroupItems;
}

export const useChatListActionsBar = (text?: {
  copy?: string;
  delete?: string;
  edit?: string;
  regenerate?: string;
}): ChatListActionsBar => {
  return {
    copy: {
      icon: Copy,
      key: 'copy',
      label: text?.copy || 'Copy',
    },
    del: {
      icon: Trash,
      key: 'del',
      label: text?.delete || 'Delete',
    },
    divider: {
      type: 'divider',
      key: 'divider',
    },
    edit: {
      icon: Edit,
      key: 'edit',
      label: text?.edit || 'Edit',
    },
    regenerate: {
      icon: RotateCw,
      key: 'regenerate',
      label: text?.regenerate || 'Regenerate',
    },
  };
};
