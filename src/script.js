/*!
 * DrawSVGPlugin 3.12.5
 * https://gsap.com
 * 
 * @license Copyright 2024, GreenSock. All rights reserved.
 * This plugin is a membership benefit of Club GSAP and is only authorized for use in sites/apps/products developed by individuals/companies with an active Club GSAP membership. See https://gsap.com/pricing
 * @author: Jack Doyle, jack@greensock.com
 */

!function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).window = e.window || {}) }(this, function (e) { "use strict"; function l() { return "undefined" != typeof window } function m() { return t || l() && (t = window.gsap) && t.registerPlugin && t } function p(e) { return Math.round(1e4 * e) / 1e4 } function q(e) { return parseFloat(e) || 0 } function r(e, t) { var r = q(e); return ~e.indexOf("%") ? r / 100 * t : r } function s(e, t) { return q(e.getAttribute(t)) } function u(e, t, r, n, s, i) { return D(Math.pow((q(r) - q(e)) * s, 2) + Math.pow((q(n) - q(t)) * i, 2)) } function v(e) { return console.warn(e) } function w(e) { return "non-scaling-stroke" === e.getAttribute("vector-effect") } function z(e) { if (!(e = k(e)[0])) return 0; var t, r, n, i, o, a, f, h = e.tagName.toLowerCase(), l = e.style, d = 1, c = 1; w(e) && (c = e.getScreenCTM(), d = D(c.a * c.a + c.b * c.b), c = D(c.d * c.d + c.c * c.c)); try { r = e.getBBox() } catch (e) { v("Some browsers won't measure invisible elements (like display:none or masks inside defs).") } var g = r || { x: 0, y: 0, width: 0, height: 0 }, _ = g.x, y = g.y, x = g.width, m = g.height; if (r && (x || m) || !M[h] || (x = s(e, M[h][0]), m = s(e, M[h][1]), "rect" !== h && "line" !== h && (x *= 2, m *= 2), "line" === h && (_ = s(e, "x1"), y = s(e, "y1"), x = Math.abs(x - _), m = Math.abs(m - y))), "path" === h) i = l.strokeDasharray, l.strokeDasharray = "none", t = e.getTotalLength() || 0, p(d) !== p(c) && !b && (b = 1) && v("Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."), t *= (d + c) / 2, l.strokeDasharray = i; else if ("rect" === h) t = 2 * x * d + 2 * m * c; else if ("line" === h) t = u(_, y, _ + x, y + m, d, c); else if ("polyline" === h || "polygon" === h) for (n = e.getAttribute("points").match(P) || [], "polygon" === h && n.push(n[0], n[1]), t = 0, o = 2; o < n.length; o += 2)t += u(n[o - 2], n[o - 1], n[o], n[o + 1], d, c) || 0; else "circle" !== h && "ellipse" !== h || (a = x / 2 * d, f = m / 2 * c, t = Math.PI * (3 * (a + f) - D((3 * a + f) * (a + 3 * f)))); return t || 0 } function A(e, t) { if (!(e = k(e)[0])) return [0, 0]; t = t || z(e) + 1; var r = f.getComputedStyle(e), n = r.strokeDasharray || "", s = q(r.strokeDashoffset), i = n.indexOf(","); return i < 0 && (i = n.indexOf(" ")), t < (n = i < 0 ? t : q(n.substr(0, i))) && (n = t), [-s || 0, n - s || 0] } function B() { l() && (f = window, d = t = m(), k = t.utils.toArray, c = t.core.getStyleSaver, g = t.core.reverting || function () { }, h = -1 !== ((f.navigator || {}).userAgent || "").indexOf("Edge")) } var t, k, f, h, d, b, c, g, P = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi, M = { rect: ["width", "height"], circle: ["r", "r"], ellipse: ["rx", "ry"], line: ["x2", "y2"] }, D = Math.sqrt, n = { version: "3.12.5", name: "drawSVG", register: function register(e) { t = e, B() }, init: function init(e, t, n) { if (!e.getBBox) return !1; d || B(); var s, i, o, a = z(e); return this.styles = c && c(e, "strokeDashoffset,strokeDasharray,strokeMiterlimit"), this.tween = n, this._style = e.style, this._target = e, t + "" == "true" ? t = "0 100%" : t ? -1 === (t + "").indexOf(" ") && (t = "0 " + t) : t = "0 0", i = function _parse(e, t, n) { var s, i, o = e.indexOf(" "); return i = o < 0 ? (s = void 0 !== n ? n + "" : e, e) : (s = e.substr(0, o), e.substr(o + 1)), s = r(s, t), (i = r(i, t)) < s ? [i, s] : [s, i] }(t, a, (s = A(e, a))[0]), this._length = p(a), this._dash = p(s[1] - s[0]), this._offset = p(-s[0]), this._dashPT = this.add(this, "_dash", this._dash, p(i[1] - i[0]), 0, 0, 0, 0, 0, 1), this._offsetPT = this.add(this, "_offset", this._offset, p(-i[0]), 0, 0, 0, 0, 0, 1), h && (o = f.getComputedStyle(e)).strokeLinecap !== o.strokeLinejoin && (i = q(o.strokeMiterlimit), this.add(e.style, "strokeMiterlimit", i, i + .01)), this._live = w(e) || ~(t + "").indexOf("live"), this._nowrap = ~(t + "").indexOf("nowrap"), this._props.push("drawSVG"), 1 }, render: function render(e, t) { if (t.tween._time || !g()) { var r, n, s, i, o = t._pt, a = t._style; if (o) { for (t._live && (r = z(t._target)) !== t._length && (n = r / t._length, t._length = r, t._offsetPT && (t._offsetPT.s *= n, t._offsetPT.c *= n), t._dashPT ? (t._dashPT.s *= n, t._dashPT.c *= n) : t._dash *= n); o;)o.r(e, o.d), o = o._next; s = t._dash || e && 1 !== e && 1e-4 || 0, r = t._length - s + .1, i = t._offset, s && i && s + Math.abs(i % t._length) > t._length - .2 && (i += i < 0 ? .1 : -.1) && (r += .1), a.strokeDashoffset = s ? i : i + .001, a.strokeDasharray = r < .2 ? "none" : s ? s + "px," + (t._nowrap ? 999999 : r) + "px" : "0px, 999999px" } } else t.styles.revert() }, getLength: z, getPosition: A }; m() && t.registerPlugin(n), e.DrawSVGPlugin = n, e.default = n; if (typeof (window) === "undefined" || window !== e) { Object.defineProperty(e, "__esModule", { value: !0 }) } else { delete e.default } });

/*!
 * Physics2DPlugin 3.12.5
 * https://gsap.com
 * 
 * @license Copyright 2024, GreenSock. All rights reserved.
 * This plugin is a membership benefit of Club GSAP and is only authorized for use in sites/apps/products developed by individuals/companies with an active Club GSAP membership. See https://gsap.com/pricing
 * @author: Jack Doyle, jack@greensock.com
 */

