export interface TimezoneOption {
  value: string;
  label: string;
  group: string;
  utcOffset: string;
}

export const timezoneGroups = {
  asia: '亚洲时区',
  europe: '欧洲时区',
  northAmerica: '北美时区',
  southAmerica: '南美时区',
  oceania: '大洋洲时区',
  africa: '非洲时区',
};

export const timezoneOptions: TimezoneOption[] = [
  // 亚洲时区
  { value: 'Asia/Shanghai', label: '中国标准时间 (北京)', group: 'asia', utcOffset: 'UTC+8' },
  { value: 'Asia/Tokyo', label: '日本标准时间 (东京)', group: 'asia', utcOffset: 'UTC+9' },
  { value: 'Asia/Seoul', label: '韩国标准时间 (首尔)', group: 'asia', utcOffset: 'UTC+9' },
  { value: 'Asia/Hong_Kong', label: '香港时间', group: 'asia', utcOffset: 'UTC+8' },
  { value: 'Asia/Taipei', label: '台北时间', group: 'asia', utcOffset: 'UTC+8' },
  { value: 'Asia/Singapore', label: '新加坡时间', group: 'asia', utcOffset: 'UTC+8' },
  { value: 'Asia/Bangkok', label: '泰国时间 (曼谷)', group: 'asia', utcOffset: 'UTC+7' },
  { value: 'Asia/Jakarta', label: '印尼西部时间 (雅加达)', group: 'asia', utcOffset: 'UTC+7' },
  { value: 'Asia/Manila', label: '菲律宾时间 (马尼拉)', group: 'asia', utcOffset: 'UTC+8' },
  { value: 'Asia/Kuala_Lumpur', label: '马来西亚时间 (吉隆坡)', group: 'asia', utcOffset: 'UTC+8' },
  { value: 'Asia/Ho_Chi_Minh', label: '越南时间 (胡志明市)', group: 'asia', utcOffset: 'UTC+7' },
  { value: 'Asia/Kolkata', label: '印度标准时间 (加尔各答)', group: 'asia', utcOffset: 'UTC+5:30' },
  { value: 'Asia/Karachi', label: '巴基斯坦时间 (卡拉奇)', group: 'asia', utcOffset: 'UTC+5' },
  { value: 'Asia/Dubai', label: '阿联酋时间 (迪拜)', group: 'asia', utcOffset: 'UTC+4' },
  { value: 'Asia/Tehran', label: '伊朗时间 (德黑兰)', group: 'asia', utcOffset: 'UTC+3:30' },
  { value: 'Asia/Riyadh', label: '沙特阿拉伯时间 (利雅得)', group: 'asia', utcOffset: 'UTC+3' },
  { value: 'Asia/Jerusalem', label: '以色列时间 (耶路撒冷)', group: 'asia', utcOffset: 'UTC+2' },

  // 欧洲时区
  { value: 'Europe/London', label: '格林威治标准时间 (伦敦)', group: 'europe', utcOffset: 'UTC+0/+1' },
  { value: 'Europe/Paris', label: '中欧时间 (巴黎)', group: 'europe', utcOffset: 'UTC+1/+2' },
  { value: 'Europe/Berlin', label: '中欧时间 (柏林)', group: 'europe', utcOffset: 'UTC+1/+2' },
  { value: 'Europe/Rome', label: '中欧时间 (罗马)', group: 'europe', utcOffset: 'UTC+1/+2' },
  { value: 'Europe/Madrid', label: '中欧时间 (马德里)', group: 'europe', utcOffset: 'UTC+1/+2' },
  { value: 'Europe/Amsterdam', label: '中欧时间 (阿姆斯特丹)', group: 'europe', utcOffset: 'UTC+1/+2' },
  { value: 'Europe/Brussels', label: '中欧时间 (布鲁塞尔)', group: 'europe', utcOffset: 'UTC+1/+2' },
  { value: 'Europe/Vienna', label: '中欧时间 (维也纳)', group: 'europe', utcOffset: 'UTC+1/+2' },
  { value: 'Europe/Zurich', label: '中欧时间 (苏黎世)', group: 'europe', utcOffset: 'UTC+1/+2' },
  { value: 'Europe/Stockholm', label: '中欧时间 (斯德哥尔摩)', group: 'europe', utcOffset: 'UTC+1/+2' },
  { value: 'Europe/Oslo', label: '中欧时间 (奥斯陆)', group: 'europe', utcOffset: 'UTC+1/+2' },
  { value: 'Europe/Copenhagen', label: '中欧时间 (哥本哈根)', group: 'europe', utcOffset: 'UTC+1/+2' },
  { value: 'Europe/Helsinki', label: '东欧时间 (赫尔辛基)', group: 'europe', utcOffset: 'UTC+2/+3' },
  { value: 'Europe/Warsaw', label: '中欧时间 (华沙)', group: 'europe', utcOffset: 'UTC+1/+2' },
  { value: 'Europe/Prague', label: '中欧时间 (布拉格)', group: 'europe', utcOffset: 'UTC+1/+2' },
  { value: 'Europe/Budapest', label: '中欧时间 (布达佩斯)', group: 'europe', utcOffset: 'UTC+1/+2' },
  { value: 'Europe/Athens', label: '东欧时间 (雅典)', group: 'europe', utcOffset: 'UTC+2/+3' },
  { value: 'Europe/Istanbul', label: '土耳其时间 (伊斯坦布尔)', group: 'europe', utcOffset: 'UTC+3' },
  { value: 'Europe/Moscow', label: '莫斯科时间', group: 'europe', utcOffset: 'UTC+3' },

  // 北美时区
  { value: 'America/New_York', label: '美国东部时间 (纽约)', group: 'northAmerica', utcOffset: 'UTC-5/-4' },
  { value: 'America/Chicago', label: '美国中部时间 (芝加哥)', group: 'northAmerica', utcOffset: 'UTC-6/-5' },
  { value: 'America/Denver', label: '美国山地时间 (丹佛)', group: 'northAmerica', utcOffset: 'UTC-7/-6' },
  { value: 'America/Los_Angeles', label: '美国太平洋时间 (洛杉矶)', group: 'northAmerica', utcOffset: 'UTC-8/-7' },
  { value: 'America/Anchorage', label: '阿拉斯加时间 (安克雷奇)', group: 'northAmerica', utcOffset: 'UTC-9/-8' },
  { value: 'Pacific/Honolulu', label: '夏威夷时间 (檀香山)', group: 'northAmerica', utcOffset: 'UTC-10' },
  { value: 'America/Toronto', label: '加拿大东部时间 (多伦多)', group: 'northAmerica', utcOffset: 'UTC-5/-4' },
  { value: 'America/Vancouver', label: '加拿大太平洋时间 (温哥华)', group: 'northAmerica', utcOffset: 'UTC-8/-7' },
  { value: 'America/Montreal', label: '加拿大东部时间 (蒙特利尔)', group: 'northAmerica', utcOffset: 'UTC-5/-4' },
  { value: 'America/Mexico_City', label: '墨西哥中部时间 (墨西哥城)', group: 'northAmerica', utcOffset: 'UTC-6/-5' },

  // 南美时区
  { value: 'America/Sao_Paulo', label: '巴西时间 (圣保罗)', group: 'southAmerica', utcOffset: 'UTC-3/-2' },
  { value: 'America/Argentina/Buenos_Aires', label: '阿根廷时间 (布宜诺斯艾利斯)', group: 'southAmerica', utcOffset: 'UTC-3' },
  { value: 'America/Santiago', label: '智利时间 (圣地亚哥)', group: 'southAmerica', utcOffset: 'UTC-4/-3' },
  { value: 'America/Lima', label: '秘鲁时间 (利马)', group: 'southAmerica', utcOffset: 'UTC-5' },
  { value: 'America/Bogota', label: '哥伦比亚时间 (波哥大)', group: 'southAmerica', utcOffset: 'UTC-5' },
  { value: 'America/Caracas', label: '委内瑞拉时间 (加拉加斯)', group: 'southAmerica', utcOffset: 'UTC-4' },

  // 大洋洲时区
  { value: 'Australia/Sydney', label: '澳大利亚东部时间 (悉尼)', group: 'oceania', utcOffset: 'UTC+10/+11' },
  { value: 'Australia/Melbourne', label: '澳大利亚东部时间 (墨尔本)', group: 'oceania', utcOffset: 'UTC+10/+11' },
  { value: 'Australia/Brisbane', label: '澳大利亚东部标准时间 (布里斯班)', group: 'oceania', utcOffset: 'UTC+10' },
  { value: 'Australia/Perth', label: '澳大利亚西部时间 (珀斯)', group: 'oceania', utcOffset: 'UTC+8' },
  { value: 'Australia/Adelaide', label: '澳大利亚中部时间 (阿德莱德)', group: 'oceania', utcOffset: 'UTC+9:30/+10:30' },
  { value: 'Pacific/Auckland', label: '新西兰时间 (奥克兰)', group: 'oceania', utcOffset: 'UTC+12/+13' },
  { value: 'Pacific/Fiji', label: '斐济时间', group: 'oceania', utcOffset: 'UTC+12/+13' },

  // 非洲时区
  { value: 'Africa/Cairo', label: '埃及时间 (开罗)', group: 'africa', utcOffset: 'UTC+2' },
  { value: 'Africa/Johannesburg', label: '南非时间 (约翰内斯堡)', group: 'africa', utcOffset: 'UTC+2' },
  { value: 'Africa/Lagos', label: '西非时间 (拉各斯)', group: 'africa', utcOffset: 'UTC+1' },
  { value: 'Africa/Nairobi', label: '东非时间 (内罗毕)', group: 'africa', utcOffset: 'UTC+3' },
  { value: 'Africa/Casablanca', label: '摩洛哥时间 (卡萨布兰卡)', group: 'africa', utcOffset: 'UTC+0/+1' },
];

export const getTimezonesByGroup = () => {
  const grouped: Record<string, TimezoneOption[]> = {};
  
  timezoneOptions.forEach(timezone => {
    if (!grouped[timezone.group]) {
      grouped[timezone.group] = [];
    }
    grouped[timezone.group].push(timezone);
  });
  
  return grouped;
};

export const findTimezoneByValue = (value: string): TimezoneOption | undefined => {
  return timezoneOptions.find(tz => tz.value === value);
};