import { act, render } from '@testing-library/react';
import { Button } from 'antd';
import React from 'react';
import notification, { XNotification } from '../index';

describe('XNotification', () => {
  let mockNotification: jest.Mocked<Notification>;

  beforeEach(() => {
    // Mock Notification API
    mockNotification = {
      close: jest.fn(),
      onclick: null,
      onclose: null,
      onshow: null,
      onerror: null,
    } as any;

    global.Notification = jest.fn().mockImplementation(() => mockNotification) as any;
    Object.defineProperty(global.Notification, 'permission', {
      value: 'default',
      writable: true,
    });
    global.Notification.requestPermission = jest.fn().mockResolvedValue('granted');

    // Reset static properties
    (notification as any).permissionMap = new Map();
  });

  describe('open', () => {
    it('should create notification with title', () => {
      notification.open({ title: 'Test' });
      expect(Notification).toHaveBeenCalledWith('Test', {});
    });

    it('should not create duplicate notification with same key', () => {
      // Reset mock implementation to track calls properly
      const mockFn = jest.fn().mockImplementation(() => ({
        close: jest.fn(),
        onclick: null,
        onclose: null,
        onshow: null,
        onerror: null,
      }));
      global.Notification = mockFn as any;

      notification.open({ title: 'Test', key: 'test-key' });
      notification.open({ title: 'Test', key: 'test-key' });
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should call onClick callback', () => {
      const onClick = jest.fn();
      notification.open({ title: 'Test', onClick });

      mockNotification.onclick!({} as any);
      expect(onClick).toHaveBeenCalled();
    });

    it('should auto close after duration', () => {
      jest.useFakeTimers();
      notification.open({ title: 'Test', duration: 5 });

      jest.advanceTimersByTime(5000);
      expect(mockNotification.close).toHaveBeenCalled();
    });
  });

  describe('close', () => {
    it('should close all notifications', () => {
      // Create separate mock instances for each notification
      const mockClose1 = jest.fn();
      const mockClose2 = jest.fn();

      // First notification
      global.Notification = jest.fn().mockImplementationOnce(() => ({
        ...mockNotification,
        close: mockClose1,
      })) as any;
      notification.open({ title: 'Test1', key: 'key1' });

      // Second notification
      global.Notification = jest.fn().mockImplementationOnce(() => ({
        ...mockNotification,
        close: mockClose2,
      })) as any;
      notification.open({ title: 'Test2', key: 'key2' });

      notification.close();
      expect(mockClose1).toHaveBeenCalledTimes(1);
      expect(mockClose2).toHaveBeenCalledTimes(1);
    });
  });

  describe('requestPermission', () => {
    it('should update permission state', async () => {
      const permission = await notification.requestPermission();
      expect(permission).toBe('granted');
      expect((notification as any).permissionState).toBe('granted');
    });
  });

  describe('useNotification', () => {
    it('should return permission state and methods', () => {
      const [state, methods] = notification.useNotification();

      expect(state.permission).toBeDefined();
      expect(methods.open).toBeDefined();
      expect(methods.close).toBeDefined();
      expect(methods.requestPermission).toBeDefined();
    });

    describe('in React components', () => {
      it('should update when permission changes', async () => {
        const TestComponent = () => {
          const [{ permission }] = notification.useNotification();
          return <div data-testid="permission">{permission}</div>;
        };

        const { getByTestId, rerender } = render(<TestComponent />);
        expect(getByTestId('permission').textContent).toBe('default');

        await act(async () => {
          await notification.requestPermission();
        });
        rerender(<TestComponent />);
        expect(getByTestId('permission').textContent).toBe('granted');
      });

      it('should share state between components', () => {
        const ComponentA = () => {
          const [{ permission }] = notification.useNotification();
          return <div data-testid="compA">{permission}</div>;
        };

        const ComponentB = () => {
          const [{ permission }] = notification.useNotification();
          return <div data-testid="compB">{permission}</div>;
        };

        const { getByTestId } = render(
          <>
            <ComponentA />
            <ComponentB />
          </>,
        );

        expect(getByTestId('compA').textContent).toBe('default');
        expect(getByTestId('compB').textContent).toBe('default');
      });

      it('should handle component unmount', () => {
        const { unmount } = render(
          <div>
            {(() => {
              const [{ permission }] = notification.useNotification();
              return permission;
            })()}
          </div>,
        );

        expect(() => unmount()).not.toThrow();
      });

      it('should allow opening notifications from component', () => {
        const TestComponent = () => {
          const [, { open }] = notification.useNotification();
          return (
            <Button data-testid="open-btn" onClick={() => open({ title: 'Component Test' })}>
              Open
            </Button>
          );
        };

        const { getByTestId } = render(<TestComponent />);
        act(() => {
          getByTestId('open-btn').click();
        });
        expect(Notification).toHaveBeenCalledWith('Component Test', {});
      });
    });
  });
});