!function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).window = e.window || {}) }(this, function (e) { "use strict"; function j() { return t || "undefined" != typeof window && (t = window.gsap) && t.registerPlugin && t } function k(e) { return Math.round(1e4 * e) / 1e4 } function l(e) { t = e || j(), v || (o = t.utils.getUnit, f = t.core.getStyleSaver, w = t.core.reverting || function () { }, v = 1) } function m(e, t, i, s, n) { var r = e._gsap, a = r.get(e, t); this.p = t, this.set = r.set(e, t), this.s = this.val = parseFloat(a), this.u = o(a) || 0, this.vel = i || 0, this.v = this.vel / n, s || 0 === s ? (this.acc = s, this.a = this.acc / (n * n)) : this.acc = this.a = 0 } var t, v, o, f, w, u = Math.PI / 180, i = { version: "3.12.5", name: "physics2D", register: l, init: function init(e, t, i) { v || l(); var s = this, n = +t.angle || 0, r = +t.velocity || 0, a = +t.acceleration || 0, o = t.xProp || "x", p = t.yProp || "y", c = t.accelerationAngle || 0 === t.accelerationAngle ? +t.accelerationAngle : n; s.styles = f && f(e, t.xProp && "x" !== t.xProp ? t.xProp + "," + t.yProp : "transform"), s.target = e, s.tween = i, s.step = 0, s.sps = 30, t.gravity && (a = +t.gravity, c = 90), n *= u, c *= u, s.fr = 1 - (+t.friction || 0), s._props.push(o, p), s.xp = new m(e, o, Math.cos(n) * r, Math.cos(c) * a, s.sps), s.yp = new m(e, p, Math.sin(n) * r, Math.sin(c) * a, s.sps), s.skipX = s.skipY = 0 }, render: function render(e, t) { var i, s, n, r, a, o, p = t.xp, l = t.yp, c = t.tween, v = t.target, f = t.step, u = t.sps, h = t.fr, d = t.skipX, g = t.skipY, y = c._from ? c._dur - c._time : c._time; if (c._time || !w()) { if (1 === h) n = y * y * .5, i = p.s + p.vel * y + p.acc * n, s = l.s + l.vel * y + l.acc * n; else { for (r = o = (0 | (y *= u)) - f, o < 0 && (p.v = p.vel / u, l.v = l.vel / u, p.val = p.s, l.val = l.s, r = o = (t.step = 0) | y), a = y % 1 * h; o--;)p.v += p.a, l.v += l.a, p.v *= h, l.v *= h, p.val += p.v, l.val += l.v; i = p.val + p.v * a, s = l.val + l.v * a, t.step += r } d || p.set(v, p.p, k(i) + p.u), g || l.set(v, l.p, k(s) + l.u) } else t.styles.revert() }, kill: function kill(e) { this.xp.p === e && (this.skipX = 1), this.yp.p === e && (this.skipY = 1) } }; j() && t.registerPlugin(i), e.Physics2DPlugin = i, e.default = i; if (typeof (window) === "undefined" || window !== e) { Object.defineProperty(e, "__esModule", { value: !0 }) } else { delete e.default } });

