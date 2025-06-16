import React from 'react';
import { Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { timezoneOptions, timezoneGroups, getTimezonesByGroup, type TimezoneOption } from '../utils/timezoneData';

interface TimeZoneSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TimeZoneSelector: React.FC<TimeZoneSelectorProps> = ({
  value,
  onChange,
  className = ''
}) => {
  const groupedTimezones = getTimezonesByGroup();

  const renderOption = (timezone: TimezoneOption) => ({
    label: (
      <div className="flex justify-between items-center">
        <span className="text-gray-900 dark:text-gray-100">{timezone.label}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
          {timezone.utcOffset}
        </span>
      </div>
    ),
    value: timezone.value,
    key: timezone.value
  });

  const options = Object.entries(groupedTimezones).map(([groupKey, timezones]) => ({
    label: (
      <div className="font-medium text-primary-600 dark:text-primary-400 py-1">
        {timezoneGroups[groupKey as keyof typeof timezoneGroups]}
      </div>
    ),
    options: timezones.map(renderOption)
  }));

  const selectedTimezone = timezoneOptions.find(tz => tz.value === value);

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        <GlobalOutlined className="mr-2" />
        时区选择
      </label>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        showSearch
        placeholder="请选择时区"
        className="w-full"
        size="large"
        filterOption={(input, option) => {
          if (!option || !option.value) return false;
          const timezone = timezoneOptions.find(tz => tz.value === option.value);
          if (!timezone) return false;
          
          const searchText = input.toLowerCase();
          return (
            timezone.label.toLowerCase().includes(searchText) ||
            timezone.value.toLowerCase().includes(searchText) ||
            timezone.utcOffset.toLowerCase().includes(searchText)
          );
        }}
        dropdownStyle={{
          maxHeight: 400,
          overflow: 'auto'
        }}
        dropdownRender={(menu) => (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            {menu}
          </div>
        )}
      />
      {selectedTimezone && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          当前选择: {selectedTimezone.label} ({selectedTimezone.utcOffset})
        </div>
      )}
    </div>
  );
};

export default TimeZoneSelector;