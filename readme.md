# Vue query data sync

### WARNING !
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
        some_another_property: 0,
        category__id: 0,
        service__id: 0,
        // white list
        _syncInclude: ["order_by", "categories__id"]
        // black list
        // _syncExclude: ["some_another_property"]
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
