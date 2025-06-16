import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Button, Form, message } from 'antd';
import {
  CalculatorOutlined,
  TrophyOutlined,
  RiseOutlined,
  ThunderboltOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import TimeZoneSelector from './TimeZoneSelector';
import ResultDisplay from './ResultDisplay';
import { calculateUpgradeTime, type CalculationInput, type CalculationResult } from '../utils/timeCalculation';
import { formatNumber, parseNumber, validateAndFormat, debounce } from '../utils/formatting';

interface FormData {
  requiredExp: string;
  currentExp: string;
  expPerHour: string;
  timezone: string;
}

const Calculator: React.FC = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<FormData>({
    requiredExp: '',
    currentExp: '',
    expPerHour: '',
    timezone: 'Asia/Shanghai'
  });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 从localStorage加载保存的数据
  useEffect(() => {
    const savedData = localStorage.getItem('calculatorData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        form.setFieldsValue(parsed);
      } catch (error) {
        console.error('加载保存的数据失败:', error);
      }
    }
  }, [form]);

  // 保存数据到localStorage
  const saveToLocalStorage = useCallback(
    debounce((data: FormData) => {
      localStorage.setItem('calculatorData', JSON.stringify(data));
    }, 1000),
    []
  );

  // 验证单个字段
  const validateField = (name: string, value: string): string | null => {
    const validation = validateAndFormat(value, name === 'expPerHour' ? 'decimal' : 'integer');
    
    if (!validation.isValid) {
      return validation.error || '输入无效';
    }

    // 额外验证
    if (name === 'expPerHour' && validation.value === 0) {
      return '每小时获取经验值不能为0';
    }

    if (name === 'currentExp' || name === 'requiredExp') {
      const currentExpValue = parseNumber(name === 'currentExp' ? value : formData.currentExp);
      const requiredExpValue = parseNumber(name === 'requiredExp' ? value : formData.requiredExp);
      if (currentExpValue >= requiredExpValue && currentExpValue > 0 && requiredExpValue > 0) {
        return '当前经验不能大于或等于升级所需经验';
      }
    }

    return null;
  };

  // 处理输入变化
  const handleInputChange = (name: keyof FormData, value: string) => {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    saveToLocalStorage(newFormData);

    // 验证当前字段
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }));

    // 如果是经验值字段，需要交叉验证
    if (name === 'currentExp' || name === 'requiredExp') {
      const currentExpValue = parseNumber(name === 'currentExp' ? value : formData.currentExp);
      const requiredExpValue = parseNumber(name === 'requiredExp' ? value : formData.requiredExp);
      
      if (currentExpValue > 0 && requiredExpValue > 0 && currentExpValue >= requiredExpValue) {
        setErrors(prev => ({
          ...prev,
          currentExp: '当前经验不能大于或等于升级所需经验'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          currentExp: prev.currentExp === '当前经验不能大于或等于升级所需经验' ? '' : prev.currentExp
        }));
      }
    }
  };

  // 格式化输入框显示
  const formatInputValue = (value: string, type: 'integer' | 'decimal' = 'integer') => {
    if (!value) return '';
    const numValue = parseNumber(value);
    if (isNaN(numValue)) return value;
    return formatNumber(numValue, type === 'decimal' ? 2 : 0);
  };

  // 执行计算
  const handleCalculate = async () => {
    // 验证所有字段
    const newErrors: Record<string, string> = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'timezone') {
        const error = validateField(key, value);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    // 检查必填字段
    if (!formData.requiredExp) newErrors.requiredExp = '请输入升级所需经验值';
    if (!formData.currentExp) newErrors.currentExp = '请输入现有经验值';
    if (!formData.expPerHour) newErrors.expPerHour = '请输入每小时获取经验值';

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      message.error('请检查输入数据');
      return;
    }

    setLoading(true);
    
    try {
      // 模拟计算延迟，提供更好的用户体验
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const input: CalculationInput = {
        requiredExp: parseNumber(formData.requiredExp),
        currentExp: parseNumber(formData.currentExp),
        expPerHour: parseNumber(formData.expPerHour),
        selectedTimezone: formData.timezone
      };

      const calculationResult = calculateUpgradeTime(input);
      setResult(calculationResult);

      if (calculationResult.error) {
        message.error(calculationResult.error);
      } else {
        message.success('计算完成！');
      }
    } catch (error) {
      console.error('计算错误:', error);
      message.error('计算过程中发生错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 重置表单
  const handleReset = () => {
    const resetData: FormData = {
      requiredExp: '',
      currentExp: '',
      expPerHour: '',
      timezone: 'Asia/Shanghai'
    };
    
    setFormData(resetData);
    setResult(null);
    setErrors({});
    form.setFieldsValue(resetData);
    localStorage.removeItem('calculatorData');
    message.success('表单已重置');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-0">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            🎮 经验计算器
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            精确计算游戏升级所需时间，支持全球时区
          </div>
        </div>

        <Form form={form} layout="vertical" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 升级所需经验值 */}
            <Form.Item
              label={
                <span className="flex items-center text-gray-700 dark:text-gray-300">
                  <TrophyOutlined className="mr-2 text-yellow-500" />
                  升级所需经验值
                </span>
              }
              validateStatus={errors.requiredExp ? 'error' : ''}
              help={errors.requiredExp}
            >
              <Input
                size="large"
                placeholder="请输入升级所需的总经验值"
                value={formData.requiredExp}
                onChange={(e) => handleInputChange('requiredExp', e.target.value)}
                onBlur={(e) => {
                  const formatted = formatInputValue(e.target.value);
                  handleInputChange('requiredExp', formatted);
                }}
                prefix={<TrophyOutlined className="text-gray-400" />}
              />
            </Form.Item>

            {/* 现有经验值 */}
            <Form.Item
              label={
                <span className="flex items-center text-gray-700 dark:text-gray-300">
                  <RiseOutlined className="mr-2 text-blue-500" />
                  现有经验值
                </span>
              }
              validateStatus={errors.currentExp ? 'error' : ''}
              help={errors.currentExp}
            >
              <Input
                size="large"
                placeholder="请输入当前已有的经验值"
                value={formData.currentExp}
                onChange={(e) => handleInputChange('currentExp', e.target.value)}
                onBlur={(e) => {
                  const formatted = formatInputValue(e.target.value);
                  handleInputChange('currentExp', formatted);
                }}
                prefix={<RiseOutlined className="text-gray-400" />}
              />
            </Form.Item>

            {/* 每小时获取经验值 */}
            <Form.Item
              label={
                <span className="flex items-center text-gray-700 dark:text-gray-300">
                  <ThunderboltOutlined className="mr-2 text-green-500" />
                  每小时获取经验值
                </span>
              }
              validateStatus={errors.expPerHour ? 'error' : ''}
              help={errors.expPerHour}
            >
              <Input
                size="large"
                placeholder="请输入每小时能获取的经验值"
                value={formData.expPerHour}
                onChange={(e) => handleInputChange('expPerHour', e.target.value)}
                onBlur={(e) => {
                  const formatted = formatInputValue(e.target.value, 'decimal');
                  handleInputChange('expPerHour', formatted);
                }}
                prefix={<ThunderboltOutlined className="text-gray-400" />}
              />
            </Form.Item>

            {/* 时区选择 */}
            <Form.Item>
              <TimeZoneSelector
                value={formData.timezone}
                onChange={(value) => handleInputChange('timezone', value)}
              />
            </Form.Item>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-center space-x-4 pt-6">
            <Button
              type="primary"
              size="large"
              icon={<CalculatorOutlined />}
              onClick={handleCalculate}
              loading={loading}
              className="px-8 h-12 text-lg font-medium"
            >
              开始计算
            </Button>
            
            <Button
              size="large"
              icon={<ReloadOutlined />}
              onClick={handleReset}
              className="px-8 h-12"
            >
              重置
            </Button>
          </div>
        </Form>
      </Card>

      {/* 结果显示 */}
      <ResultDisplay result={result} loading={loading} />
    </div>
  );
};

export default Calculator;