const {bootstrap} = require('./server/server')

async function runApp() {
    const app = await bootstrap(3000, 'dbHost', 'soc-shop')
    // console.log(">>> app >>> ", app);
    return app; 
}

(async ()=> {
    await runApp();
})();

module.exports = { runApp }
