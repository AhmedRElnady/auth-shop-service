const {bootstrap} = require('./server/server')

async function runApp() {
    const app = await bootstrap(4000, 'dbHost', 'soc-shops')
    return app; 
}

(async ()=> {
    await runApp();
})();

module.exports = { runApp }
