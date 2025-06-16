import { useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Calculator from './components/Calculator';
import ThemeToggle from './components/ThemeToggle';
import './styles/globals.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 从localStorage加载主题设置
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(shouldUseDark);
    
    // 应用主题到document
    if (shouldUseDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // 切换主题
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    // 保存到localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // 应用到document
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#3b82f6',
          borderRadius: 8,
          fontSize: 14,
        },
        components: {
          Card: {
            borderRadiusLG: 12,
          },
          Button: {
            borderRadius: 8,
          },
          Input: {
            borderRadius: 8,
          },
          Select: {
            borderRadius: 8,
          },
        },
      }}
    >
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        {/* 头部 */}
        <header className="relative z-10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🎮</div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    经验计算器
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    精确计算游戏升级时间
                  </p>
                </div>
              </div>
              
              <ThemeToggle 
                isDark={isDarkMode} 
                onToggle={toggleTheme}
                className="z-10"
              />
            </div>
          </div>
        </header>

        {/* 主要内容 */}
        <main className="container mx-auto px-4 pb-12">
          <Calculator />
        </main>

        {/* 页脚 */}
        <footer className="mt-12 py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 text-center">
            <div className="text-gray-600 dark:text-gray-400 mb-4">
              <p className="mb-2">
                🚀 现代化的游戏经验计算器，支持全球时区精确计算
              </p>
              <p className="text-sm">
                支持大数值经验计算 • 实时时区转换 • 响应式设计
              </p>
            </div>
            
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                在线服务
              </span>
              <span>•</span>
              <span>支持 {new Date().getFullYear()} 年最新时区数据</span>
              <span>•</span>
              <span>精确到分钟级别</span>
            </div>
            
            <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
              <p>© {new Date().getFullYear()} 经验计算器. 使用 React + TypeScript + Vite 构建</p>
            </div>
          </div>
        </footer>

        {/* 背景装饰 */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 ${
            isDarkMode ? 'bg-blue-500' : 'bg-blue-300'
          } blur-3xl animate-pulse`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 ${
            isDarkMode ? 'bg-purple-500' : 'bg-purple-300'
          } blur-3xl animate-pulse`} style={{ animationDelay: '2s' }}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 ${
            isDarkMode ? 'bg-indigo-500' : 'bg-indigo-300'
          } blur-3xl animate-pulse`} style={{ animationDelay: '4s' }}></div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;