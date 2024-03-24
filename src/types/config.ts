// 语言模型的设置参数
export interface ModelParams {
  /**
   * 控制生成文本中的惩罚系数，用于减少重复性
   * @default 0
   */
  frequency_penalty?: number;
  /**
   * 生成文本的最大长度
   */
  max_tokens?: number;
  /**
   * 控制生成文本中的惩罚系数，用于减少主题的变化
   * @default 0
   */
  presence_penalty?: number;
  /**
   * 生成文本的随机度量，用于控制文本的创造性和多样性
   * @default 0.6
   */
  temperature?: number;
  /**
   * 控制生成文本中最高概率的单个 token
   * @default 1
   */
  top_p?: number;

  [key: string]: any;
}

export type ModelRoleType = 'user' | 'system' | 'assistant' | 'function';

export interface LLMMessage {
  content: string;
  role: ModelRoleType;
}

export type LLMFewShots = LLMMessage[];

export interface ModelConfig {
  compressThreshold?: number;
  /**
   * 历史消息长度压缩阈值
   */
  enableCompressThreshold?: boolean;
  /**
   * 开启历史记录条数
   */
  enableHistoryCount?: boolean;
  enableMaxTokens?: boolean;
  /**
   * 语言模型示例
   */
  fewShots?: LLMFewShots;
  /**
   * 历史消息条数
   */
  historyCount?: number;
  inputTemplate?: string;
  /**
   * 角色所使用的语言模型
   */
  model?: string;
  /**
   * 语言模型参数
   */
  params?: ModelParams;
  /**
   * 系统角色
   */
  systemRole?: string;
}