/*!
 * MotionPathPlugin 3.12.5
 * https://gsap.com
 * 
 * @license Copyright 2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {}) }(this, function (t) { "use strict"; function p(t) { return "string" == typeof t } function x(t) { return Math.round(1e10 * t) / 1e10 || 0 } function y(t, e, n, r) { var a = t[e], o = 1 === r ? 6 : subdivideSegment(a, n, r); if ((o || !r) && o + n + 2 < a.length) return t.splice(e, 0, a.slice(0, n + o + 2)), a.splice(0, n + o), 1 } function C(t, e) { var n = t.length, r = t[n - 1] || [], a = r.length; n && e[0] === r[a - 2] && e[1] === r[a - 1] && (e = r.concat(e.slice(2)), n--), t[n] = e } var M = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, T = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, L = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi, r = /(^[#\.][a-z]|[a-y][a-z])/i, V = Math.PI / 180, s = 180 / Math.PI, F = Math.sin, U = Math.cos, H = Math.abs, $ = Math.sqrt, l = Math.atan2, A = 1e8, h = function _isNumber(t) { return "number" == typeof t }, S = {}, _ = {}, e = 1e5, d = function _wrapProgress(t) { return Math.round((t + A) % 1 * e) / e || (t < 0 ? 0 : 1) }, N = function _round(t) { return Math.round(t * e) / e || 0 }, m = function _getSampleIndex(t, e, n) { var r = t.length, a = ~~(n * r); if (t[a] > e) { for (; --a && t[a] > e;); a < 0 && (a = 0) } else for (; t[++a] < e && a < r;); return a < r ? a : r - 1 }, O = function _copyMetaData(t, e) { return e.totalLength = t.totalLength, t.samples ? (e.samples = t.samples.slice(0), e.lookup = t.lookup.slice(0), e.minLength = t.minLength, e.resolution = t.resolution) : t.totalPoints && (e.totalPoints = t.totalPoints), e }; function getRawPath(t) { var e, n = (t = p(t) && r.test(t) && document.querySelector(t) || t).getAttribute ? t : 0; return n && (t = t.getAttribute("d")) ? (n._gsPath || (n._gsPath = {}), (e = n._gsPath[t]) && !e._dirty ? e : n._gsPath[t] = stringToRawPath(t)) : t ? p(t) ? stringToRawPath(t) : h(t[0]) ? [t] : t : console.warn("Expecting a <path> element or an SVG path data string") } function reverseSegment(t) { var e, n = 0; for (t.reverse(); n < t.length; n += 2)e = t[n], t[n] = t[n + 1], t[n + 1] = e; t.reversed = !t.reversed } var B = { rect: "rx,ry,x,y,width,height", circle: "r,cx,cy", ellipse: "rx,ry,cx,cy", line: "x1,x2,y1,y2" }; function convertToPath(t, e) { var n, r, a, o, i, s, l, h, u, f, g, c, p, d, m, v, y, x, w, P, b, M, R = t.tagName.toLowerCase(), L = .552284749831; return "path" !== R && t.getBBox ? (s = function _createPath(t, e) { var n, r = document.createElementNS("http://www.w3.org/2000/svg", "path"), a = [].slice.call(t.attributes), o = a.length; for (e = "," + e + ","; -1 < --o;)n = a[o].nodeName.toLowerCase(), e.indexOf("," + n + ",") < 0 && r.setAttributeNS(null, n, a[o].nodeValue); return r }(t, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"), M = function _attrToObj(t, e) { for (var n = e ? e.split(",") : [], r = {}, a = n.length; -1 < --a;)r[n[a]] = +t.getAttribute(n[a]) || 0; return r }(t, B[R]), "rect" === R ? (o = M.rx, i = M.ry || o, r = M.x, a = M.y, f = M.width - 2 * o, g = M.height - 2 * i, n = o || i ? "M" + (v = (d = (p = r + o) + f) + o) + "," + (x = a + i) + " V" + (w = x + g) + " C" + [v, P = w + i * L, m = d + o * L, b = w + i, d, b, d - (d - p) / 3, b, p + (d - p) / 3, b, p, b, c = r + o * (1 - L), b, r, P, r, w, r, w - (w - x) / 3, r, x + (w - x) / 3, r, x, r, y = a + i * (1 - L), c, a, p, a, p + (d - p) / 3, a, d - (d - p) / 3, a, d, a, m, a, v, y, v, x].join(",") + "z" : "M" + (r + f) + "," + a + " v" + g + " h" + -f + " v" + -g + " h" + f + "z") : "circle" === R || "ellipse" === R ? (h = "circle" === R ? (o = i = M.r) * L : (o = M.rx, (i = M.ry) * L), n = "M" + ((r = M.cx) + o) + "," + (a = M.cy) + " C" + [r + o, a + h, r + (l = o * L), a + i, r, a + i, r - l, a + i, r - o, a + h, r - o, a, r - o, a - h, r - l, a - i, r, a - i, r + l, a - i, r + o, a - h, r + o, a].join(",") + "z") : "line" === R ? n = "M" + M.x1 + "," + M.y1 + " L" + M.x2 + "," + M.y2 : "polyline" !== R && "polygon" !== R || (n = "M" + (r = (u = (t.getAttribute("points") + "").match(T) || []).shift()) + "," + (a = u.shift()) + " L" + u.join(","), "polygon" === R && (n += "," + r + "," + a + "z")), s.setAttribute("d", rawPathToString(s._gsRawPath = stringToRawPath(n))), e && t.parentNode && (t.parentNode.insertBefore(s, t), t.parentNode.removeChild(t)), s) : t } function getRotationAtBezierT(t, e, n) { var r, a = t[e], o = t[e + 2], i = t[e + 4]; return a += (o - a) * n, a += ((o += (i - o) * n) - a) * n, r = o + (i + (t[e + 6] - i) * n - o) * n - a, a = t[e + 1], a += ((o = t[e + 3]) - a) * n, a += ((o += ((i = t[e + 5]) - o) * n) - a) * n, N(l(o + (i + (t[e + 7] - i) * n - o) * n - a, r) * s) } function sliceRawPath(t, e, n) { n = function _isUndefined(t) { return void 0 === t }(n) ? 1 : x(n) || 0, e = x(e) || 0; var r = Math.max(0, ~~(H(n - e) - 1e-8)), a = function copyRawPath(t) { for (var e = [], n = 0; n < t.length; n++)e[n] = O(t[n], t[n].slice(0)); return O(t, e) }(t); if (n < e && (e = 1 - e, n = 1 - n, function _reverseRawPath(t, e) { var n = t.length; for (e || t.reverse(); n--;)t[n].reversed || reverseSegment(t[n]) }(a), a.totalLength = 0), e < 0 || n < 0) { var o = Math.abs(~~Math.min(e, n)) + 1; e += o, n += o } a.totalLength || cacheRawPathMeasurements(a); var i, s, l, h, u, f, g, c, p = 1 < n, d = getProgressData(a, e, S, !0), m = getProgressData(a, n, _), v = m.segment, w = d.segment, P = m.segIndex, b = d.segIndex, M = m.i, R = d.i, L = b === P, T = M === R && L; if (p || r) { for (i = P < b || L && M < R || T && m.t < d.t, y(a, b, R, d.t) && (b++, i || (P++, T ? (m.t = (m.t - d.t) / (1 - d.t), M = 0) : L && (M -= R))), Math.abs(1 - (n - e)) < 1e-5 ? P = b - 1 : !m.t && P ? P-- : y(a, P, M, m.t) && i && b++, 1 === d.t && (b = (b + 1) % a.length), u = [], g = 1 + (f = a.length) * r, g += (f - (c = b) + P) % f, h = 0; h < g; h++)C(u, a[c++ % f]); a = u } else if (l = 1 === m.t ? 6 : subdivideSegment(v, M, m.t), e !== n) for (s = subdivideSegment(w, R, T ? d.t / m.t : d.t), L && (l += s), v.splice(M + l + 2), (s || R) && w.splice(0, R + s), h = a.length; h--;)(h < b || P < h) && a.splice(h, 1); else v.angle = getRotationAtBezierT(v, M + l, 0), d = v[M += l], m = v[M + 1], v.length = v.totalLength = 0, v.totalPoints = a.totalPoints = 8, v.push(d, m, d, m, d, m, d, m); return a.totalLength = 0, a } function measureSegment(t, e, n) { e = e || 0, t.samples || (t.samples = [], t.lookup = []); var r, a, o, i, s, l, h, u, f, g, c, p, d, m, v, y, x, w = ~~t.resolution || 12, P = 1 / w, b = n ? e + 6 * n + 1 : t.length, M = t[e], R = t[e + 1], L = e ? e / 6 * w : 0, T = t.samples, C = t.lookup, S = (e ? t.minLength : A) || A, _ = T[L + n * w - 1], N = e ? T[L - 1] : 0; for (T.length = C.length = 0, a = e + 2; a < b; a += 6) { if (o = t[a + 4] - M, i = t[a + 2] - M, s = t[a] - M, u = t[a + 5] - R, f = t[a + 3] - R, g = t[a + 1] - R, l = h = c = p = 0, H(o) < .01 && H(u) < .01 && H(s) + H(g) < .01) 8 < t.length && (t.splice(a, 6), a -= 6, b -= 6); else for (r = 1; r <= w; r++)l = h - (h = ((m = P * r) * m * o + 3 * (d = 1 - m) * (m * i + d * s)) * m), c = p - (p = (m * m * u + 3 * d * (m * f + d * g)) * m), (y = $(c * c + l * l)) < S && (S = y), N += y, T[L++] = N; M += o, R += u } if (_) for (_ -= N; L < T.length; L++)T[L] += _; if (T.length && S) { if (t.totalLength = x = T[T.length - 1] || 0, x / (t.minLength = S) < 9999) for (y = v = 0, r = 0; r < x; r += S)C[y++] = T[v] < r ? ++v : v } else t.totalLength = T[0] = 0; return e ? N - T[e / 2 - 1] : N } function cacheRawPathMeasurements(t, e) { var n, r, a; for (a = n = r = 0; a < t.length; a++)t[a].resolution = ~~e || 12, r += t[a].length, n += measureSegment(t[a]); return t.totalPoints = r, t.totalLength = n, t } function subdivideSegment(t, e, n) { if (n <= 0 || 1 <= n) return 0; var r = t[e], a = t[e + 1], o = t[e + 2], i = t[e + 3], s = t[e + 4], l = t[e + 5], h = r + (o - r) * n, u = o + (s - o) * n, f = a + (i - a) * n, g = i + (l - i) * n, c = h + (u - h) * n, p = f + (g - f) * n, d = s + (t[e + 6] - s) * n, m = l + (t[e + 7] - l) * n; return u += (d - u) * n, g += (m - g) * n, t.splice(e + 2, 4, N(h), N(f), N(c), N(p), N(c + (u - c) * n), N(p + (g - p) * n), N(u), N(g), N(d), N(m)), t.samples && t.samples.splice(e / 6 * t.resolution | 0, 0, 0, 0, 0, 0, 0, 0), 6 } function getProgressData(t, e, n, r) { n = n || {}, t.totalLength || cacheRawPathMeasurements(t), (e < 0 || 1 < e) && (e = d(e)); var a, o, i, s, l, h, u, f = 0, g = t[0]; if (e) if (1 === e) u = 1, h = (g = t[f = t.length - 1]).length - 8; else { if (1 < t.length) { for (i = t.totalLength * e, l = h = 0; (l += t[h++].totalLength) < i;)f = h; e = (i - (s = l - (g = t[f]).totalLength)) / (l - s) || 0 } a = g.samples, o = g.resolution, i = g.totalLength * e, s = (h = g.lookup.length ? g.lookup[~~(i / g.minLength)] || 0 : m(a, i, e)) ? a[h - 1] : 0, (l = a[h]) < i && (s = l, l = a[++h]), u = 1 / o * ((i - s) / (l - s) + h % o), h = 6 * ~~(h / o), r && 1 === u && (h + 6 < g.length ? (h += 6, u = 0) : f + 1 < t.length && (h = u = 0, g = t[++f])) } else u = h = f = 0, g = t[0]; return n.t = u, n.i = h, n.path = t, n.segment = g, n.segIndex = f, n } function getPositionOnPath(t, e, n, r) { var a, o, i, s, l, h, u, f, g, c = t[0], p = r || {}; if ((e < 0 || 1 < e) && (e = d(e)), c.lookup || cacheRawPathMeasurements(t), 1 < t.length) { for (i = t.totalLength * e, l = h = 0; (l += t[h++].totalLength) < i;)c = t[h]; e = (i - (s = l - c.totalLength)) / (l - s) || 0 } return a = c.samples, o = c.resolution, i = c.totalLength * e, s = (h = c.lookup.length ? c.lookup[e < 1 ? ~~(i / c.minLength) : c.lookup.length - 1] || 0 : m(a, i, e)) ? a[h - 1] : 0, (l = a[h]) < i && (s = l, l = a[++h]), g = 1 - (u = 1 / o * ((i - s) / (l - s) + h % o) || 0), f = c[h = 6 * ~~(h / o)], p.x = N((u * u * (c[h + 6] - f) + 3 * g * (u * (c[h + 4] - f) + g * (c[h + 2] - f))) * u + f), p.y = N((u * u * (c[h + 7] - (f = c[h + 1])) + 3 * g * (u * (c[h + 5] - f) + g * (c[h + 3] - f))) * u + f), n && (p.angle = c.totalLength ? getRotationAtBezierT(c, h, 1 <= u ? 1 - 1e-9 : u || 1e-9) : c.angle || 0), p } function transformRawPath(t, e, n, r, a, o, i) { for (var s, l, h, u, f, g = t.length; -1 < --g;)for (l = (s = t[g]).length, h = 0; h < l; h += 2)u = s[h], f = s[h + 1], s[h] = u * e + f * r + o, s[h + 1] = u * n + f * a + i; return t._dirty = 1, t } function arcToSegment(t, e, n, r, a, o, i, s, l) { if (t !== s || e !== l) { n = H(n), r = H(r); var h = a % 360 * V, u = U(h), f = F(h), g = Math.PI, c = 2 * g, p = (t - s) / 2, d = (e - l) / 2, m = u * p + f * d, v = -f * p + u * d, y = m * m, x = v * v, w = y / (n * n) + x / (r * r); 1 < w && (n = $(w) * n, r = $(w) * r); var P = n * n, b = r * r, M = (P * b - P * x - b * y) / (P * x + b * y); M < 0 && (M = 0); var R = (o === i ? -1 : 1) * $(M), L = n * v / r * R, T = -r * m / n * R, C = u * L - f * T + (t + s) / 2, S = f * L + u * T + (e + l) / 2, _ = (m - L) / n, N = (v - T) / r, A = (-m - L) / n, O = (-v - T) / r, B = _ * _ + N * N, E = (N < 0 ? -1 : 1) * Math.acos(_ / $(B)), I = (_ * O - N * A < 0 ? -1 : 1) * Math.acos((_ * A + N * O) / $(B * (A * A + O * O))); isNaN(I) && (I = g), !i && 0 < I ? I -= c : i && I < 0 && (I += c), E %= c, I %= c; var D, X = Math.ceil(H(I) / (c / 4)), k = [], z = I / X, G = 4 / 3 * F(z / 2) / (1 + U(z / 2)), Z = u * n, q = f * n, Y = f * -r, j = u * r; for (D = 0; D < X; D++)m = U(a = E + D * z), v = F(a), _ = U(a += z), N = F(a), k.push(m - G * v, v + G * m, _ + G * N, N - G * _, _, N); for (D = 0; D < k.length; D += 2)m = k[D], v = k[D + 1], k[D] = m * Z + v * Y + C, k[D + 1] = m * q + v * j + S; return k[D - 2] = s, k[D - 1] = l, k } } function stringToRawPath(t) { function Cf(t, e, n, r) { u = (n - t) / 3, f = (r - e) / 3, s.push(t + u, e + f, n - u, r - f, n, r) } var e, n, r, a, o, i, s, l, h, u, f, g, c, p, d, m = (t + "").replace(L, function (t) { var e = +t; return e < 1e-4 && -1e-4 < e ? 0 : e }).match(M) || [], v = [], y = 0, x = 0, w = m.length, P = 0, b = "ERROR: malformed path: " + t; if (!t || !isNaN(m[0]) || isNaN(m[1])) return console.log(b), v; for (e = 0; e < w; e++)if (c = o, isNaN(m[e]) ? i = (o = m[e].toUpperCase()) !== m[e] : e--, r = +m[e + 1], a = +m[e + 2], i && (r += y, a += x), e || (l = r, h = a), "M" === o) s && (s.length < 8 ? --v.length : P += s.length), y = l = r, x = h = a, s = [r, a], v.push(s), e += 2, o = "L"; else if ("C" === o) i || (y = x = 0), (s = s || [0, 0]).push(r, a, y + 1 * m[e + 3], x + 1 * m[e + 4], y += 1 * m[e + 5], x += 1 * m[e + 6]), e += 6; else if ("S" === o) u = y, f = x, "C" !== c && "S" !== c || (u += y - s[s.length - 4], f += x - s[s.length - 3]), i || (y = x = 0), s.push(u, f, r, a, y += 1 * m[e + 3], x += 1 * m[e + 4]), e += 4; else if ("Q" === o) u = y + 2 / 3 * (r - y), f = x + 2 / 3 * (a - x), i || (y = x = 0), y += 1 * m[e + 3], x += 1 * m[e + 4], s.push(u, f, y + 2 / 3 * (r - y), x + 2 / 3 * (a - x), y, x), e += 4; else if ("T" === o) u = y - s[s.length - 4], f = x - s[s.length - 3], s.push(y + u, x + f, r + 2 / 3 * (y + 1.5 * u - r), a + 2 / 3 * (x + 1.5 * f - a), y = r, x = a), e += 2; else if ("H" === o) Cf(y, x, y = r, x), e += 1; else if ("V" === o) Cf(y, x, y, x = r + (i ? x - y : 0)), e += 1; else if ("L" === o || "Z" === o) "Z" === o && (r = l, a = h, s.closed = !0), ("L" === o || .5 < H(y - r) || .5 < H(x - a)) && (Cf(y, x, r, a), "L" === o && (e += 2)), y = r, x = a; else if ("A" === o) { if (p = m[e + 4], d = m[e + 5], u = m[e + 6], f = m[e + 7], n = 7, 1 < p.length && (p.length < 3 ? (f = u, u = d, n--) : (f = d, u = p.substr(2), n -= 2), d = p.charAt(1), p = p.charAt(0)), g = arcToSegment(y, x, +m[e + 1], +m[e + 2], +m[e + 3], +p, +d, (i ? y : 0) + 1 * u, (i ? x : 0) + 1 * f), e += n, g) for (n = 0; n < g.length; n++)s.push(g[n]); y = s[s.length - 2], x = s[s.length - 1] } else console.log(b); return (e = s.length) < 6 ? (v.pop(), e = 0) : s[0] === s[e - 2] && s[1] === s[e - 1] && (s.closed = !0), v.totalPoints = P + e, v } function flatPointsToSegment(t, e) { void 0 === e && (e = 1); for (var n = t[0], r = 0, a = [n, r], o = 2; o < t.length; o += 2)a.push(n, r, t[o], r = (t[o] - n) * e / 2, n = t[o], -r); return a } function pointsToSegment(t, e) { H(t[0] - t[2]) < 1e-4 && H(t[1] - t[3]) < 1e-4 && (t = t.slice(2)); var n, r, a, o, i, s, l, h, u, f, g, c, p, d, m = t.length - 2, v = +t[0], y = +t[1], x = +t[2], w = +t[3], P = [v, y, v, y], b = x - v, M = w - y, R = Math.abs(t[m] - v) < .001 && Math.abs(t[m + 1] - y) < .001; for (R && (t.push(x, w), x = v, w = y, v = t[m - 2], y = t[m - 1], t.unshift(v, y), m += 4), e = e || 0 === e ? +e : 1, a = 2; a < m; a += 2)n = v, r = y, v = x, y = w, x = +t[a + 2], w = +t[a + 3], v === x && y === w || (o = b, i = M, b = x - v, M = w - y, h = ((s = $(o * o + i * i)) + (l = $(b * b + M * M))) * e * .25 / $(Math.pow(b / l + o / s, 2) + Math.pow(M / l + i / s, 2)), g = v - ((u = v - (v - n) * (s ? h / s : 0)) + (((f = v + (x - v) * (l ? h / l : 0)) - u) * (3 * s / (s + l) + .5) / 4 || 0)), d = y - ((c = y - (y - r) * (s ? h / s : 0)) + (((p = y + (w - y) * (l ? h / l : 0)) - c) * (3 * s / (s + l) + .5) / 4 || 0)), v === n && y === r || P.push(N(u + g), N(c + d), N(v), N(y), N(f + g), N(p + d))); return v !== x || y !== w || P.length < 4 ? P.push(N(x), N(w), N(x), N(w)) : P.length -= 2, 2 === P.length ? P.push(v, y, v, y, v, y) : R && (P.splice(0, 6), P.length = P.length - 6), P } function rawPathToString(t) { h(t[0]) && (t = [t]); var e, n, r, a, o = "", i = t.length; for (n = 0; n < i; n++) { for (a = t[n], o += "M" + N(a[0]) + "," + N(a[1]) + " C", e = a.length, r = 2; r < e; r++)o += N(a[r++]) + "," + N(a[r++]) + " " + N(a[r++]) + "," + N(a[r++]) + " " + N(a[r++]) + "," + N(a[r]) + " "; a.closed && (o += "z") } return o } function R(t) { var e = t.ownerDocument || t; !(k in t.style) && "msTransform" in t.style && (z = (k = "msTransform") + "Origin"); for (; e.parentNode && (e = e.parentNode);); if (v = window, E = new Y, e) { w = (c = e).documentElement, P = e.body, (I = c.createElementNS("http://www.w3.org/2000/svg", "g")).style.transform = "none"; var n = e.createElement("div"), r = e.createElement("div"), a = e && (e.body || e.firstElementChild); a && a.appendChild && (a.appendChild(n), n.appendChild(r), n.setAttribute("style", "position:static;transform:translate3d(0,0,1px)"), D = r.offsetParent !== n, a.removeChild(n)) } return e } function X(t) { return t.ownerSVGElement || ("svg" === (t.tagName + "").toLowerCase() ? t : null) } function Z(t, e) { if (t.parentNode && (c || R(t))) { var n = X(t), r = n ? n.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", a = n ? e ? "rect" : "g" : "div", o = 2 !== e ? 0 : 100, i = 3 === e ? 100 : 0, s = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", l = c.createElementNS ? c.createElementNS(r.replace(/^https/, "http"), a) : c.createElement(a); return e && (n ? (b = b || Z(t), l.setAttribute("width", .01), l.setAttribute("height", .01), l.setAttribute("transform", "translate(" + o + "," + i + ")"), b.appendChild(l)) : (g || ((g = Z(t)).style.cssText = s), l.style.cssText = s + "width:0.1px;height:0.1px;top:" + i + "px;left:" + o + "px", g.appendChild(l))), l } throw "Need document and parent." } function aa(t, e) { var n, r, a, o, i, s, l = X(t), h = t === l, u = l ? G : q, f = t.parentNode; if (t === v) return t; if (u.length || u.push(Z(t, 1), Z(t, 2), Z(t, 3)), n = l ? b : g, l) h ? (o = -(a = function _getCTM(t) { var e, n = t.getCTM(); return n || (e = t.style[k], t.style[k] = "none", t.appendChild(I), n = I.getCTM(), t.removeChild(I), e ? t.style[k] = e : t.style.removeProperty(k.replace(/([A-Z])/g, "-$1").toLowerCase())), n || E.clone() }(t)).e / a.a, i = -a.f / a.d, r = E) : t.getBBox ? (a = t.getBBox(), o = (r = (r = t.transform ? t.transform.baseVal : {}).numberOfItems ? 1 < r.numberOfItems ? function _consolidate(t) { for (var e = new Y, n = 0; n < t.numberOfItems; n++)e.multiply(t.getItem(n).matrix); return e }(r) : r.getItem(0).matrix : E).a * a.x + r.c * a.y, i = r.b * a.x + r.d * a.y) : (r = new Y, o = i = 0), e && "g" === t.tagName.toLowerCase() && (o = i = 0), (h ? l : f).appendChild(n), n.setAttribute("transform", "matrix(" + r.a + "," + r.b + "," + r.c + "," + r.d + "," + (r.e + o) + "," + (r.f + i) + ")"); else { if (o = i = 0, D) for (r = t.offsetParent, a = t; (a = a && a.parentNode) && a !== r && a.parentNode;)4 < (v.getComputedStyle(a)[k] + "").length && (o = a.offsetLeft, i = a.offsetTop, a = 0); if ("absolute" !== (s = v.getComputedStyle(t)).position && "fixed" !== s.position) for (r = t.offsetParent; f && f !== r;)o += f.scrollLeft || 0, i += f.scrollTop || 0, f = f.parentNode; (a = n.style).top = t.offsetTop - i + "px", a.left = t.offsetLeft - o + "px", a[k] = s[k], a[z] = s[z], a.position = "fixed" === s.position ? "fixed" : "absolute", t.parentNode.appendChild(n) } return n } function ba(t, e, n, r, a, o, i) { return t.a = e, t.b = n, t.c = r, t.d = a, t.e = o, t.f = i, t } var c, v, w, P, g, b, E, I, D, n, k = "transform", z = k + "Origin", G = [], q = [], Y = ((n = Matrix2D.prototype).inverse = function inverse() { var t = this.a, e = this.b, n = this.c, r = this.d, a = this.e, o = this.f, i = t * r - e * n || 1e-10; return ba(this, r / i, -e / i, -n / i, t / i, (n * o - r * a) / i, -(t * o - e * a) / i) }, n.multiply = function multiply(t) { var e = this.a, n = this.b, r = this.c, a = this.d, o = this.e, i = this.f, s = t.a, l = t.c, h = t.b, u = t.d, f = t.e, g = t.f; return ba(this, s * e + h * r, s * n + h * a, l * e + u * r, l * n + u * a, o + f * e + g * r, i + f * n + g * a) }, n.clone = function clone() { return new Matrix2D(this.a, this.b, this.c, this.d, this.e, this.f) }, n.equals = function equals(t) { var e = this.a, n = this.b, r = this.c, a = this.d, o = this.e, i = this.f; return e === t.a && n === t.b && r === t.c && a === t.d && o === t.e && i === t.f }, n.apply = function apply(t, e) { void 0 === e && (e = {}); var n = t.x, r = t.y, a = this.a, o = this.b, i = this.c, s = this.d, l = this.e, h = this.f; return e.x = n * a + r * i + l || 0, e.y = n * o + r * s + h || 0, e }, Matrix2D); function Matrix2D(t, e, n, r, a, o) { void 0 === t && (t = 1), void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === r && (r = 1), void 0 === a && (a = 0), void 0 === o && (o = 0), ba(this, t, e, n, r, a, o) } function getGlobalMatrix(t, e, n, r) { if (!t || !t.parentNode || (c || R(t)).documentElement === t) return new Y; var a = function _forceNonZeroScale(t) { for (var e, n; t && t !== P;)(n = t._gsap) && n.uncache && n.get(t, "x"), n && !n.scaleX && !n.scaleY && n.renderTransform && (n.scaleX = n.scaleY = 1e-4, n.renderTransform(1, n), e ? e.push(n) : e = [n]), t = t.parentNode; return e }(t), o = X(t) ? G : q, i = aa(t, n), s = o[0].getBoundingClientRect(), l = o[1].getBoundingClientRect(), h = o[2].getBoundingClientRect(), u = i.parentNode, f = !r && function _isFixed(t) { return "fixed" === v.getComputedStyle(t).position || ((t = t.parentNode) && 1 === t.nodeType ? _isFixed(t) : void 0) }(t), g = new Y((l.left - s.left) / 100, (l.top - s.top) / 100, (h.left - s.left) / 100, (h.top - s.top) / 100, s.left + (f ? 0 : function _getDocScrollLeft() { return v.pageXOffset || c.scrollLeft || w.scrollLeft || P.scrollLeft || 0 }()), s.top + (f ? 0 : function _getDocScrollTop() { return v.pageYOffset || c.scrollTop || w.scrollTop || P.scrollTop || 0 }())); if (u.removeChild(i), a) for (s = a.length; s--;)(l = a[s]).scaleX = l.scaleY = 0, l.renderTransform(1, l); return e ? g.inverse() : g } function na(t, e, n, r) { for (var a = e.length, o = 2 === r ? 0 : r, i = 0; i < a; i++)t[o] = parseFloat(e[i][n]), 2 === r && (t[o + 1] = 0), o += 2; return t } function oa(t, e, n) { return parseFloat(t._gsap.get(t, e, n || "px")) || 0 } function pa(t) { var e, n = t[0], r = t[1]; for (e = 2; e < t.length; e += 2)n = t[e] += n, r = t[e + 1] += r } function qa(t, e, n, r, a, o, i, s, l) { return e = "cubic" === i.type ? [e] : (!1 !== i.fromCurrent && e.unshift(oa(n, r, s), a ? oa(n, a, l) : 0), i.relative && pa(e), [(a ? pointsToSegment : flatPointsToSegment)(e, i.curviness)]), e = o(nt(e, n, i)), rt(t, n, r, e, "x", s), a && rt(t, n, a, e, "y", l), cacheRawPathMeasurements(e, i.resolution || (0 === i.curviness ? 20 : 12)) } function ra(t) { return t } function ta(t, e, n) { var r, a = getGlobalMatrix(t), o = 0, i = 0; return "svg" === (t.tagName + "").toLowerCase() ? (r = t.viewBox.baseVal).width || (r = { width: +t.getAttribute("width"), height: +t.getAttribute("height") }) : r = e && t.getBBox && t.getBBox(), e && "auto" !== e && (o = e.push ? e[0] * (r ? r.width : t.offsetWidth || 0) : e.x, i = e.push ? e[1] * (r ? r.height : t.offsetHeight || 0) : e.y), n.apply(o || i ? a.apply({ x: o, y: i }) : { x: a.e, y: a.f }) } function ua(t, e, n, r) { var a, o = getGlobalMatrix(t.parentNode, !0, !0), i = o.clone().multiply(getGlobalMatrix(e)), s = ta(t, n, o), l = ta(e, r, o), h = l.x, u = l.y; return i.e = i.f = 0, "auto" === r && e.getTotalLength && "path" === e.tagName.toLowerCase() && (a = e.getAttribute("d").match(et) || [], h += (a = i.apply({ x: +a[0], y: +a[1] })).x, u += a.y), a && (h -= (a = i.apply(e.getBBox())).x, u -= a.y), i.e = h - s.x, i.f = u - s.y, i } var j, f, Q, W, J, o, K = "x,translateX,left,marginLeft,xPercent".split(","), tt = "y,translateY,top,marginTop,yPercent".split(","), i = Math.PI / 180, et = /[-+\.]*\d+\.?(?:e-|e\+)?\d*/g, nt = function _align(t, e, n) { var r, a, o, i = n.align, s = n.matrix, l = n.offsetX, h = n.offsetY, u = n.alignOrigin, f = t[0][0], g = t[0][1], c = oa(e, "x"), p = oa(e, "y"); return t && t.length ? (i && ("self" === i || (r = W(i)[0] || e) === e ? transformRawPath(t, 1, 0, 0, 1, c - f, p - g) : (u && !1 !== u[2] ? j.set(e, { transformOrigin: 100 * u[0] + "% " + 100 * u[1] + "%" }) : u = [oa(e, "xPercent") / -100, oa(e, "yPercent") / -100], o = (a = ua(e, r, u, "auto")).apply({ x: f, y: g }), transformRawPath(t, a.a, a.b, a.c, a.d, c + a.e - (o.x - a.e), p + a.f - (o.y - a.f)))), s ? transformRawPath(t, s.a, s.b, s.c, s.d, s.e, s.f) : (l || h) && transformRawPath(t, 1, 0, 0, 1, l || 0, h || 0), t) : getRawPath("M0,0L0,0") }, rt = function _addDimensionalPropTween(t, e, n, r, a, o) { var i = e._gsap, s = i.harness, l = s && s.aliases && s.aliases[n], h = l && l.indexOf(",") < 0 ? l : n, u = t._pt = new f(t._pt, e, h, 0, 0, ra, 0, i.set(e, h, t)); u.u = Q(i.get(e, h, o)) || 0, u.path = r, u.pp = a, t._props.push(h) }, a = { version: "3.12.5", name: "motionPath", register: function register(t, e, n) { Q = (j = t).utils.getUnit, W = j.utils.toArray, J = j.core.getStyleSaver, o = j.core.reverting || function () { }, f = n }, init: function init(t, e, n) { if (!j) return console.warn("Please gsap.registerPlugin(MotionPathPlugin)"), !1; "object" == typeof e && !e.style && e.path || (e = { path: e }); var r, a, o = [], i = e.path, s = e.autoRotate, l = e.unitX, h = e.unitY, u = e.x, f = e.y, g = i[0], c = function _sliceModifier(e, n) { return function (t) { return e || 1 !== n ? sliceRawPath(t, e, n) : t } }(e.start, "end" in e ? e.end : 1); if (this.rawPaths = o, this.target = t, this.tween = n, this.styles = J && J(t, "transform"), (this.rotate = s || 0 === s) && (this.rOffset = parseFloat(s) || 0, this.radians = !!e.useRadians, this.rProp = e.rotation || "rotation", this.rSet = t._gsap.set(t, this.rProp, this), this.ru = Q(t._gsap.get(t, this.rProp)) || 0), !Array.isArray(i) || "closed" in i || "number" == typeof g) cacheRawPathMeasurements(r = c(nt(getRawPath(e.path), t, e)), e.resolution), o.push(r), rt(this, t, e.x || "x", r, "x", e.unitX || "px"), rt(this, t, e.y || "y", r, "y", e.unitY || "px"); else { for (a in g) !u && ~K.indexOf(a) ? u = a : !f && ~tt.indexOf(a) && (f = a); for (a in u && f ? o.push(qa(this, na(na([], i, u, 0), i, f, 1), t, u, f, c, e, l || Q(i[0][u]), h || Q(i[0][f]))) : u = f = 0, g) a !== u && a !== f && o.push(qa(this, na([], i, a, 2), t, a, 0, c, e, Q(i[0][a]))) } }, render: function render(t, e) { var n = e.rawPaths, r = n.length, a = e._pt; if (e.tween._time || !o()) { for (1 < t ? t = 1 : t < 0 && (t = 0); r--;)getPositionOnPath(n[r], t, !r && e.rotate, n[r]); for (; a;)a.set(a.t, a.p, a.path[a.pp] + a.u, a.d, t), a = a._next; e.rotate && e.rSet(e.target, e.rProp, n[0].angle * (e.radians ? i : 1) + e.rOffset + e.ru, e, t) } else e.styles.revert() }, getLength: function getLength(t) { return cacheRawPathMeasurements(getRawPath(t)).totalLength }, sliceRawPath: sliceRawPath, getRawPath: getRawPath, pointsToSegment: pointsToSegment, stringToRawPath: stringToRawPath, rawPathToString: rawPathToString, transformRawPath: transformRawPath, getGlobalMatrix: getGlobalMatrix, getPositionOnPath: getPositionOnPath, cacheRawPathMeasurements: cacheRawPathMeasurements, convertToPath: function convertToPath$1(t, e) { return W(t).map(function (t) { return convertToPath(t, !1 !== e) }) }, convertCoordinates: function convertCoordinates(t, e, n) { var r = getGlobalMatrix(e, !0, !0).multiply(getGlobalMatrix(t)); return n ? r.apply(n) : r }, getAlignMatrix: ua, getRelativePosition: function getRelativePosition(t, e, n, r) { var a = ua(t, e, n, r); return { x: a.e, y: a.f } }, arrayToRawPath: function arrayToRawPath(t, e) { var n = na(na([], t, (e = e || {}).x || "x", 0), t, e.y || "y", 1); return e.relative && pa(n), ["cubic" === e.type ? n : pointsToSegment(n, e.curviness)] } }; !function _getGSAP() { return j || "undefined" != typeof window && (j = window.gsap) && j.registerPlugin && j }() || j.registerPlugin(a), t.MotionPathPlugin = a, t.default = a; if (typeof (window) === "undefined" || window !== t) { Object.defineProperty(t, "__esModule", { value: !0 }) } else { delete t.default } });

