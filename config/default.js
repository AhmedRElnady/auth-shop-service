module.exports = {
   _acl: {
      roles: {
         SUPER_ADMIN: {
            resources: [
               "/",
               "/:id"
            ],
            permissions: ["get"]
         },
         SHOP_ADMIN: {
            resources: [
               "/:id"
            ],
            permissions: ["get", "patch", "delete"]
         },
         CUSTOMER: {
            resources: [
               "/:id/subscribe"
            ],
            permissions: ["post", "delete"]
         }
      }
   },
   shop_admin_privileges: {
      read: "get",
      edit: "patch",
      delete: "delete"
   },
   MS: {
      shop: {
         url: "http://localhost:4000",
         prefix: "shops"
      },
      shop_admin: {
         url: "http://localhost:5000",
         prefix: "shop-admins"
      },
      customer: {
         url: "http://localhost:6000",
         prefix: "customers"
      }
   },

}