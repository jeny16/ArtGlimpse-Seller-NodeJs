import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Badge,
  Divider
} from '@mui/material';
import { 
  Bell, 
  Package, 
  MessageCircle, 
  AlertCircle, 
  Award
} from 'lucide-react';

const NotificationsWidget = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'order', 
      message: 'New order #ORD-7829 received from Rahul Sharma - 3 items for ₹1,450', 
      time: '10 minutes ago',
      read: false
    },
    { 
      id: 2, 
      type: 'message', 
      message: 'Customer Priya Patel has inquired about the shipping time for order #ORD-7825', 
      time: '1 hour ago',
      read: false
    },
    { 
      id: 3, 
      type: 'alert', 
      message: 'Low stock alert for "Eco-Friendly Water Bottle" - Only 5 units remaining', 
      time: '3 hours ago',
      read: true
    },
    { 
      id: 4, 
      type: 'achievement', 
      message: 'Congratulations! You reached 200 orders this month - a new record for your store', 
      time: '1 day ago',
      read: true
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const getIcon = (type) => {
    switch(type) {
      case 'order':
        return <Package size={18} color="#1976d2" />;
      case 'message':
        return <MessageCircle size={18} color="#2e7d32" />;
      case 'alert':
        return <AlertCircle size={18} color="#d32f2f" />;
      case 'achievement':
        return <Award size={18} color="#ed6c02" />;
      default:
        return <Bell size={18} />;
    }
  };

  const getBgColor = (type) => {
    switch(type) {
      case 'order':
        return 'rgba(25, 118, 210, 0.1)';
      case 'message':
        return 'rgba(46, 125, 50, 0.1)';
      case 'alert':
        return 'rgba(211, 47, 47, 0.1)';
      case 'achievement':
        return 'rgba(237, 108, 2, 0.1)';
      default:
        return 'rgba(0, 0, 0, 0.05)';
    }
  };

  return (
    <>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
      }}>
        <Typography variant="h6" fontWeight={600}>
          Notifications
        </Typography>
        <Badge badgeContent={notifications.filter(n => !n.read).length} color="error">
          <Bell size={20} />
        </Badge>
      </Box>

      {/* Filter Tabs */}
      <Box sx={{ 
        px: 2, 
        pt: 2, 
        pb: 1, 
        display: 'flex', 
        gap: 1,
        overflowX: 'auto',
        '::-webkit-scrollbar': { height: 0, display: 'none' }
      }}>
        {['all', 'unread', 'order', 'message', 'alert'].map((tab) => (
          <Box 
            key={tab}
            onClick={() => setActiveTab(tab)}
            sx={{
              px: 2,
              py: 0.8,
              borderRadius: 4,
              fontSize: '0.875rem',
              fontWeight: activeTab === tab ? 600 : 400,
              bgcolor: activeTab === tab ? 'primary.light' : 'transparent',
              color: activeTab === tab ? 'primary.main' : 'text.secondary',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: activeTab === tab ? 'primary.light' : 'action.hover'
              }
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Box>
        ))}
      </Box>

      {/* Action buttons */}
      <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography 
          variant="body2" 
          color="primary" 
          sx={{ cursor: 'pointer', fontWeight: 500 }}
          onClick={markAllAsRead}
        >
          Mark all as read
        </Typography>
      </Box>

      <Divider />

      {/* Notifications List */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', pt: 1 }}>
        {notifications
          .filter(n => activeTab === 'all' || 
                      (activeTab === 'unread' && !n.read) || 
                      n.type === activeTab)
          .map((notification, index) => (
            <Box 
              key={notification.id}
              sx={{
                p: 2,
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                bgcolor: notification.read ? 'transparent' : 'rgba(25, 118, 210, 0.04)',
                transition: 'background-color 0.2s',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <Box sx={{ display: 'flex', mb: 1.5 }}>
                <Box 
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mr: 1.5,
                    bgcolor: getBgColor(notification.type),
                    flexShrink: 0
                  }}
                >
                  {getIcon(notification.type)}
                </Box>
                
                <Box sx={{ flexGrow: 1 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 0.5, 
                      fontWeight: notification.read ? 400 : 600,
                      lineHeight: 1.4
                    }}
                  >
                    {notification.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                gap: 1,
                mt: 1
              }}>
                {!notification.read && (
                  <Typography 
                    variant="caption" 
                    color="primary" 
                    sx={{ cursor: 'pointer', fontWeight: 500 }}
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </Typography>
                )}
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  sx={{ cursor: 'pointer' }}
                  onClick={() => deleteNotification(notification.id)}
                >
                  Delete
                </Typography>
              </Box>
            </Box>
          ))}
          
        {notifications.filter(n => 
          activeTab === 'all' || 
          (activeTab === 'unread' && !n.read) || 
          n.type === activeTab
        ).length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No notifications to display
            </Typography>
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.08)', textAlign: 'center' }}>
        <Typography 
          variant="body2" 
          color="primary" 
          sx={{ cursor: 'pointer', fontWeight: 500 }}
        >
          View all notifications
        </Typography>
      </Box>
    </>
  );
};

export default NotificationsWidget;