module.exports = {
   acl : {
      prefix: 'acl_',
      roles: [{
         roles: ["super-admin"],
         allows: [{
            resources: [
               "/shops",
               "/shops/:id"
            ],
            permissions: "*"
         }]
      }, {
         roles: ["shop-admin"],
         allows: [{
            resources: [
               "/shops/:id"
            ],
            permissions: ["get", "patch", "delete"]
         }]
      }, {
         roles: ["customer"], 
         allows: [{
            resources: [
               "/shops/:id/subscribe"
            ],
            permissions: ["post", "delete"]
         }]
      }], 
   }  
}