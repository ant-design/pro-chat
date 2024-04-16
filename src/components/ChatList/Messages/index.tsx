import { AnimText } from '@/components/Animation/AnimText';
import { LOADING_FLAT } from '@/const/message';
import { Collapse, Divider, Typography } from 'antd';
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import BubblesLoading from '../Loading';
import { useStyles } from './style';

const MemoHr = memo((props) => (
  <Divider style={{ marginBottom: '1em', marginTop: 0 }} {...props} />
));
const MemoDetails = memo((props) => <Collapse style={{ marginBottom: '1em' }} {...props} />);
const MemoImage = memo((props) => <img {...props} />);
const MemoAlink = memo((props) => <Typography.Link {...props} />);

const components: any = {
  details: MemoDetails,
  hr: MemoHr,
  a: MemoAlink,
  img: MemoImage,
  // pre: Code,
};

const Render = ({ children }: { children: string }) => {
  const { styles } = useStyles();
  return (
    <ReactMarkdown className={styles.markdown} components={components}>
      {children}
    </ReactMarkdown>
  );
};

export const MessageComponent: React.FC<{
  content: string | React.ReactNode;
  animation?: boolean;
}> = memo(({ content, animation }) => {
  if (content === LOADING_FLAT) return <BubblesLoading />;
  if (typeof content !== 'string') return content;
  if (!animation) {
    return <Render>{content}</Render>;
  }
  return (
    <Typography>
      <AnimText Render={Render}>{content}</AnimText>
    </Typography>
  );
});
