module.exports = {
  prepareHTML: function (data, sectionId, env, integrity = null) {
    const api_static_tag = integrity ?
      `<script src="https://${env.cdn}/api/${sectionId}/api_static.js" integrity="${integrity}" crossorigin="anonymous"></script>` :
      `<script type="text/javascript" src="https://${env.cdn}/api/${sectionId}/api_static.js"></script>`
    return data.replace('<dyconfiguration>', `
      <link rel="preconnect" href="//${env.cdn}">
      <link rel="preconnect" href="//${env.st}">
      <link rel="preconnect" href="//${env.rcom}">
      <script type="text/javascript">
        window.DY = window.DY || {};
        DY.recommendationContext = { type: 'HOMEPAGE' };
      </script>
      <script type="text/javascript" src="https://${env.cdn}/api/${sectionId}/api_dynamic.js"></script>
      ${api_static_tag}`
    );
  },
  getURLPerEnvironments: function (env) {
    const urls = {
      prod: { rcom: 'rcom.dynamicyield.com', st: 'st.dynamicyield.com', cdn: 'cdn.dynamicyield.com' },
      eu: { rcom: 'rcom-eu.dynamicyield.com', st: 'st-eu.dynamicyield.com', cdn: 'cdn-eu.dynamicyield.com' },
      dev: { rcom: 'rcom.dynamicyield.com', st: 'st.dynamicyield.com', cdn: `cdn-dev.dynamicyield.com/dev-use1-${env}` },
      'dydy.io': { rcom: 'rcom.dynamicyield.com', st: 'st.dynamicyield.com', cdn: 'cdn.use1.dev.pub.dydy.io/dev-use1-release' }
    };
    return (env && urls[env]) ? urls[env] : urls.prod;
  }
}