import { useState } from 'react';
class XNotification {
  static permissionState: NotificationPermission;
  static setPermissionState: React.Dispatch<React.SetStateAction<NotificationPermission>>;
  static permissionMap: Map<string | number, any> = new Map();
  get permission() {
    return Notification?.permission;
  }
  public open(arg: TypeOpen): void {
    const { title, key, onClick, duration, onClose, onError, onShow, ...config } = arg || {};
    const notification: Notification = new Notification(title, config || {});
    const close = notification.close.bind(notification);
    if (key && XNotification.permissionMap.has(key)) return;
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
      key && XNotification.permissionMap.delete(key);
    };
    notification.onshow = (event) => {
      onShow?.(event);
      key &&
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
      {
        permission,
        open: this.open,
        close: this.close,
        requestPermission: this.requestPermission,
      },
    ];
  }
  public close() {
    Array.from(XNotification.permissionMap.keys()).forEach((key) => {
      XNotification.permissionMap.get(key)?.close?.();
    });
  }
}

const notification = new XNotification();

export default notification;
