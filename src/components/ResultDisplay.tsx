import React, { useState } from 'react';
import { Card, Button, message, Tooltip } from 'antd';
import {
  ClockCircleOutlined,
  CalendarOutlined,
  TrophyOutlined,
  GlobalOutlined,
  CopyOutlined,
  CheckOutlined
} from '@ant-design/icons';
import { CalculationResult } from '../utils/timeCalculation';
import { formatNumber, formatDuration, copyToClipboard } from '../utils/formatting';
import { findTimezoneByValue } from '../utils/timezoneData';

interface ResultDisplayProps {
  result: CalculationResult | null;
  loading?: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, loading = false }) => {
  const [copied, setCopied] = useState(false);

  if (!result || result.error) {
    if (result?.error) {
      return (
        <Card className="mt-6 border-red-200 dark:border-red-800">
          <div className="text-center py-8">
            <div className="text-red-500 text-lg mb-2">⚠️ 计算错误</div>
            <div className="text-red-600 dark:text-red-400">{result.error}</div>
          </div>
        </Card>
      );
    }
    return null;
  }

  const timezone = findTimezoneByValue(result.timezone);
  const durationText = formatDuration(result.hoursNeeded);

  const handleCopy = async () => {
    const copyText = `升级完成时间: ${result.completionTime}\n` +
                    `所需时长: ${durationText}\n` +
                    `剩余经验: ${formatNumber(result.remainingExp)}\n` +
                    `时区: ${timezone?.label || result.timezone}`;
    
    const success = await copyToClipboard(copyText);
    if (success) {
      setCopied(true);
      message.success('结果已复制到剪贴板');
      setTimeout(() => setCopied(false), 2000);
    } else {
      message.error('复制失败，请手动复制');
    }
  };

  return (
    <div className="mt-6 animate-slide-up">
      <Card 
        className="border-primary-200 dark:border-primary-800 shadow-lg"
        loading={loading}
      >
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            🎯 升级计算结果
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            根据您的输入计算得出以下结果
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 完成时间 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <ClockCircleOutlined className="text-blue-500 text-lg mr-2" />
              <span className="font-medium text-gray-700 dark:text-gray-300">升级完成时间</span>
            </div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {result.completionTime}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {timezone?.label || result.timezone}
            </div>
          </div>

          {/* 所需时长 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <CalendarOutlined className="text-green-500 text-lg mr-2" />
              <span className="font-medium text-gray-700 dark:text-gray-300">所需时长</span>
            </div>
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              {durationText}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              约 {formatNumber(result.hoursNeeded, 1)} 小时
            </div>
          </div>

          {/* 剩余经验 */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <TrophyOutlined className="text-purple-500 text-lg mr-2" />
              <span className="font-medium text-gray-700 dark:text-gray-300">剩余经验值</span>
            </div>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {formatNumber(result.remainingExp)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              需要获取的经验值
            </div>
          </div>

          {/* 时区信息 */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <GlobalOutlined className="text-orange-500 text-lg mr-2" />
              <span className="font-medium text-gray-700 dark:text-gray-300">时区信息</span>
            </div>
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {timezone?.utcOffset || 'UTC+0'}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {timezone?.label || result.timezone}
            </div>
          </div>
        </div>

        {/* 详细时间分解 */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            📊 时间详细分解
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {result.daysNeeded}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">天</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {result.hoursRemainder}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">小时</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {result.minutesRemainder}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">分钟</div>
            </div>
          </div>
        </div>

        {/* 复制按钮 */}
        <div className="mt-6 text-center">
          <Tooltip title="复制结果到剪贴板">
            <Button
              type="primary"
              icon={copied ? <CheckOutlined /> : <CopyOutlined />}
              onClick={handleCopy}
              className={`${copied ? 'bg-green-500 border-green-500' : ''} transition-all duration-300`}
              size="large"
            >
              {copied ? '已复制' : '复制结果'}
            </Button>
          </Tooltip>
        </div>
      </Card>
    </div>
  );
};

export default ResultDisplay;