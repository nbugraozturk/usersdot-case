import { useEffect } from 'react';
import { notification } from 'antd';

const Message = ({ message, duration = 3, fireNotification, type = 'info'}) => {
    useEffect(() => {        
        if (fireNotification) {
            const notificationType = message?.type || type;
            notification[notificationType]({
                message: 'Notification',
                description: message?.text || message,
                duration: duration,
            });
        }
    }, [message, duration, fireNotification]);

    return null;
};

export default Message;
