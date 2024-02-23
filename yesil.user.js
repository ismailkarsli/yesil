// ==UserScript==
// @name Yeşil
// @description Yeşil siteyi geliştiren özellikler
// @license AGPL-3.0
// @author İsmail Karslı <cszn@protonmail.ch> (https://ismail.karsli.net)
// @namespace https://github.com/ismailkarsli
// @homepageURL https://github.com/ismailkarsli/yesil
// @supportURL https://github.com/ismailkarsli/yesil/issues
// @updateURL https://raw.githubusercontent.com/ismailkarsli/yesil/main/yesil.user.js
// @version 2.2.0
// @match https://*.eksisozluk.com/*
// ==/UserScript==
"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/dayjs.min.js
  var require_dayjs_min = __commonJS({
    "node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/dayjs.min.js"(exports, module) {
      !function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
      }(exports, function() {
        "use strict";
        var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
          var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
          return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
        } }, m = function(t2, e2, n2) {
          var r2 = String(t2);
          return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
        }, v = { s: m, z: function(t2) {
          var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
          return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
        }, m: function t2(e2, n2) {
          if (e2.date() < n2.date())
            return -t2(n2, e2);
          var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
          return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
        }, a: function(t2) {
          return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
        }, p: function(t2) {
          return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
        }, u: function(t2) {
          return void 0 === t2;
        } }, g = "en", D = {};
        D[g] = M;
        var p = "$isDayjsObject", S = function(t2) {
          return t2 instanceof _ || !(!t2 || !t2[p]);
        }, w = function t2(e2, n2, r2) {
          var i2;
          if (!e2)
            return g;
          if ("string" == typeof e2) {
            var s2 = e2.toLowerCase();
            D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
            var u2 = e2.split("-");
            if (!i2 && u2.length > 1)
              return t2(u2[0]);
          } else {
            var a2 = e2.name;
            D[a2] = e2, i2 = a2;
          }
          return !r2 && i2 && (g = i2), i2 || !r2 && g;
        }, O = function(t2, e2) {
          if (S(t2))
            return t2.clone();
          var n2 = "object" == typeof e2 ? e2 : {};
          return n2.date = t2, n2.args = arguments, new _(n2);
        }, b = v;
        b.l = w, b.i = S, b.w = function(t2, e2) {
          return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
        };
        var _ = function() {
          function M2(t2) {
            this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
          }
          var m2 = M2.prototype;
          return m2.parse = function(t2) {
            this.$d = function(t3) {
              var e2 = t3.date, n2 = t3.utc;
              if (null === e2)
                return /* @__PURE__ */ new Date(NaN);
              if (b.u(e2))
                return /* @__PURE__ */ new Date();
              if (e2 instanceof Date)
                return new Date(e2);
              if ("string" == typeof e2 && !/Z$/i.test(e2)) {
                var r2 = e2.match($);
                if (r2) {
                  var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                  return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
                }
              }
              return new Date(e2);
            }(t2), this.init();
          }, m2.init = function() {
            var t2 = this.$d;
            this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
          }, m2.$utils = function() {
            return b;
          }, m2.isValid = function() {
            return !(this.$d.toString() === l);
          }, m2.isSame = function(t2, e2) {
            var n2 = O(t2);
            return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
          }, m2.isAfter = function(t2, e2) {
            return O(t2) < this.startOf(e2);
          }, m2.isBefore = function(t2, e2) {
            return this.endOf(e2) < O(t2);
          }, m2.$g = function(t2, e2, n2) {
            return b.u(t2) ? this[e2] : this.set(n2, t2);
          }, m2.unix = function() {
            return Math.floor(this.valueOf() / 1e3);
          }, m2.valueOf = function() {
            return this.$d.getTime();
          }, m2.startOf = function(t2, e2) {
            var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
              var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
              return r2 ? i2 : i2.endOf(a);
            }, $2 = function(t3, e3) {
              return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
            }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
            switch (f2) {
              case h:
                return r2 ? l2(1, 0) : l2(31, 11);
              case c:
                return r2 ? l2(1, M3) : l2(0, M3 + 1);
              case o:
                var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
                return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
              case a:
              case d:
                return $2(v2 + "Hours", 0);
              case u:
                return $2(v2 + "Minutes", 1);
              case s:
                return $2(v2 + "Seconds", 2);
              case i:
                return $2(v2 + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }, m2.endOf = function(t2) {
            return this.startOf(t2, false);
          }, m2.$set = function(t2, e2) {
            var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
            if (o2 === c || o2 === h) {
              var y2 = this.clone().set(d, 1);
              y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
            } else
              l2 && this.$d[l2]($2);
            return this.init(), this;
          }, m2.set = function(t2, e2) {
            return this.clone().$set(t2, e2);
          }, m2.get = function(t2) {
            return this[b.p(t2)]();
          }, m2.add = function(r2, f2) {
            var d2, l2 = this;
            r2 = Number(r2);
            var $2 = b.p(f2), y2 = function(t2) {
              var e2 = O(l2);
              return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
            };
            if ($2 === c)
              return this.set(c, this.$M + r2);
            if ($2 === h)
              return this.set(h, this.$y + r2);
            if ($2 === a)
              return y2(1);
            if ($2 === o)
              return y2(7);
            var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
            return b.w(m3, this);
          }, m2.subtract = function(t2, e2) {
            return this.add(-1 * t2, e2);
          }, m2.format = function(t2) {
            var e2 = this, n2 = this.$locale();
            if (!this.isValid())
              return n2.invalidDate || l;
            var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
              return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
            }, d2 = function(t3) {
              return b.s(s2 % 12 || 12, t3, "0");
            }, $2 = f2 || function(t3, e3, n3) {
              var r3 = t3 < 12 ? "AM" : "PM";
              return n3 ? r3.toLowerCase() : r3;
            };
            return r2.replace(y, function(t3, r3) {
              return r3 || function(t4) {
                switch (t4) {
                  case "YY":
                    return String(e2.$y).slice(-2);
                  case "YYYY":
                    return b.s(e2.$y, 4, "0");
                  case "M":
                    return a2 + 1;
                  case "MM":
                    return b.s(a2 + 1, 2, "0");
                  case "MMM":
                    return h2(n2.monthsShort, a2, c2, 3);
                  case "MMMM":
                    return h2(c2, a2);
                  case "D":
                    return e2.$D;
                  case "DD":
                    return b.s(e2.$D, 2, "0");
                  case "d":
                    return String(e2.$W);
                  case "dd":
                    return h2(n2.weekdaysMin, e2.$W, o2, 2);
                  case "ddd":
                    return h2(n2.weekdaysShort, e2.$W, o2, 3);
                  case "dddd":
                    return o2[e2.$W];
                  case "H":
                    return String(s2);
                  case "HH":
                    return b.s(s2, 2, "0");
                  case "h":
                    return d2(1);
                  case "hh":
                    return d2(2);
                  case "a":
                    return $2(s2, u2, true);
                  case "A":
                    return $2(s2, u2, false);
                  case "m":
                    return String(u2);
                  case "mm":
                    return b.s(u2, 2, "0");
                  case "s":
                    return String(e2.$s);
                  case "ss":
                    return b.s(e2.$s, 2, "0");
                  case "SSS":
                    return b.s(e2.$ms, 3, "0");
                  case "Z":
                    return i2;
                }
                return null;
              }(t3) || i2.replace(":", "");
            });
          }, m2.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }, m2.diff = function(r2, d2, l2) {
            var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
              return b.m(y2, m3);
            };
            switch (M3) {
              case h:
                $2 = D2() / 12;
                break;
              case c:
                $2 = D2();
                break;
              case f:
                $2 = D2() / 3;
                break;
              case o:
                $2 = (g2 - v2) / 6048e5;
                break;
              case a:
                $2 = (g2 - v2) / 864e5;
                break;
              case u:
                $2 = g2 / n;
                break;
              case s:
                $2 = g2 / e;
                break;
              case i:
                $2 = g2 / t;
                break;
              default:
                $2 = g2;
            }
            return l2 ? $2 : b.a($2);
          }, m2.daysInMonth = function() {
            return this.endOf(c).$D;
          }, m2.$locale = function() {
            return D[this.$L];
          }, m2.locale = function(t2, e2) {
            if (!t2)
              return this.$L;
            var n2 = this.clone(), r2 = w(t2, e2, true);
            return r2 && (n2.$L = r2), n2;
          }, m2.clone = function() {
            return b.w(this.$d, this);
          }, m2.toDate = function() {
            return new Date(this.valueOf());
          }, m2.toJSON = function() {
            return this.isValid() ? this.toISOString() : null;
          }, m2.toISOString = function() {
            return this.$d.toISOString();
          }, m2.toString = function() {
            return this.$d.toUTCString();
          }, M2;
        }(), k = _.prototype;
        return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t2) {
          k[t2[1]] = function(e2) {
            return this.$g(e2, t2[0], t2[1]);
          };
        }), O.extend = function(t2, e2) {
          return t2.$i || (t2(e2, _, O), t2.$i = true), O;
        }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
          return O(1e3 * t2);
        }, O.en = D[g], O.Ls = D, O.p = {}, O;
      });
    }
  });

  // node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/plugin/customParseFormat.js
  var require_customParseFormat = __commonJS({
    "node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/plugin/customParseFormat.js"(exports, module) {
      !function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_customParseFormat = t();
      }(exports, function() {
        "use strict";
        var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d\d/, r = /\d\d?/, i = /\d*[^-_:/,()\s\d]+/, o = {}, s = function(e2) {
          return (e2 = +e2) + (e2 > 68 ? 1900 : 2e3);
        };
        var a = function(e2) {
          return function(t2) {
            this[e2] = +t2;
          };
        }, f = [/[+-]\d\d:?(\d\d)?|Z/, function(e2) {
          (this.zone || (this.zone = {})).offset = function(e3) {
            if (!e3)
              return 0;
            if ("Z" === e3)
              return 0;
            var t2 = e3.match(/([+-]|\d\d)/g), n2 = 60 * t2[1] + (+t2[2] || 0);
            return 0 === n2 ? 0 : "+" === t2[0] ? -n2 : n2;
          }(e2);
        }], h = function(e2) {
          var t2 = o[e2];
          return t2 && (t2.indexOf ? t2 : t2.s.concat(t2.f));
        }, u = function(e2, t2) {
          var n2, r2 = o.meridiem;
          if (r2) {
            for (var i2 = 1; i2 <= 24; i2 += 1)
              if (e2.indexOf(r2(i2, 0, t2)) > -1) {
                n2 = i2 > 12;
                break;
              }
          } else
            n2 = e2 === (t2 ? "pm" : "PM");
          return n2;
        }, d = { A: [i, function(e2) {
          this.afternoon = u(e2, false);
        }], a: [i, function(e2) {
          this.afternoon = u(e2, true);
        }], S: [/\d/, function(e2) {
          this.milliseconds = 100 * +e2;
        }], SS: [n, function(e2) {
          this.milliseconds = 10 * +e2;
        }], SSS: [/\d{3}/, function(e2) {
          this.milliseconds = +e2;
        }], s: [r, a("seconds")], ss: [r, a("seconds")], m: [r, a("minutes")], mm: [r, a("minutes")], H: [r, a("hours")], h: [r, a("hours")], HH: [r, a("hours")], hh: [r, a("hours")], D: [r, a("day")], DD: [n, a("day")], Do: [i, function(e2) {
          var t2 = o.ordinal, n2 = e2.match(/\d+/);
          if (this.day = n2[0], t2)
            for (var r2 = 1; r2 <= 31; r2 += 1)
              t2(r2).replace(/\[|\]/g, "") === e2 && (this.day = r2);
        }], M: [r, a("month")], MM: [n, a("month")], MMM: [i, function(e2) {
          var t2 = h("months"), n2 = (h("monthsShort") || t2.map(function(e3) {
            return e3.slice(0, 3);
          })).indexOf(e2) + 1;
          if (n2 < 1)
            throw new Error();
          this.month = n2 % 12 || n2;
        }], MMMM: [i, function(e2) {
          var t2 = h("months").indexOf(e2) + 1;
          if (t2 < 1)
            throw new Error();
          this.month = t2 % 12 || t2;
        }], Y: [/[+-]?\d+/, a("year")], YY: [n, function(e2) {
          this.year = s(e2);
        }], YYYY: [/\d{4}/, a("year")], Z: f, ZZ: f };
        function c(n2) {
          var r2, i2;
          r2 = n2, i2 = o && o.formats;
          for (var s2 = (n2 = r2.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t2, n3, r3) {
            var o2 = r3 && r3.toUpperCase();
            return n3 || i2[r3] || e[r3] || i2[o2].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e2, t3, n4) {
              return t3 || n4.slice(1);
            });
          })).match(t), a2 = s2.length, f2 = 0; f2 < a2; f2 += 1) {
            var h2 = s2[f2], u2 = d[h2], c2 = u2 && u2[0], l = u2 && u2[1];
            s2[f2] = l ? { regex: c2, parser: l } : h2.replace(/^\[|\]$/g, "");
          }
          return function(e2) {
            for (var t2 = {}, n3 = 0, r3 = 0; n3 < a2; n3 += 1) {
              var i3 = s2[n3];
              if ("string" == typeof i3)
                r3 += i3.length;
              else {
                var o2 = i3.regex, f3 = i3.parser, h3 = e2.slice(r3), u3 = o2.exec(h3)[0];
                f3.call(t2, u3), e2 = e2.replace(u3, "");
              }
            }
            return function(e3) {
              var t3 = e3.afternoon;
              if (void 0 !== t3) {
                var n4 = e3.hours;
                t3 ? n4 < 12 && (e3.hours += 12) : 12 === n4 && (e3.hours = 0), delete e3.afternoon;
              }
            }(t2), t2;
          };
        }
        return function(e2, t2, n2) {
          n2.p.customParseFormat = true, e2 && e2.parseTwoDigitYear && (s = e2.parseTwoDigitYear);
          var r2 = t2.prototype, i2 = r2.parse;
          r2.parse = function(e3) {
            var t3 = e3.date, r3 = e3.utc, s2 = e3.args;
            this.$u = r3;
            var a2 = s2[1];
            if ("string" == typeof a2) {
              var f2 = true === s2[2], h2 = true === s2[3], u2 = f2 || h2, d2 = s2[2];
              h2 && (d2 = s2[2]), o = this.$locale(), !f2 && d2 && (o = n2.Ls[d2]), this.$d = function(e4, t4, n3) {
                try {
                  if (["x", "X"].indexOf(t4) > -1)
                    return new Date(("X" === t4 ? 1e3 : 1) * e4);
                  var r4 = c(t4)(e4), i3 = r4.year, o2 = r4.month, s3 = r4.day, a3 = r4.hours, f3 = r4.minutes, h3 = r4.seconds, u3 = r4.milliseconds, d3 = r4.zone, l2 = /* @__PURE__ */ new Date(), m2 = s3 || (i3 || o2 ? 1 : l2.getDate()), M2 = i3 || l2.getFullYear(), Y = 0;
                  i3 && !o2 || (Y = o2 > 0 ? o2 - 1 : l2.getMonth());
                  var p = a3 || 0, v = f3 || 0, D = h3 || 0, g = u3 || 0;
                  return d3 ? new Date(Date.UTC(M2, Y, m2, p, v, D, g + 60 * d3.offset * 1e3)) : n3 ? new Date(Date.UTC(M2, Y, m2, p, v, D, g)) : new Date(M2, Y, m2, p, v, D, g);
                } catch (e5) {
                  return /* @__PURE__ */ new Date("");
                }
              }(t3, a2, r3), this.init(), d2 && true !== d2 && (this.$L = this.locale(d2).$L), u2 && t3 != this.format(a2) && (this.$d = /* @__PURE__ */ new Date("")), o = {};
            } else if (a2 instanceof Array)
              for (var l = a2.length, m = 1; m <= l; m += 1) {
                s2[1] = a2[m - 1];
                var M = n2.apply(this, s2);
                if (M.isValid()) {
                  this.$d = M.$d, this.$L = M.$L, this.init();
                  break;
                }
                m === l && (this.$d = /* @__PURE__ */ new Date(""));
              }
            else
              i2.call(this, e3);
          };
        };
      });
    }
  });

  // src/utils.ts
  var stringToBoolean = (str) => {
    if (str === true || str === "true")
      return true;
    return false;
  };

  // src/index.ts
  var import_dayjs = __toESM(require_dayjs_min(), 1);
  var import_customParseFormat = __toESM(require_customParseFormat(), 1);
  import_dayjs.default.extend(import_customParseFormat.default);
  var domParser = new DOMParser();
  var Yesil = class {
    constructor() {
      this.page = 1;
    }
    /**
     * Fetch topic page and return parsed JS object
     * @param slug string pena--31782
     */
    async fetchTopic(slug, options) {
      const qs = new URLSearchParams({ p: options.page.toString() });
      if (options.sort)
        qs.set("a", options.sort);
      const html = await fetch(`https://eksisozluk.com/${slug}?${qs}`).then((r) => r.text());
      const entries = this.parseTopicPage(html);
      if (!entries)
        return this.log("No entry found in page");
      console.log(entries);
    }
    /**
     * @param html HTML element or string
     * @returns Entry[]
     */
    parseTopicPage(html) {
      const dom = typeof html === "string" ? domParser.parseFromString(html, "text/html") : html;
      const entryItemsList = dom.querySelector("ul#entry-item-list");
      const entryitems = entryItemsList?.querySelectorAll("li#entry-item");
      if (!entryitems?.length)
        return;
      const entries = [];
      for (const entryEl of entryitems) {
        if (!(entryEl instanceof HTMLElement))
          throw new Error("Entry item is not an HTML Element");
        const dataset = Object.fromEntries(
          Object.keys(entryEl.dataset).map((key) => [key, entryEl.dataset[key]])
        );
        const entry = {
          id: parseInt(dataset.id),
          author: dataset.author,
          authorId: parseInt(dataset.authorId),
          commentCount: parseInt(dataset.commentCount),
          favoriteCount: parseInt(dataset.favoriteCount),
          isPinned: stringToBoolean(dataset.ispinned),
          isPinnedOnProfile: stringToBoolean(dataset.ispinnedonprofile)
        };
        const entryDate = entryEl.querySelector(".entry-date")?.textContent?.split("~")?.[0]?.trim();
        if (!entryDate)
          return;
        const date = (0, import_dayjs.default)(entryDate, ["DD.MM.YYYY HH:mm", "DD.MM.YYYY"], true);
        if (!date.isValid()) {
          this.log(`Invalid entry date for entry ${entry.id}: ${entryDate}`);
          return;
        }
        entry.entryDate = date.toDate();
        entry.content = entryEl.querySelector("div.content")?.innerHTML;
        entry.authorAvatar = entryEl.querySelector(".avatar-container a img")?.src;
        entries.push(entry);
      }
      return entries;
    }
    log(...args) {
      console.log("[Yesil]", ...args);
    }
  };
  console.log(new Yesil().parseTopicPage(document.body));
})();
