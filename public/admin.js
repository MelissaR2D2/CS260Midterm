var app = new Vue({
  el: '#admin',
  data: {
    items: [],
    name: "",
    price: null,
    path: ""
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

    async addItem() {
      try {
        let r2 = await axios.post('/api/items', {
          name: this.name,
          price: this.price,
          path: this.path
        });
        //this.addItem = r2.data;
        this.name = "";
        this.price = null;
        this.path = "";
        this.getItems();
      }
      catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        let response = axios.delete("/api/items/" + item._id);
        this.getItems();
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
  }
});
