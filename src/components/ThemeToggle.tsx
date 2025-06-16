import React from 'react';
import { Button, Tooltip } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle, className = '' }) => {
  return (
    <Tooltip title={isDark ? '切换到浅色模式' : '切换到深色模式'}>
      <Button
        type="text"
        icon={isDark ? <SunOutlined /> : <MoonOutlined />}
        onClick={onToggle}
        className={`${className} transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
        size="large"
      />
    </Tooltip>
  );
};

export default ThemeToggle;