type TypeOpen = NotificationOptions & {
  key?: string | number;
  title: string;
  onClick?: (event: Event, close?: Notification['close']) => void;
  onClose?: (event: Event) => void;
  onError?: (event: Event) => void;
  onShow?: (event: Event) => void;
  duration?: number;
};
