var app = new Vue({
  el: '#app',
  data: {
    items: [],
    cart: [],
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    async purchase() {
      this.cart = [];
      for (let item of this.items) {
        if (item.selected) {
          try {
            let response = await axios.put("/api/items/" + item._id)
            this.getItems();
            this.cart.push(item);
          }
          catch (error) {
            console.log(error);
          }
        }
      }
    }
  },
  created() {
    this.getItems();
  },
  computed: {
    sortedItems: function() {
      function compare(a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }

      return this.items.sort(compare);
    },
    sortedCart: function() {
      function compare(a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }

      return this.cart.sort(compare);
    }
  }

});
