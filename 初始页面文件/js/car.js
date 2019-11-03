var vm = new Vue({
    el: '#app',
    data: {
        productList: [],
        totalMoney: 0,
        formatMoney: '',
        selectedAll: false,
        delFlag: false,
        currentItem: {}
    },
    filters: {
        // 对单个商品的金额进行过滤
        formatMoney: function(value) {
            return '￥' + value.toFixed(2);
        }
    },
    mounted: function() {
        this.cardView();
    },
    computed: {
        totalPrice: function() {
            let totalCount = 0;
            this.productList.forEach(item => {
                if (item.isChecked) {
                    totalCount += item.productPrice * item.productQuantity;
                }
            })
            return totalCount;
        }
    },
    methods: {
        // 获取后台数据
        cardView: function() {
            let _this = this;
            this.$http.get('./data/cartData.json', { 'id': 123 }).then(function(res) {
                _this.productList = res.data.result.list;
                _this.totalMoney = res.data.result.totalMoney;
            });
        },
        // 添加是否选择的功能 用this.$set()向响应对象添加一个属性来判断是否被选中
        selectedItem: function(item) {
            if (typeof item.isChecked === 'undefined') {
                this.$set(item, 'isChecked', true);
            } else {
                item.isChecked = !item.isChecked;
            }
        },
        // 实现全选的功能
        checkAll: function(status) {
            //  根据传入的参数来判断是否全选还是取消全选
            this.selectedAll = status;
            this.productList.forEach(item => {
                //检查每个项目是否有isChecked这个属性来创建
                if (typeof item.isChecked == 'undefined') {
                    this.$set(item, 'isChecked', this.selectedAll)
                } else {
                    //否则取反
                    item.isChecked = this.selectedAll;
                }
            })
        },
        delConfirm: function(item) {
            this.delFlag = true;
            //保存当前的对象
            this.currentItem = item;
        },
        //删除点击的对象
        deletedItem: function() {
            let index = this.productList.indexOf(this.item);
            this.productList.splice(index, 1);
            this.delFlag = false;
        }
    }
})
Vue.filter('money', function(value) {
    return value.toFixed(2) + ' 元';
})