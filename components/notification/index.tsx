import { useState } from 'react';
class XNotification {
  static permissionState: NotificationPermission;
  static setPermissionState: React.Dispatch<React.SetStateAction<NotificationPermission>>;
  static permissionMap: Map<string, any> = new Map();
  get permission() {
    return Notification?.permission;
  }
  public open(arg: ContentType): void {
    const { title, key, onClick, duration, onClose, onError, onShow, ...config } = arg || {};
    const notification: Notification = new Notification(title, config || {});
    const close = notification.close.bind(notification);
    if (XNotification.permissionMap.has(key)) return;
    if (typeof duration === 'number') {
      setTimeout(() => {
        close();
      }, duration * 1000);
    }
    notification.onclick = (event) => {
      onClick?.(event, close);
    };
    notification.onclose = (event) => {
      onClose?.(event);
      XNotification.permissionMap.delete(key);
    };
    notification.onshow = (event) => {
      onShow?.(event);
      XNotification.permissionMap.set(key, {
        close,
      });
    };
    notification.onerror = (event) => {
      onError?.(event);
    };
  }

  public async requestPermission(): Promise<NotificationPermission> {
    const permissionRes = await Notification.requestPermission();
    XNotification.setPermissionState(permissionRes);
    return permissionRes;
  }

  public useNotification() {
    const [permission, setPermission] = useState<NotificationPermission>(Notification?.permission);
    XNotification.permissionState = permission;
    XNotification.setPermissionState = setPermission;
    return [
      { permission },
      {
        open: this.open,
        requestPermission: this.requestPermission,
      },
    ];
  }
  public destroy() {
    Array.from(XNotification.permissionMap.keys()).forEach((key) => {
      XNotification.permissionMap.get(key)?.close?.();
    });
  }
}

const notification = new XNotification();

export default notification;
