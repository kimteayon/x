import { useState } from 'react';
import type { TypeOpen, useNotificationType } from './interface';
let uuid = 0;
class XNotification {
  static permissionState: NotificationPermission;
  static setPermissionState: React.Dispatch<React.SetStateAction<NotificationPermission>>;
  static permissionMap: Map<TypeOpen['key'], any> = new Map();
  get permission() {
    return Notification?.permission;
  }
  public open(arg: TypeOpen): void {
    const { title, key, onClick, duration, onClose, onError, onShow, ...config } = arg || {};
    if (key && XNotification.permissionMap.has(key)) return;
    uuid += 1;
    const mergeKey = key || `x_notification_${uuid}`;
    console.log(XNotification.permissionMap);

    const notification: Notification = new Notification(title, config || {});
    const close = notification.close.bind(notification);
    if (typeof duration === 'number') {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        close();
      }, duration * 1000);
    }
    notification.onclick = (event) => {
      onClick?.(event, close);
    };
    notification.onclose = (event) => {
      onClose?.(event);
      XNotification.permissionMap.delete(mergeKey);
    };
    notification.onshow = (event) => {
      onShow?.(event);
      XNotification.permissionMap.set(mergeKey, {
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

  public useNotification(): useNotificationType {
    const [permission, setPermission] = useState<NotificationPermission>(Notification?.permission);
    XNotification.permissionState = permission;
    XNotification.setPermissionState = setPermission;
    return [
      { permission },
      {
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

export type { XNotification };
export default notification;
