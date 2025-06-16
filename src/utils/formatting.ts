/**
 * 格式化工具函数集合
 */

/**
 * 格式化数字，添加千分位分隔符
 * @param value 数字值
 * @param decimals 小数位数，默认为0
 * @returns 格式化后的字符串
 */
export function formatNumber(value: number, decimals: number = 0): string {
  if (isNaN(value)) return '0';
  
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

/**
 * 解析格式化的数字字符串
 * @param str 格式化的数字字符串
 * @returns 解析后的数字
 */
export function parseNumber(str: string): number {
  if (!str || typeof str !== 'string') return 0;
  
  // 移除千分位分隔符和其他非数字字符（保留小数点和负号）
  const cleanStr = str.replace(/[^\d.-]/g, '');
  const num = parseFloat(cleanStr);
  
  return isNaN(num) ? 0 : num;
}

/**
 * 格式化经验值显示
 * @param exp 经验值
 * @returns 格式化的经验值字符串
 */
export function formatExperience(exp: number): string {
  if (exp >= 1000000000) {
    return `${formatNumber(exp / 1000000000, 2)}B`;
  } else if (exp >= 1000000) {
    return `${formatNumber(exp / 1000000, 2)}M`;
  } else if (exp >= 1000) {
    return `${formatNumber(exp / 1000, 1)}K`;
  }
  return formatNumber(exp);
}

/**
 * 格式化时间显示
 * @param date 日期对象或时间字符串
 * @returns 格式化的时间字符串
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '无效时间';
  }
  
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(dateObj);
}

/**
 * 格式化持续时间
 * @param totalHours 总小时数
 * @returns 格式化的持续时间字符串
 */
export function formatDuration(totalHours: number): string {
  if (totalHours < 0) return '0分钟';
  
  const days = Math.floor(totalHours / 24);
  const hours = Math.floor(totalHours % 24);
  const minutes = Math.floor((totalHours % 1) * 60);
  
  const parts: string[] = [];
  
  if (days > 0) {
    parts.push(`${days}天`);
  }
  
  if (hours > 0) {
    parts.push(`${hours}小时`);
  }
  
  if (minutes > 0 || parts.length === 0) {
    parts.push(`${minutes}分钟`);
  }
  
  return parts.join('');
}

/**
 * 格式化百分比
 * @param value 数值（0-1之间）
 * @param decimals 小数位数
 * @returns 格式化的百分比字符串
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${formatNumber(value * 100, decimals)}%`;
}

/**
 * 验证并格式化输入值
 * @param value 输入值
 * @param type 输入类型
 * @returns 验证结果和格式化值
 */
export function validateAndFormat(value: string, type: 'integer' | 'decimal' = 'integer'): {
  isValid: boolean;
  value: number;
  formatted: string;
  error?: string;
} {
  const numValue = parseNumber(value);
  
  if (isNaN(numValue)) {
    return {
      isValid: false,
      value: 0,
      formatted: '0',
      error: '请输入有效数字'
    };
  }
  
  if (numValue < 0) {
    return {
      isValid: false,
      value: 0,
      formatted: '0',
      error: '数值不能为负数'
    };
  }
  
  const decimals = type === 'decimal' ? 2 : 0;
  
  return {
    isValid: true,
    value: numValue,
    formatted: formatNumber(numValue, decimals)
  };
}

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns 是否复制成功
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    }
  } catch (error) {
    console.error('复制到剪贴板失败:', error);
    return false;
  }
}

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param limit 时间限制（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}