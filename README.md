# 🎮 经验计算器

一个现代化的纯前端游戏经验计算器Web应用，专为游戏玩家设计，用于精确计算升级所需时间。支持全球时区，响应式设计，可一键部署到各大静态托管平台。

## ✨ 功能特性

- 🎯 **精确计算**: 支持大数值经验计算，精确到分钟级别
- 🌍 **全球时区**: 支持全球70+个主要时区，自动处理夏令时
- 📱 **响应式设计**: 完美适配手机、平板、桌面端
- 🌙 **深色模式**: 支持浅色/深色主题切换
- 💾 **数据持久化**: 自动保存输入历史和偏好设置
- 📋 **一键复制**: 支持计算结果一键复制到剪贴板
- ⚡ **快速部署**: 支持GitHub Pages、Vercel、腾讯云EdgeOne等平台

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 yarn

### 本地开发

```bash
# 克隆项目
git clone <repository-url>
cd EmpiricalCalculation

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI组件库**: Ant Design
- **样式框架**: Tailwind CSS
- **时区处理**: date-fns + date-fns-tz
- **图标**: Ant Design Icons + Lucide React

## 📦 项目结构

```
EmpiricalCalculation/
├── public/                 # 静态资源
├── src/
│   ├── components/         # React组件
│   │   ├── Calculator.tsx  # 主计算器组件
│   │   ├── TimeZoneSelector.tsx # 时区选择器
│   │   ├── ResultDisplay.tsx    # 结果显示组件
│   │   └── ThemeToggle.tsx      # 主题切换组件
│   ├── utils/              # 工具函数
│   │   ├── timeCalculation.ts   # 时间计算逻辑
│   │   ├── timezoneData.ts      # 时区数据
│   │   └── formatting.ts        # 格式化工具
│   ├── styles/             # 样式文件
│   │   └── globals.css     # 全局样式
│   ├── App.tsx             # 主应用组件
│   └── main.tsx            # 应用入口
├── .github/workflows/      # GitHub Actions配置
├── package.json            # 项目配置
├── vite.config.ts          # Vite配置
├── tailwind.config.js      # Tailwind配置
└── README.md               # 项目说明
```

## 🌍 支持的时区

### 亚洲时区
- 中国标准时间 (UTC+8) - 默认
- 日本标准时间 (UTC+9)
- 韩国标准时间 (UTC+9)
- 香港时间 (UTC+8)
- 台北时间 (UTC+8)
- 新加坡时间 (UTC+8)
- 泰国时间 (UTC+7)
- 印度标准时间 (UTC+5:30)
- 以及更多...

### 欧洲时区
- 格林威治标准时间 (UTC+0/+1)
- 中欧时间 (UTC+1/+2)
- 东欧时间 (UTC+2/+3)
- 莫斯科时间 (UTC+3)
- 以及更多...

### 美洲时区
- 美国东部时间 (UTC-5/-4)
- 美国中部时间 (UTC-6/-5)
- 美国太平洋时间 (UTC-8/-7)
- 巴西时间 (UTC-3/-2)
- 以及更多...

### 大洋洲时区
- 澳大利亚东部时间 (UTC+10/+11)
- 新西兰时间 (UTC+12/+13)
- 以及更多...

## 🚀 部署指南

### GitHub Pages

1. 推送代码到GitHub仓库
2. 启用GitHub Pages
3. GitHub Actions会自动构建和部署

### Vercel

```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

### 腾讯云EdgeOne

1. 构建项目: `npm run build`
2. 将`dist`目录上传到EdgeOne
3. 配置域名和SSL证书

## 🧮 计算逻辑

```typescript
// 核心计算公式
function calculateUpgradeTime(input) {
  // 1. 计算剩余经验值
  const remainingExp = requiredExp - currentExp;
  
  // 2. 计算所需小时数
  const hoursNeeded = remainingExp / expPerHour;
  
  // 3. 计算完成时间点
  const completionTime = new Date(Date.now() + hoursNeeded * 3600000);
  
  // 4. 转换到用户选择的时区
  const zonedTime = utcToZonedTime(completionTime, selectedTimezone);
  
  return formatResult(zonedTime, hoursNeeded, remainingExp);
}
```

## 🎨 界面预览

- **浅色模式**: 清新的蓝色渐变背景，现代化卡片设计
- **深色模式**: 优雅的深色主题，护眼舒适
- **响应式布局**: 自适应各种屏幕尺寸
- **动画效果**: 流畅的过渡动画和交互反馈

## 📝 使用说明

1. **输入升级所需经验值**: 输入目标等级需要的总经验值
2. **输入现有经验值**: 输入当前已有的经验值
3. **输入每小时获取经验值**: 输入平均每小时能获得的经验值
4. **选择时区**: 从下拉菜单中选择您所在的时区
5. **点击计算**: 获得精确的升级完成时间

## 🔧 自定义配置

### 修改默认时区

在 `src/utils/timezoneData.ts` 中修改默认时区:

```typescript
// 将默认时区改为其他时区
const defaultTimezone = 'Asia/Tokyo'; // 改为东京时间
```

### 添加新时区

在 `timezoneOptions` 数组中添加新的时区选项:

```typescript
{
  value: 'Asia/Kolkata',
  label: '印度标准时间 (新德里)',
  group: 'asia',
  utcOffset: 'UTC+5:30'
}
```

### 自定义主题色彩

在 `tailwind.config.js` 中修改主题色彩:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color', // 修改主色调
      }
    }
  }
}
```

## 🧪 测试

```bash
# 运行ESLint检查
npm run lint

# 类型检查
npx tsc --noEmit
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [React](https://reactjs.org/) - 用户界面库
- [Ant Design](https://ant.design/) - 企业级UI设计语言
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [date-fns](https://date-fns.org/) - 现代JavaScript日期工具库

## 📞 联系方式

如有问题或建议，请通过以下方式联系:

- 提交 [Issue](../../issues)
- 发起 [Discussion](../../discussions)

---

⭐ 如果这个项目对您有帮助，请给它一个星标！
