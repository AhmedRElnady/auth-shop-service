const config = require('config');
const apiAdapter = require('../../config/api-adapter/api-adapter');

// to make a request to shop_admin service to get his privileges (read, edit, delete)
const shopAdminURL = config.get('MS.shop_admin.url'),
    shopAdminPrefix = config.get('MS.shop_admin.prefix');

function _authorize() {
    return (req, res, next) => {
        (async () => {
            const tokenPayload = JSON.parse(req.headers['x-payload-header']),
                userRole = tokenPayload.role,
                GWUserID = tokenPayload.id,
                reqResource = req.route.path,
                reqMethod = req.method.toLowerCase(),
                roles = config.get('_acl.roles');

            for (let role in roles) {

                if (role === userRole) {
                    const roleObj = roles[role],
                        allowedResources = roleObj.resources;
                    let allowedPermissions = roleObj.permissions;


                    // todo: move it to a seperate function 
                    if (userRole === 'SHOP_ADMIN') {
                        // if admin not approved or don't have shopId or he is not the owner of this shop, just fire him.
                        const approved = tokenPayload.approved,
                            adminShopId = tokenPayload.shopId,
                            requestedShopId = req.params && req.params.id;


                        if (!approved || !adminShopId || (requestedShopId !== adminShopId))
                            return res.json({ msg: "Insufficient permissions to access resource" })


                        // check his privileges
                        let _apiAdapter = apiAdapter(shopAdminURL);
                        const shopAdminDetails = await _apiAdapter.get(`/${shopAdminPrefix}/${GWUserID}`)

                        const privileges = shopAdminDetails.data.permissions;
                        allowedPermissions = [];
                        for (let pri in privileges) {
                            if (privileges[pri])
                                allowedPermissions.push(config.get(`shop_admin_privileges.${pri}`));
                        };
                    }


                    if (allowedResources.includes(reqResource) && allowedPermissions.includes(reqMethod)) {
                        next();
                    } else {
                        res.res.json({ msg: "Insufficient permissions to access resource" }) // 403
                    }

                    break;
                }
            }
        })()
    }
};

module.exports = _authorize;