/*!
 * EasePack 3.12.5
 * https://gsap.com
 * 
 * @license Copyright 2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function (e, n) { "object" == typeof exports && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n((e = e || self).window = e.window || {}) }(this, function (e) { "use strict"; function f() { return w || "undefined" != typeof window && (w = window.gsap) && w.registerPlugin && w } function g(e, n) { return !!(void 0 === e ? n : e && !~(e + "").indexOf("false")) } function h(e) { if (w = e || f()) { r = w.registerEase; var n, t = w.parseEase(), o = function createConfig(t) { return function (e) { var n = .5 + e / 2; t.config = function (e) { return t(2 * (1 - e) * e * n + e * e) } } }; for (n in t) t[n].config || o(t[n]); for (n in r("slow", a), r("expoScale", s), r("rough", u), c) "version" !== n && w.core.globals(n, c[n]) } } function i(e, n, t) { var o = (e = Math.min(1, e || .7)) < 1 ? n || 0 === n ? n : .7 : 0, r = (1 - e) / 2, i = r + e, a = g(t); return function (e) { var n = e + (.5 - e) * o; return e < r ? a ? 1 - (e = 1 - e / r) * e : n - (e = 1 - e / r) * e * e * e * n : i < e ? a ? 1 === e ? 0 : 1 - (e = (e - i) / r) * e : n + (e - n) * (e = (e - i) / r) * e * e * e : a ? 1 : n } } function j(n, e, t) { var o = Math.log(e / n), r = e - n; return t = t && w.parseEase(t), function (e) { return (n * Math.exp(o * (t ? t(e) : e)) - n) / r } } function k(e, n, t) { this.t = e, this.v = n, t && (((this.next = t).prev = this).c = t.v - n, this.gap = t.t - e) } function l(e) { "object" != typeof e && (e = { points: +e || 20 }); for (var n, t, o, r, i, a, f, s = e.taper || "none", u = [], c = 0, p = 0 | (+e.points || 20), l = p, v = g(e.randomize, !0), d = g(e.clamp), h = w ? w.parseEase(e.template) : 0, x = .4 * (+e.strength || 1); -1 < --l;)n = v ? Math.random() : 1 / p * l, t = h ? h(n) : n, o = "none" === s ? x : "out" === s ? (r = 1 - n) * r * x : "in" === s ? n * n * x : n < .5 ? (r = 2 * n) * r * .5 * x : (r = 2 * (1 - n)) * r * .5 * x, v ? t += Math.random() * o - .5 * o : l % 2 ? t += .5 * o : t -= .5 * o, d && (1 < t ? t = 1 : t < 0 && (t = 0)), u[c++] = { x: n, y: t }; for (u.sort(function (e, n) { return e.x - n.x }), a = new k(1, 1, null), l = p; l--;)i = u[l], a = new k(i.x, i.y, a); return f = new k(0, 0, a.t ? a : a.next), function (e) { var n = f; if (e > n.t) { for (; n.next && e >= n.t;)n = n.next; n = n.prev } else for (; n.prev && e <= n.t;)n = n.prev; return (f = n).v + (e - n.t) / n.gap * n.c } } var w, r, a = i(.7); (a.ease = a).config = i; var s = j(1, 2); s.config = j; var u = l(); (u.ease = u).config = l; var c = { SlowMo: a, RoughEase: u, ExpoScaleEase: s }; for (var n in c) c[n].register = h, c[n].version = "3.12.5"; f() && w.registerPlugin(a), e.EasePack = c, e.ExpoScaleEase = s, e.RoughEase = u, e.SlowMo = a, e.default = c; if (typeof (window) === "undefined" || window !== e) { Object.defineProperty(e, "__esModule", { value: !0 }) } else { delete e.default } });



//MorphSVGPlugin.convertToPath('polygon');
function initSnow() {
  var COUNT = 100;
  var masthead = document.querySelector('.sky');
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var width = masthead.clientWidth;
  var height = masthead.clientHeight;
  var i = 0;
  var active = false;

  function onResize() {
    width = masthead.clientWidth;
    height = masthead.clientHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = '#FFF';

    var wasActive = active;
    active = width > 100;

    if (!wasActive && active)
      requestAnimFrame(update);
  }

  var Snowflake = function () {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
    this.r = 0;

    this.reset();
  }

  Snowflake.prototype.reset = function () {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.vy = 1 + Math.random() * 3;
    this.vx = 0.5 - Math.random();
    this.r = 1 + Math.random() * 2;
    this.o = 0.5 + Math.random() * 0.5;
  }

  canvas.style.position = 'absolute';
  canvas.style.left = canvas.style.top = '0';

  var snowflakes = [], snowflake;
  for (i = 0; i < COUNT; i++) {
    snowflake = new Snowflake();
    snowflake.reset();
    snowflakes.push(snowflake);
  }

  function update() {

    ctx.clearRect(0, 0, width, height);

    if (!active)
      return;

    for (i = 0; i < COUNT; i++) {
      snowflake = snowflakes[i];
      snowflake.y += snowflake.vy;
      snowflake.x += snowflake.vx;

      ctx.globalAlpha = snowflake.o;
      ctx.beginPath();
      ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();

      if (snowflake.y > height) {
        snowflake.reset();
      }
    }

    requestAnimFrame(update);
  }

  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  onResize();
  window.addEventListener('resize', onResize, false);

  masthead.appendChild(canvas);
}

function initTree() {
  var xmlns = "http://www.w3.org/2000/svg",
    xlinkns = "http://www.w3.org/1999/xlink",
    select = function (s) {
      return document.querySelector(s);
    },
    selectAll = function (s) {
      return document.querySelectorAll(s);
    },
    pContainer = select('.pContainer'),
    mainSVG = select('.mainSVG'),
    star = select('#star'),
    sparkle = select('.sparkle'),
    tree = select('#tree'),
    showParticle = true,
    particleColorArray = ['#E8F6F8', '#ACE8F8', '#F6FBFE', '#A2CBDC', '#B74551', '#5DBA72', '#910B28', '#910B28', '#446D39'],
    particleTypeArray = ['#star', '#circ', '#cross', '#heart'],
    particleTypeArray = ['#star'],
    particlePool = [],
    particleCount = 0,
    numParticles = 200


  gsap.set('svg', {
    visibility: 'visible'
  })

  gsap.set(sparkle, {
    transformOrigin: '50% 50%',
    y: -100
  })

  let getSVGPoints = (path) => {

    let arr = []
    var rawPath = MotionPathPlugin.getRawPath(path)[0];
    rawPath.forEach((el, value) => {
      let obj = {}
      obj.x = rawPath[value * 2]
      obj.y = rawPath[(value * 2) + 1]
      if (value % 2) {
        arr.push(obj)
      }
    })

    return arr;
  }
  let treePath = getSVGPoints('.treePath')

  var treeBottomPath = getSVGPoints('.treeBottomPath')
  var mainTl = gsap.timeline({ delay: 1, repeat: 0 }), starTl;


  //tl.seek(100).timeScale(1.82)

  function flicker(p) {

    //console.log("flivker")
    gsap.killTweensOf(p, { opacity: true });
    gsap.fromTo(p, {
      opacity: 1
    }, {
      duration: 0.07,
      opacity: Math.random(),
      //ease: RoughEase.ease.config({ template: Power0.easeNone, strength: 3, points: 6, taper: "both", randomize: true, clamp: false}),
      repeat: -1
    })
  }

  function createParticles() {

    //var step = numParticles/starPath.length;
    //console.log(starPath.length)
    var i = numParticles, p, particleTl, step = numParticles / treePath.length, pos;
    while (--i > -1) {

      p = select(particleTypeArray[i % particleTypeArray.length]).cloneNode(true);
      mainSVG.appendChild(p);
      p.setAttribute('fill', particleColorArray[i % particleColorArray.length]);
      p.setAttribute('class', "particle");
      particlePool.push(p);
      //hide them initially
      gsap.set(p, {
        x: -100,
        y: -100,
        transformOrigin: '50% 50%'
      })



    }

  }
  function getScale() {
    return gsap.utils.random(0.5, 2);
  }
  function playParticle(p) {
    if (!showParticle) { return };
    var p = particlePool[particleCount]
    gsap.set(p, {
      x: gsap.getProperty('.pContainer', 'x'),
      y: gsap.getProperty('.pContainer', 'y'),
      scale: getScale()
      //}
    }
    );
    var tl = gsap.timeline();
    tl.to(p, {
      duration: gsap.utils.random(0.61, 6),
      //paused:true,
      physics2D: {
        velocity: gsap.utils.random(-13, 16),
        angle: gsap.utils.random(-180, 180),
        gravity: gsap.utils.random(-13, 44)
      },

      scale: 0,
      rotation: gsap.utils.random(-123, 360),
      //skewY:(Math.random() * 180),
      ease: 'power1',
      onStart: flicker,
      onStartParams: [p],
      //repeat:-1,
      onRepeat: function (p) {
        gsap.set(p, {
          scale: getScale()
        })

      },
      onRepeatParams: [p]

    });


    //
    //particlePool[particleCount].play();
    particleCount++;
    //mainTl.add(tl, i / 1.3)
    particleCount = (particleCount >= numParticles) ? 0 : particleCount

  }

  function drawStar() {

    starTl = gsap.timeline({ onUpdate: playParticle })
    starTl.to('.pContainer, .sparkle', {
      duration: 6,
      motionPath: {
        path: '.treePath',
        autoRotate: false
      },
      ease: 'linear'
    })
      .to('.pContainer, .sparkle', {
        duration: 1,
        onStart: function () { showParticle = false },
        x: treeBottomPath[0].x,
        y: treeBottomPath[0].y
      })
      .to('.pContainer, .sparkle', {
        duration: 2,
        onStart: function () { showParticle = true },
        motionPath: {
          path: '.treeBottomPath',
          autoRotate: false
        },
        ease: 'linear'
      }, '-=0')
      .from('.treeBottomMask', {
        duration: 2,
        drawSVG: '0% 0%',
        stroke: '#FFF',
        ease: 'linear'
      }, '-=2')


    //gsap.staggerTo(particlePool, 2, {})

  }


  createParticles();
  drawStar();
  //ScrubGSAPTimeline(mainTl)

  mainTl.from(['.treePathMask', '.treePotMask'], {
    duration: 6,
    drawSVG: '0% 0%',
    stroke: '#FFF',
    stagger: {
      each: 6
    },
    duration: gsap.utils.wrap([6, 1, 2]),
    ease: 'linear'
  })
    .from('.treeStar', {
      duration: 3,
      //skewY:270,
      scaleY: 0,
      scaleX: 0.15,
      transformOrigin: '50% 50%',
      ease: 'elastic(1,0.5)'
    }, '-=4')

    .to('.sparkle', {
      duration: 3,
      opacity: 0,
      ease: "rough({strength: 2, points: 100, template: linear, taper: both, randomize: true, clamp: false})"
    }, '-=0')
    .to('.treeStarOutline', {
      duration: 1,
      opacity: 1,
      ease: "rough({strength: 2, points: 16, template: linear, taper: none, randomize: true, clamp: false})"
    }, '+=1')


  mainTl.add(starTl, 0)
  gsap.globalTimeline.timeScale(1.5);

  // starTl.vars.onComplete = function () {
  //   gsap.to('foreignObject', {
  //     opacity: 1
  //   })
  // }
}

function setResponsiveViewBox() {
  var svg = document.querySelector(".mainSVG");

  if (window.screen.width <= 768) {
    // Para dispositivos móveis (tela pequena)
    svg.style.width = "400px"
    // svg.setAttribute("viewBox", "100 0 300 400");  // Exemplo para mobile
  } else {
    // Para desktops ou telas grandes
    // svg.setAttribute("viewBox", "200 0 400 570");  // Exemplo para desktop
    svg.style.width = "500px"
  }
}

function initAudio() {
  const audio = document.querySelector("audio");
  audio.volume = 1;
  audio.muted = false;
  audio.play()
  console.log("Feliz Natal e boas festas!")
}

let activeTree = false;

function initAnimationTree() {
  const containerTree = document.querySelector(".container-tree");
  const gift = document.querySelector(".gift");

  containerTree.style.display = "block";
  gift.style.display = "none";

  if (!activeTree) {
    initTree();
    initAudio();
    activeTree = true;
  }
}

initSnow()

window.addEventListener("resize", setResponsiveViewBox);
window.addEventListener("load", setResponsiveViewBox);
window.addEventListener("click", initAnimationTree);

