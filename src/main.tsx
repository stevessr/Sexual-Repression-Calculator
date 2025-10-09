import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "@/styles/globals.css";

// 域名检测：如果当前域名为 sex-9wx.pages.dev，则重定向到 sex.aaca.eu.org
if (typeof window !== 'undefined') {
  try {
    const hostname = window.location.hostname;
    if (hostname === 'sex-9wx.pages.dev') {
      const target = 'https://sex.aaca.eu.org' + window.location.pathname + window.location.search + window.location.hash;
      // 使用 replace 避免在历史记录中增加一条记录
      window.location.replace(target);
    }
  } catch (e) {
    // ignore (安全沙箱或 SSR 环境)
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
