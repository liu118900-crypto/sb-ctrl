// ==UserScript==
// @name         报价列表 - 展开完整数据（自定义分页版 - 模拟点击）+ 物流成本模板全量导出
// @namespace    http://tampermonkey.net/
// @version       25.77
// @updateURL     https://cdn.jsdelivr.net/gh/liu118900-crypto/sb-ctrl/sb-plugin.meta.js
// @downloadURL   https://cdn.jsdelivr.net/gh/liu118900-crypto/sb-ctrl/sb-plugin.user.js
//   ↑ v25.77：Tampermonkey 会定期拉 @updateURL 里的元数据块比对 @version，
//     发现远端更高就提示（或按你的设置自动）升级到 @downloadURL。
//     两个地址都不带 @ref —— 分支别名 @main 有 12 小时强缓存，见 KILL40.urls 的注释。
//     ⚠️ 精简版生成器会剥掉这两行：否则精简版会被"更新"成主脚本。
// @description  报价列表：隐藏原分页器，自定义分页器模拟点击原页码实现无刷新分页，行内复制单行按钮置于修改/克隆下方居中；全量抓取当前筛选条件下所有报价并导出CSV（断点续传/暂停/部分下载）；Excel批量匹配：上传国家+计款码清单，逐对抓取全部报价方案并汇总成表。新增：物流管理-成本模板页（#/shipping/costStatement）一键导出全部物流成本模板CSV（字段自动识别+中文表头，支持断点续传/暂停/部分下载）。新增：毛利率模拟——输入计款码并可选指定国家，自动抓取全部报价方案，通过物流方式接口将报价规则名解析为方式ID，按「国家+物流方式+模拟计费重量区间」精确抓取最新成本模板，模拟每个国家的最新包裹毛利率；支持云途全球专线挂号（标快普货）等无区间后缀的规则名
// @match        https://web.shipbear.co/*
// @grant        GM_xmlhttpRequest
// @grant        GM_cookie
// @grant        GM_info
//   ↑ v25.75：只用来读自身 @version，判断「作者主脚本（25.75）」还是「精简版（25.75-lite）」，
//     据此决定是否豁免远程停用。不读取任何页面/用户信息。
//   ↑ v24.78：云途实际运费补齐要用它把登录 token 写进 .yunexpress.cn 的 Cookie
//     （云途接口只认 Cookie，不认请求头 token）。Tampermonkey 支持；
//     若你的管理器不支持，脚本会自动降级为「显式带 Cookie 头」，无需干预。
// @connect      www.dianxiaomi.com
// @connect      www.kdocs.cn
// @connect      *
//   ↑ v24.68：账单「在线来源」允许填任意直链（CSV/xlsx，如 Google 表格「发布到网络」的 CSV、云盘直链）。
//     更新脚本时 Tampermonkey 会提示新增权限，点「允许」即可；只抓你填的那个链接，不会访问别的站点。
// @run-at       document-start
// ==/UserScript==
