type ContentType = NotificationOptions & {
  key: string;
  title: string;
  onClick?: (event: any, close?: Notification['close']) => void;
  onClose?: any;
  onError?: any;
  onShow?: any;
  duration?: number;
};
