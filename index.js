import isString from "lodash/isString";
import isNumber from "lodash/isNumber";
import isBoolean from "lodash/isBoolean";
import isArray from "lodash/isArray";
import toNumber from "lodash/toNumber";

const settings_keys = ["_syncInclude", "_syncExclude"];

const isCoolVal = val =>
    isString(val) || isNumber(val) || isBoolean(val) || isArray(val);

const toCoolVal = val => {
    if (isArray(val)) return val.map(toCoolVal);
    let nval = toNumber(val);
    if (nval) return nval;
    return val;
};

function ignoreKey(key) {
    if (settings_keys.includes(key)) return true;
    // the exclude rule is more important than the include rule
    if (this.$data._syncExclude && this.$data._syncExclude.includes(key))
        return true;
    if (this.$data._syncInclude && !this.$data._syncInclude.includes(key))
        return true;
}

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
                if (ignoreKey.call(this, key)) continue;
                const value = this.$data[key];
                if (isCoolVal(value)) {
                    clear_value[key] = value;
                }
            }
            debugger;
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
                if (ignoreKey.call(this, key)) continue;
                if (!this.hasOwnProperty(key)) continue;
                const value = this.$route.query[key];
                this[key] = toCoolVal(value);
            }
        };
    }
};
