import React, { createContext, useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './Notification.module.css';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Add a new notification
  const addNotification = useCallback((notification) => {
    setNotifications((prev) => {
      const newNotification = { ...notification, id: Date.now() };
      // If there are already 3 notifications, remove the oldest
      if (prev.length >= 3) {
        return [...prev.slice(1), newNotification];
      }
      return [...prev, newNotification];
    });
  }, []);

  // Remove a notification by its id
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className={styles.notificationContainer}>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`${styles.notification} ${styles[notification.type]}`}
          >
            <div className={styles.header}>
              <span className={styles.title}>{notification.title}</span>
              <button
                onClick={() => removeNotification(notification.id)}
                className={styles.closeButton}
              >
                ×
              </button>
            </div>
            <div className={styles.message}>{notification.message}</div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
