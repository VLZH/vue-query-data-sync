# Vue query data sync

If you in looking for some lib for your project. Do not use this code! Quality of this code is very low

## How to use

```javascript
// main.js
// register plugin
import DataQueryString from "./plugins/data_query_sync";
```

```javascript
// in component
module.exports = {
    data: {
        category__id: 0,
        service__id: 0
    },
    watch: {
        // Push data to querystring on change in some properties
        category__id () {
            this.$pushToQuery()
        },
        service__id () {
            this.$pushToQuery()
        }
    },
    mounted () {
        // get a data from query string on component mount
        this.$getFromQuery()
    }
}
```
