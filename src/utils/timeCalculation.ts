import { format } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

export interface CalculationResult {
  completionTime: string;
  remainingExp: number;
  hoursNeeded: number;
  daysNeeded: number;
  hoursRemainder: number;
  minutesRemainder: number;
  timezone: string;
  error?: string;
}

export interface CalculationInput {
  requiredExp: number;
  currentExp: number;
  expPerHour: number;
  selectedTimezone: string;
}

/**
 * 计算升级所需时间
 * @param input 计算输入参数
 * @returns 计算结果
 */
export function calculateUpgradeTime(input: CalculationInput): CalculationResult {
  const { requiredExp, currentExp, expPerHour, selectedTimezone } = input;
  
  // 1. 计算剩余经验值
  const remainingExp = requiredExp - currentExp;
  
  // 2. 验证输入
  if (remainingExp <= 0) {
    return {
      completionTime: '',
      remainingExp: 0,
      hoursNeeded: 0,
      daysNeeded: 0,
      hoursRemainder: 0,
      minutesRemainder: 0,
      timezone: selectedTimezone,
      error: '当前经验已达到或超过升级所需经验'
    };
  }
  
  if (expPerHour <= 0) {
    return {
      completionTime: '',
      remainingExp,
      hoursNeeded: 0,
      daysNeeded: 0,
      hoursRemainder: 0,
      minutesRemainder: 0,
      timezone: selectedTimezone,
      error: '每小时获取经验值必须大于0'
    };
  }
  
  // 3. 计算所需小时数
  const hoursNeeded = remainingExp / expPerHour;
  
  // 4. 计算所需毫秒数
  const millisecondsNeeded = hoursNeeded * 60 * 60 * 1000;
  
  // 5. 获取当前时间（本地时间）
  const now = new Date();
  
  // 6. 计算升级完成的时间点（本地时间）
  const completionTimeLocal = new Date(now.getTime() + millisecondsNeeded);
  
  // 7. 转换到用户选择的时区
  const completionTimeInUserTimezone = convertToTimezone(completionTimeLocal, selectedTimezone);
  
  // 8. 计算时间分解
  const daysNeeded = Math.floor(hoursNeeded / 24);
  const hoursRemainder = Math.floor(hoursNeeded % 24);
  const minutesRemainder = Math.floor((hoursNeeded % 1) * 60);
  
  return {
    completionTime: completionTimeInUserTimezone,
    remainingExp,
    hoursNeeded,
    daysNeeded,
    hoursRemainder,
    minutesRemainder,
    timezone: selectedTimezone
  };
}

/**
 * 转换时间到指定时区
 * @param date 要转换的日期
 * @param timezone 目标时区
 * @returns 格式化的时间字符串
 */
export function convertToTimezone(date: Date, timezone: string): string {
  try {
    // 将日期转换到指定时区
    const zonedDate = utcToZonedTime(date, timezone);
    
    // 格式化为 YYYY-MM-DD HH:mm 格式
    return format(zonedDate, 'yyyy-MM-dd HH:mm');
  } catch (error) {
    console.error('时区转换错误:', error);
    // 如果时区转换失败，使用本地时间
    return format(date, 'yyyy-MM-dd HH:mm');
  }
}

/**
 * 格式化数字，添加千分位分隔符
 * @param num 要格式化的数字
 * @returns 格式化后的字符串
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('zh-CN').format(num);
}

/**
 * 解析带千分位分隔符的数字字符串
 * @param str 要解析的字符串
 * @returns 解析后的数字
 */
export function parseFormattedNumber(str: string): number {
  // 移除所有非数字和小数点的字符
  const cleanStr = str.replace(/[^\d.]/g, '');
  const num = parseFloat(cleanStr);
  return isNaN(num) ? 0 : num;
}

/**
 * 验证输入值
 * @param value 输入值
 * @param fieldName 字段名称
 * @returns 验证结果
 */
export function validateInput(value: number, fieldName: string): string | null {
  if (isNaN(value) || value < 0) {
    return `${fieldName}必须是非负数`;
  }
  
  if (fieldName === '每小时获取经验值' && value === 0) {
    return '每小时获取经验值不能为0';
  }
  
  return null;
}

/**
 * 格式化时长显示
 * @param days 天数
 * @param hours 小时数
 * @param minutes 分钟数
 * @returns 格式化的时长字符串
 */
export function formatDuration(days: number, hours: number, minutes: number): string {
  const parts: string[] = [];
  
  if (days > 0) {
    parts.push(`${days}天`);
  }
  
  if (hours > 0) {
    parts.push(`${hours}小时`);
  }
  
  if (minutes > 0) {
    parts.push(`${minutes}分钟`);
  }
  
  if (parts.length === 0) {
    return '不到1分钟';
  }
  
  return parts.join('');
}

/**
 * 获取当前时区的显示名称
 * @param timezone 时区标识符
 * @returns 时区显示名称
 */
export function getTimezoneDisplayName(timezone: string): string {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('zh-CN', {
      timeZone: timezone,
      timeZoneName: 'long'
    });
    
    const parts = formatter.formatToParts(now);
    const timeZonePart = parts.find(part => part.type === 'timeZoneName');
    
    return timeZonePart?.value || timezone;
  } catch (error) {
    return timezone;
  }
}