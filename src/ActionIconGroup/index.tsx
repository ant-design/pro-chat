import ActionIcon, { ActionIconProps } from '@/ActionIcon';
import Icon from '@/Icon';
import Spotlight from '@/components/Spotlight';
import { ActionGroup as ProEditorActionGroup } from '@ant-design/pro-editor';

import { DropdownProps } from 'antd';
import { type LucideIcon } from 'lucide-react';
import { memo } from 'react';

import { DivProps } from '@/types';

export interface ActionIconGroupItems {
  icon?: LucideIcon;
  key: string;
  label?: string;
}

export interface ActionEvent {
  item: ActionIconGroupItems;
  key: string;
  keyPath: string[];
}

export interface ActionIconGroupProps extends Omit<DivProps, 'content'> {
  /**
   * @description The direction of the icons
   * @default "row"
   */
  direction?: 'row' | 'column';
  /**
   * @description The menu items for the dropdown
   */
  dropdownMenu?: (ActionIconGroupItems | { type: 'divider' })[];
  /**
   * @description The items to be rendered
   * @default []
   */
  items?: ActionIconGroupItems[];
  onActionClick?: (action: ActionEvent) => void;
  /**
   * @description The position of the tooltip relative to the target
   * @enum ["top","left","right","bottom","topLeft","topRight","bottomLeft","bottomRight","leftTop","leftBottom","rightTop","rightBottom"]
   */
  placement?: ActionIconProps['placement'];
  /**
   * @description Whether to add a spotlight background
   * @default true
   */
  spotlight?: boolean;
  /**
   * @description The type of the group
   * @default "block"
   */
  type?: 'ghost' | 'block' | 'pure';
}

const ActionIconGroup = memo<ActionIconGroupProps>(
  ({
    type = 'block',
    items = [],
    placement,
    spotlight = false,
    direction = 'row',
    dropdownMenu = null,
    onActionClick,
    className,
    style,
  }) => {
    const tooltipsPlacement = placement || (direction === 'column' ? 'right' : 'top');

    const mergeDropDownList = dropdownMenu?.map((item: any) => {
      console.log('##cloes', item);
      return {
        ...item,
        icon: <Icon icon={item.icon} size="small" />,
        onClick: onActionClick
          ? (info: ActionEvent) =>
              onActionClick({
                item,
                key: info.key,
                keyPath: info.keyPath,
              })
          : undefined,
      };
    });

    return (
      <ProEditorActionGroup
        className={className}
        direction={direction}
        type={type}
        dropdownProps={{
          placement: tooltipsPlacement as DropdownProps['placement'],
        }}
        style={style}
        dropdownMenu={mergeDropDownList}
        render={() => {
          return (
            <>
              {spotlight && <Spotlight />}
              {items?.length > 0 &&
                items.map((item) => (
                  <ActionIcon
                    icon={item.icon}
                    key={item.key}
                    onClick={
                      onActionClick
                        ? () => onActionClick?.({ item, key: item.key, keyPath: [item.key] })
                        : undefined
                    }
                    placement={tooltipsPlacement}
                    size="small"
                    title={item.label}
                  />
                ))}
            </>
          );
        }}
      />
    );
  },
);

export default ActionIconGroup;
