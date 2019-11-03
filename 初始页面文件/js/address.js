new Vue({
    el: '.container',
    data: {
        addressList: [],
        moreAddress: false,
        currentId: 0,
        shoppingModel: 1
    },
    computed: {
        limitAddressList: function() {
            return this.addressList.slice(0, 3);
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            this.getaddress();
        })
    },
    methods: {
        getaddress: function() {
            this.$http.get('data/address.json').then(res => {
                let response = res.data;
                if (res.status == 200) {
                    this.addressList = response.result;
                }
            })
        },
        setDefault: function(address) {
            this.addressList.forEach(item => {
                if (item.addressId === address) {
                    item.isDefault = true;
                } else {
                    item.isDefault = false;
                }
            });
        }
    }
})