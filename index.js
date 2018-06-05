import isString from "lodash/isString";
import isNumber from "lodash/isNumber";
import isBoolean from "lodash/isBoolean";
import isArray from "lodash/isArray";
import toNumber from "lodash/toNumber";

const isCoolVal = val =>
    isString(val) || isNumber(val) || isBoolean(val) || isArray(val);

const toCoolVal = val => {
    if (isArray(val)) return val.map(toCoolVal);
    let nval = toNumber(val);
    if (nval) return nval;
    return val;
};

export default {
    install(Vue, options) {
        Vue.prototype.$pushToQuery = function() {
            if (typeof this.$router === "undefined") {
                console.error(
                    "vue-router is required for 'vue-query-data-sync'"
                );
                return;
            }
            const clear_value = {};
            for (let key in this.$data) {
                const value = this.$data[key];
                if (isCoolVal(value)) {
                    clear_value[key] = value;
                }
            }
            this.$router.push({ query: clear_value });
        };
        Vue.prototype.$getFromQuery = function() {
            if (typeof this.$route === "undefined") {
                console.error(
                    "vue-router is required for 'vue-query-data-sync'"
                );
                return;
            }
            if (!this.$route.query) return;
            for (const key in this.$route.query) {
                if (!this.hasOwnProperty(key)) continue;
                const value = this.$route.query[key];
                this[key] = toCoolVal(value);
            }
        };
    }
};
