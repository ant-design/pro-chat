import { memo } from 'react';

import { LOADING_FLAT } from '@/const/message';
import { Collapse, Divider, Typography } from 'antd';
import ReactMarkdown from 'react-markdown';
import BubblesLoading from '../Loading';

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

export const MessageComponent: React.FC<{
  content: string | React.ReactNode;
}> = memo(({ content }) => {
  if (content === LOADING_FLAT) return <BubblesLoading />;
  if (typeof content !== 'string') return content;
  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
});
