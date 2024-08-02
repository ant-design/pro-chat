import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  ({ css, stylish, cx }, { glass }: { active: boolean; glass: boolean }) => {
    return {
      block: cx(
        glass && stylish?.blur,
        css`
          cursor: pointer;

          position: relative;

          display: flex;
          flex: none;
          align-items: center;
          justify-content: center;
        `,
      ),
    };
  },
);
