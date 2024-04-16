/**
 * compact: true
 */
import { ChatMessage, ProChat } from '@ant-design/pro-chat';

import { useTheme } from 'antd-style';
import { example } from '../mocks/basic';
import { MockResponse } from '../mocks/streamResponse';

import { Button } from 'antd';
import { useEffect, useState } from 'react';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!speechRecognition) {
      alert('Sorry, your browser does not support Speech Recognition.');
      return;
    }

    const recognition = new speechRecognition();
    recognition.continuous = true; // Keep listening even after voice stops
    recognition.interimResults = true; // Show interim results
    recognition.lang = 'zh-CN'; // Set the language of the recognizer

    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = (event) => {
      console.log('event', event);

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          setTranscript((transcript) => transcript + event.results[i][0].transcript + ' ');
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Voice recognition error', event.error);
    };

    recognition.onend = () => {
      console.log('Voice recognition ended');
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    // Clean up function
    return () => {
      recognition.stop();
    };
  }, [isListening]);

  return (
    <div>
      <h1>Speech to Text Conversion</h1>
      <Button onClick={() => setIsListening((prevState) => !prevState)}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </Button>
      <p>{transcript}</p>
    </div>
  );
};

export default () => {
  const theme = useTheme();

  const [chats, setChats] = useState<ChatMessage<Record<string, any>>[]>(example.chats);

  return (
    <div style={{ background: theme.colorBgLayout }}>
      <SpeechToText />
      <ProChat
        chats={chats}
        onChatsChange={(chats) => {
          setChats(chats);
        }}
        request={async (messages) => {
          const mockedData: string = `这是一段模拟的流式字符串数据。本次会话传入了${messages.length}条消息`;

          const mockResponse = new MockResponse(mockedData, 100);

          return mockResponse.getResponse();
        }}
      />
    </div>
  );
};
