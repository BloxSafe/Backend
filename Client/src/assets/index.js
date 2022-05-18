function setThemeColor(color) {
  localStorage.color = color;
  window.location.reload();
}

routes = {
  "/": {
    component: "WelcomeComponent",
  },
  "/dashboard": {
    component: "HomeComponent",
  },
  "/auth": {
    component: "AuthComponent",
  },
  "/apis": {
    component: "APIsComponent",
  },
  "/docs": {
    component: "DocsComponent",
  },
  "/tools": {
    component: "ToolsComponent",
  },
  "/manage-script": {
    component: "ManageComponent",
  },
};
path = window.location.pathname ? window.location.pathname : "/";
console.log(path);
routes[path]
  ? (document.getElementById(routes[path].component).style.display = "")
  : "";

Markdown = new TailDown({
  a: {
    customClass: `text-${localStorage.color}`,
  },
  p: {
    customClass: "text-gray-300",
  },
  h1: {
    customClass: "text-gray-300",
  },
});
document.getElementById("docs").innerHTML = Markdown.parse(`
## **[Blox]()Safe**
Welcome to the [documentation](/docs), here you will learn to use the panel.


#### **Dashboard**
<small>On the [dashboard](/dashboard) page you can view your stats and scripts. To edit a script click on the "manage" button, this will
take you to the script edit page, from their you can change the code, change name, get link and configure script
settings.</small>


#### **APIs**
<small>You can use the APIs to manage your data programatically. You can generate API keys from the "[APIs](/apsi)" page.</small>


#### **Tools**
<small>[Blox]()Safe offers tools like [obfuscator](/tools/obfuscator), [Script hub](/tools/hub), [Discord webhook](/tools/webhook) and more. The obfuscation tool is to make your code unreadable to prevent stealing. The script hub tool creates a roblox script hub with your scripts, the script hub code is auto generated by BloxSafe. You can also connect your discord wehbook to receive important information.</small>
`);
