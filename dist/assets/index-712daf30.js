(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = n(s);
    fetch(s.href, o);
  }
})();
function zr(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let s = 0; s < r.length; s++) n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const ce = {},
  qt = [],
  Je = () => {},
  hl = () => !1,
  gl = /^on[^a-z]/,
  Jn = (e) => gl.test(e),
  es = (e) => e.startsWith("onUpdate:"),
  ge = Object.assign,
  ts = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  bl = Object.prototype.hasOwnProperty,
  Q = (e, t) => bl.call(e, t),
  H = Array.isArray,
  Yt = (e) => Qn(e) === "[object Map]",
  qo = (e) => Qn(e) === "[object Set]",
  B = (e) => typeof e == "function",
  be = (e) => typeof e == "string",
  ns = (e) => typeof e == "symbol",
  le = (e) => e !== null && typeof e == "object",
  Yo = (e) => le(e) && B(e.then) && B(e.catch),
  Go = Object.prototype.toString,
  Qn = (e) => Go.call(e),
  vl = (e) => Qn(e).slice(8, -1),
  Jo = (e) => Qn(e) === "[object Object]",
  rs = (e) =>
    be(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Un = zr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Zn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  yl = /-(\w)/g,
  Qt = Zn((e) => e.replace(yl, (t, n) => (n ? n.toUpperCase() : ""))),
  El = /\B([A-Z])/g,
  rn = Zn((e) => e.replace(El, "-$1").toLowerCase()),
  Qo = Zn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  mr = Zn((e) => (e ? `on${Qo(e)}` : "")),
  vn = (e, t) => !Object.is(e, t),
  jn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Vn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Ir = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  Cl = (e) => {
    const t = be(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let Ds;
const Nr = () =>
  Ds ||
  (Ds =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function zn(e) {
  if (H(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = be(r) ? Nl(r) : zn(r);
      if (s) for (const o in s) t[o] = s[o];
    }
    return t;
  } else {
    if (be(e)) return e;
    if (le(e)) return e;
  }
}
const Tl = /;(?![^(]*\))/g,
  Ll = /:([^]+)/,
  Il = new RegExp("\\/\\*.*?\\*\\/", "gs");
function Nl(e) {
  const t = {};
  return (
    e
      .replace(Il, "")
      .split(Tl)
      .forEach((n) => {
        if (n) {
          const r = n.split(Ll);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function Sn(e) {
  let t = "";
  if (be(e)) t = e;
  else if (H(e))
    for (let n = 0; n < e.length; n++) {
      const r = Sn(e[n]);
      r && (t += r + " ");
    }
  else if (le(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Sl =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Ol = zr(Sl);
function Zo(e) {
  return !!e || e === "";
}
const Ve = (e) =>
    be(e)
      ? e
      : e == null
      ? ""
      : H(e) || (le(e) && (e.toString === Go || !B(e.toString)))
      ? JSON.stringify(e, zo, 2)
      : String(e),
  zo = (e, t) =>
    t && t.__v_isRef
      ? zo(e, t.value)
      : Yt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, s]) => ((n[`${r} =>`] = s), n),
            {}
          ),
        }
      : qo(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : le(t) && !H(t) && !Jo(t)
      ? String(t)
      : t;
let ke;
class ei {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = ke),
      !t && ke && (this.index = (ke.scopes || (ke.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = ke;
      try {
        return (ke = this), t();
      } finally {
        ke = n;
      }
    }
  }
  on() {
    ke = this;
  }
  off() {
    ke = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function ss(e) {
  return new ei(e);
}
function Al(e, t = ke) {
  t && t.active && t.effects.push(e);
}
function os() {
  return ke;
}
function ti(e) {
  ke && ke.cleanups.push(e);
}
const is = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  ni = (e) => (e.w & Tt) > 0,
  ri = (e) => (e.n & Tt) > 0,
  wl = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Tt;
  },
  xl = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        ni(s) && !ri(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~Tt),
          (s.n &= ~Tt);
      }
      t.length = n;
    }
  },
  Bn = new WeakMap();
let pn = 0,
  Tt = 1;
const Sr = 30;
let Ye;
const Rt = Symbol(""),
  Or = Symbol("");
class ls {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Al(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Ye,
      n = yt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Ye),
        (Ye = this),
        (yt = !0),
        (Tt = 1 << ++pn),
        pn <= Sr ? wl(this) : $s(this),
        this.fn()
      );
    } finally {
      pn <= Sr && xl(this),
        (Tt = 1 << --pn),
        (Ye = this.parent),
        (yt = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Ye === this
      ? (this.deferStop = !0)
      : this.active &&
        ($s(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function $s(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let yt = !0;
const si = [];
function sn() {
  si.push(yt), (yt = !1);
}
function on() {
  const e = si.pop();
  yt = e === void 0 ? !0 : e;
}
function we(e, t, n) {
  if (yt && Ye) {
    let r = Bn.get(e);
    r || Bn.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = is())), oi(s);
  }
}
function oi(e, t) {
  let n = !1;
  pn <= Sr ? ri(e) || ((e.n |= Tt), (n = !ni(e))) : (n = !e.has(Ye)),
    n && (e.add(Ye), Ye.deps.push(e));
}
function ct(e, t, n, r, s, o) {
  const i = Bn.get(e);
  if (!i) return;
  let c = [];
  if (t === "clear") c = [...i.values()];
  else if (n === "length" && H(e)) {
    const a = Number(r);
    i.forEach((f, m) => {
      (m === "length" || m >= a) && c.push(f);
    });
  } else
    switch ((n !== void 0 && c.push(i.get(n)), t)) {
      case "add":
        H(e)
          ? rs(n) && c.push(i.get("length"))
          : (c.push(i.get(Rt)), Yt(e) && c.push(i.get(Or)));
        break;
      case "delete":
        H(e) || (c.push(i.get(Rt)), Yt(e) && c.push(i.get(Or)));
        break;
      case "set":
        Yt(e) && c.push(i.get(Rt));
        break;
    }
  if (c.length === 1) c[0] && Ar(c[0]);
  else {
    const a = [];
    for (const f of c) f && a.push(...f);
    Ar(is(a));
  }
}
function Ar(e, t) {
  const n = H(e) ? e : [...e];
  for (const r of n) r.computed && Us(r);
  for (const r of n) r.computed || Us(r);
}
function Us(e, t) {
  (e !== Ye || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function Pl(e, t) {
  var n;
  return (n = Bn.get(e)) == null ? void 0 : n.get(t);
}
const kl = zr("__proto__,__v_isRef,__isVue"),
  ii = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(ns)
  ),
  Ml = cs(),
  Rl = cs(!1, !0),
  Fl = cs(!0),
  js = Dl();
function Dl() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = G(this);
        for (let o = 0, i = this.length; o < i; o++) we(r, "get", o + "");
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map(G)) : s;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        sn();
        const r = G(this)[t].apply(this, n);
        return on(), r;
      };
    }),
    e
  );
}
function $l(e) {
  const t = G(this);
  return we(t, "has", e), t.hasOwnProperty(e);
}
function cs(e = !1, t = !1) {
  return function (r, s, o) {
    if (s === "__v_isReactive") return !e;
    if (s === "__v_isReadonly") return e;
    if (s === "__v_isShallow") return t;
    if (s === "__v_raw" && o === (e ? (t ? ec : fi) : t ? ui : ai).get(r))
      return r;
    const i = H(r);
    if (!e) {
      if (i && Q(js, s)) return Reflect.get(js, s, o);
      if (s === "hasOwnProperty") return $l;
    }
    const c = Reflect.get(r, s, o);
    return (ns(s) ? ii.has(s) : kl(s)) || (e || we(r, "get", s), t)
      ? c
      : ue(c)
      ? i && rs(s)
        ? c
        : c.value
      : le(c)
      ? e
        ? fs(c)
        : tr(c)
      : c;
  };
}
const Ul = li(),
  jl = li(!0);
function li(e = !1) {
  return function (n, r, s, o) {
    let i = n[r];
    if (Zt(i) && ue(i) && !ue(s)) return !1;
    if (
      !e &&
      (!Kn(s) && !Zt(s) && ((i = G(i)), (s = G(s))), !H(n) && ue(i) && !ue(s))
    )
      return (i.value = s), !0;
    const c = H(n) && rs(r) ? Number(r) < n.length : Q(n, r),
      a = Reflect.set(n, r, s, o);
    return (
      n === G(o) && (c ? vn(s, i) && ct(n, "set", r, s) : ct(n, "add", r, s)), a
    );
  };
}
function Wl(e, t) {
  const n = Q(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && ct(e, "delete", t, void 0), r;
}
function Hl(e, t) {
  const n = Reflect.has(e, t);
  return (!ns(t) || !ii.has(t)) && we(e, "has", t), n;
}
function Vl(e) {
  return we(e, "iterate", H(e) ? "length" : Rt), Reflect.ownKeys(e);
}
const ci = { get: Ml, set: Ul, deleteProperty: Wl, has: Hl, ownKeys: Vl },
  Bl = {
    get: Fl,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Kl = ge({}, ci, { get: Rl, set: jl }),
  as = (e) => e,
  er = (e) => Reflect.getPrototypeOf(e);
function Pn(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = G(e),
    o = G(t);
  n || (t !== o && we(s, "get", t), we(s, "get", o));
  const { has: i } = er(s),
    c = r ? as : n ? ps : yn;
  if (i.call(s, t)) return c(e.get(t));
  if (i.call(s, o)) return c(e.get(o));
  e !== s && e.get(t);
}
function kn(e, t = !1) {
  const n = this.__v_raw,
    r = G(n),
    s = G(e);
  return (
    t || (e !== s && we(r, "has", e), we(r, "has", s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function Mn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && we(G(e), "iterate", Rt), Reflect.get(e, "size", e)
  );
}
function Ws(e) {
  e = G(e);
  const t = G(this);
  return er(t).has.call(t, e) || (t.add(e), ct(t, "add", e, e)), this;
}
function Hs(e, t) {
  t = G(t);
  const n = G(this),
    { has: r, get: s } = er(n);
  let o = r.call(n, e);
  o || ((e = G(e)), (o = r.call(n, e)));
  const i = s.call(n, e);
  return (
    n.set(e, t), o ? vn(t, i) && ct(n, "set", e, t) : ct(n, "add", e, t), this
  );
}
function Vs(e) {
  const t = G(this),
    { has: n, get: r } = er(t);
  let s = n.call(t, e);
  s || ((e = G(e)), (s = n.call(t, e))), r && r.call(t, e);
  const o = t.delete(e);
  return s && ct(t, "delete", e, void 0), o;
}
function Bs() {
  const e = G(this),
    t = e.size !== 0,
    n = e.clear();
  return t && ct(e, "clear", void 0, void 0), n;
}
function Rn(e, t) {
  return function (r, s) {
    const o = this,
      i = o.__v_raw,
      c = G(i),
      a = t ? as : e ? ps : yn;
    return (
      !e && we(c, "iterate", Rt), i.forEach((f, m) => r.call(s, a(f), a(m), o))
    );
  };
}
function Fn(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      o = G(s),
      i = Yt(o),
      c = e === "entries" || (e === Symbol.iterator && i),
      a = e === "keys" && i,
      f = s[e](...r),
      m = n ? as : t ? ps : yn;
    return (
      !t && we(o, "iterate", a ? Or : Rt),
      {
        next() {
          const { value: _, done: h } = f.next();
          return h
            ? { value: _, done: h }
            : { value: c ? [m(_[0]), m(_[1])] : m(_), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function mt(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Xl() {
  const e = {
      get(o) {
        return Pn(this, o);
      },
      get size() {
        return Mn(this);
      },
      has: kn,
      add: Ws,
      set: Hs,
      delete: Vs,
      clear: Bs,
      forEach: Rn(!1, !1),
    },
    t = {
      get(o) {
        return Pn(this, o, !1, !0);
      },
      get size() {
        return Mn(this);
      },
      has: kn,
      add: Ws,
      set: Hs,
      delete: Vs,
      clear: Bs,
      forEach: Rn(!1, !0),
    },
    n = {
      get(o) {
        return Pn(this, o, !0);
      },
      get size() {
        return Mn(this, !0);
      },
      has(o) {
        return kn.call(this, o, !0);
      },
      add: mt("add"),
      set: mt("set"),
      delete: mt("delete"),
      clear: mt("clear"),
      forEach: Rn(!0, !1),
    },
    r = {
      get(o) {
        return Pn(this, o, !0, !0);
      },
      get size() {
        return Mn(this, !0);
      },
      has(o) {
        return kn.call(this, o, !0);
      },
      add: mt("add"),
      set: mt("set"),
      delete: mt("delete"),
      clear: mt("clear"),
      forEach: Rn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = Fn(o, !1, !1)),
        (n[o] = Fn(o, !0, !1)),
        (t[o] = Fn(o, !1, !0)),
        (r[o] = Fn(o, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [ql, Yl, Gl, Jl] = Xl();
function us(e, t) {
  const n = t ? (e ? Jl : Gl) : e ? Yl : ql;
  return (r, s, o) =>
    s === "__v_isReactive"
      ? !e
      : s === "__v_isReadonly"
      ? e
      : s === "__v_raw"
      ? r
      : Reflect.get(Q(n, s) && s in r ? n : r, s, o);
}
const Ql = { get: us(!1, !1) },
  Zl = { get: us(!1, !0) },
  zl = { get: us(!0, !1) },
  ai = new WeakMap(),
  ui = new WeakMap(),
  fi = new WeakMap(),
  ec = new WeakMap();
function tc(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function nc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : tc(vl(e));
}
function tr(e) {
  return Zt(e) ? e : ds(e, !1, ci, Ql, ai);
}
function rc(e) {
  return ds(e, !1, Kl, Zl, ui);
}
function fs(e) {
  return ds(e, !0, Bl, zl, fi);
}
function ds(e, t, n, r, s) {
  if (!le(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = s.get(e);
  if (o) return o;
  const i = nc(e);
  if (i === 0) return e;
  const c = new Proxy(e, i === 2 ? r : n);
  return s.set(e, c), c;
}
function Et(e) {
  return Zt(e) ? Et(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Zt(e) {
  return !!(e && e.__v_isReadonly);
}
function Kn(e) {
  return !!(e && e.__v_isShallow);
}
function di(e) {
  return Et(e) || Zt(e);
}
function G(e) {
  const t = e && e.__v_raw;
  return t ? G(t) : e;
}
function zt(e) {
  return Vn(e, "__v_skip", !0), e;
}
const yn = (e) => (le(e) ? tr(e) : e),
  ps = (e) => (le(e) ? fs(e) : e);
function ms(e) {
  yt && Ye && ((e = G(e)), oi(e.dep || (e.dep = is())));
}
function _s(e, t) {
  e = G(e);
  const n = e.dep;
  n && Ar(n);
}
function ue(e) {
  return !!(e && e.__v_isRef === !0);
}
function re(e) {
  return sc(e, !1);
}
function sc(e, t) {
  return ue(e) ? e : new oc(e, t);
}
class oc {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : G(t)),
      (this._value = n ? t : yn(t));
  }
  get value() {
    return ms(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Kn(t) || Zt(t);
    (t = n ? t : G(t)),
      vn(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : yn(t)), _s(this));
  }
}
function $t(e) {
  return ue(e) ? e.value : e;
}
const ic = {
  get: (e, t, n) => $t(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return ue(s) && !ue(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function pi(e) {
  return Et(e) ? e : new Proxy(e, ic);
}
class lc {
  constructor(t) {
    (this.dep = void 0), (this.__v_isRef = !0);
    const { get: n, set: r } = t(
      () => ms(this),
      () => _s(this)
    );
    (this._get = n), (this._set = r);
  }
  get value() {
    return this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function cc(e) {
  return new lc(e);
}
function ac(e) {
  const t = H(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = mi(e, n);
  return t;
}
class uc {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Pl(G(this._object), this._key);
  }
}
class fc {
  constructor(t) {
    (this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0);
  }
  get value() {
    return this._getter();
  }
}
function dc(e, t, n) {
  return ue(e)
    ? e
    : B(e)
    ? new fc(e)
    : le(e) && arguments.length > 1
    ? mi(e, t, n)
    : re(e);
}
function mi(e, t, n) {
  const r = e[t];
  return ue(r) ? r : new uc(e, t, n);
}
class pc {
  constructor(t, n, r, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new ls(t, () => {
        this._dirty || ((this._dirty = !0), _s(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = G(this);
    return (
      ms(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function mc(e, t, n = !1) {
  let r, s;
  const o = B(e);
  return (
    o ? ((r = e), (s = Je)) : ((r = e.get), (s = e.set)),
    new pc(r, s, o || !s, n)
  );
}
function Ct(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (o) {
    nr(o, t, n);
  }
  return s;
}
function Be(e, t, n, r) {
  if (B(e)) {
    const o = Ct(e, t, n, r);
    return (
      o &&
        Yo(o) &&
        o.catch((i) => {
          nr(i, t, n);
        }),
      o
    );
  }
  const s = [];
  for (let o = 0; o < e.length; o++) s.push(Be(e[o], t, n, r));
  return s;
}
function nr(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      c = n;
    for (; o; ) {
      const f = o.ec;
      if (f) {
        for (let m = 0; m < f.length; m++) if (f[m](e, i, c) === !1) return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      Ct(a, null, 10, [e, i, c]);
      return;
    }
  }
  _c(e, n, s, r);
}
function _c(e, t, n, r = !0) {
  console.error(e);
}
let En = !1,
  wr = !1;
const Te = [];
let rt = 0;
const Gt = [];
let lt = null,
  xt = 0;
const _i = Promise.resolve();
let hs = null;
function gs(e) {
  const t = hs || _i;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function hc(e) {
  let t = rt + 1,
    n = Te.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    Cn(Te[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function bs(e) {
  (!Te.length || !Te.includes(e, En && e.allowRecurse ? rt + 1 : rt)) &&
    (e.id == null ? Te.push(e) : Te.splice(hc(e.id), 0, e), hi());
}
function hi() {
  !En && !wr && ((wr = !0), (hs = _i.then(bi)));
}
function gc(e) {
  const t = Te.indexOf(e);
  t > rt && Te.splice(t, 1);
}
function bc(e) {
  H(e)
    ? Gt.push(...e)
    : (!lt || !lt.includes(e, e.allowRecurse ? xt + 1 : xt)) && Gt.push(e),
    hi();
}
function Ks(e, t = En ? rt + 1 : 0) {
  for (; t < Te.length; t++) {
    const n = Te[t];
    n && n.pre && (Te.splice(t, 1), t--, n());
  }
}
function gi(e) {
  if (Gt.length) {
    const t = [...new Set(Gt)];
    if (((Gt.length = 0), lt)) {
      lt.push(...t);
      return;
    }
    for (lt = t, lt.sort((n, r) => Cn(n) - Cn(r)), xt = 0; xt < lt.length; xt++)
      lt[xt]();
    (lt = null), (xt = 0);
  }
}
const Cn = (e) => (e.id == null ? 1 / 0 : e.id),
  vc = (e, t) => {
    const n = Cn(e) - Cn(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function bi(e) {
  (wr = !1), (En = !0), Te.sort(vc);
  const t = Je;
  try {
    for (rt = 0; rt < Te.length; rt++) {
      const n = Te[rt];
      n && n.active !== !1 && Ct(n, null, 14);
    }
  } finally {
    (rt = 0),
      (Te.length = 0),
      gi(),
      (En = !1),
      (hs = null),
      (Te.length || Gt.length) && bi();
  }
}
function yc(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ce;
  let s = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in r) {
    const m = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: _, trim: h } = r[m] || ce;
    h && (s = n.map((L) => (be(L) ? L.trim() : L))), _ && (s = n.map(Ir));
  }
  let c,
    a = r[(c = mr(t))] || r[(c = mr(Qt(t)))];
  !a && o && (a = r[(c = mr(rn(t)))]), a && Be(a, e, 6, s);
  const f = r[c + "Once"];
  if (f) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[c]) return;
    (e.emitted[c] = !0), Be(f, e, 6, s);
  }
}
function vi(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const o = e.emits;
  let i = {},
    c = !1;
  if (!B(e)) {
    const a = (f) => {
      const m = vi(f, t, !0);
      m && ((c = !0), ge(i, m));
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  return !o && !c
    ? (le(e) && r.set(e, null), null)
    : (H(o) ? o.forEach((a) => (i[a] = null)) : ge(i, o),
      le(e) && r.set(e, i),
      i);
}
function rr(e, t) {
  return !e || !Jn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      Q(e, t[0].toLowerCase() + t.slice(1)) || Q(e, rn(t)) || Q(e, t));
}
let He = null,
  sr = null;
function Xn(e) {
  const t = He;
  return (He = e), (sr = (e && e.type.__scopeId) || null), t;
}
function On(e) {
  sr = e;
}
function An() {
  sr = null;
}
function yi(e, t = He, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && no(-1);
    const o = Xn(t);
    let i;
    try {
      i = e(...s);
    } finally {
      Xn(o), r._d && no(1);
    }
    return i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function _r(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: o,
    propsOptions: [i],
    slots: c,
    attrs: a,
    emit: f,
    render: m,
    renderCache: _,
    data: h,
    setupState: L,
    ctx: k,
    inheritAttrs: S,
  } = e;
  let M, b;
  const I = Xn(e);
  try {
    if (n.shapeFlag & 4) {
      const y = s || r;
      (M = nt(m.call(y, y, _, o, L, h, k))), (b = a);
    } else {
      const y = t;
      (M = nt(
        y.length > 1 ? y(o, { attrs: a, slots: c, emit: f }) : y(o, null)
      )),
        (b = t.props ? a : Ec(a));
    }
  } catch (y) {
    (hn.length = 0), nr(y, e, 1), (M = oe(Qe));
  }
  let A = M;
  if (b && S !== !1) {
    const y = Object.keys(b),
      { shapeFlag: C } = A;
    y.length && C & 7 && (i && y.some(es) && (b = Cc(b, i)), (A = Lt(A, b)));
  }
  return (
    n.dirs && ((A = Lt(A)), (A.dirs = A.dirs ? A.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (A.transition = n.transition),
    (M = A),
    Xn(I),
    M
  );
}
const Ec = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Jn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Cc = (e, t) => {
    const n = {};
    for (const r in e) (!es(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function Tc(e, t, n) {
  const { props: r, children: s, component: o } = e,
    { props: i, children: c, patchFlag: a } = t,
    f = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return r ? Xs(r, i, f) : !!i;
    if (a & 8) {
      const m = t.dynamicProps;
      for (let _ = 0; _ < m.length; _++) {
        const h = m[_];
        if (i[h] !== r[h] && !rr(f, h)) return !0;
      }
    }
  } else
    return (s || c) && (!c || !c.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? Xs(r, i, f)
        : !0
      : !!i;
  return !1;
}
function Xs(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (t[o] !== e[o] && !rr(n, o)) return !0;
  }
  return !1;
}
function Lc({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Ic = (e) => e.__isSuspense;
function Nc(e, t) {
  t && t.pendingBranch
    ? H(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : bc(e);
}
function Sc(e, t) {
  return vs(e, null, t);
}
const Dn = {};
function Me(e, t, n) {
  return vs(e, t, n);
}
function vs(
  e,
  t,
  { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i } = ce
) {
  var c;
  const a = os() === ((c = Ee) == null ? void 0 : c.scope) ? Ee : null;
  let f,
    m = !1,
    _ = !1;
  if (
    (ue(e)
      ? ((f = () => e.value), (m = Kn(e)))
      : Et(e)
      ? ((f = () => e), (r = !0))
      : H(e)
      ? ((_ = !0),
        (m = e.some((y) => Et(y) || Kn(y))),
        (f = () =>
          e.map((y) => {
            if (ue(y)) return y.value;
            if (Et(y)) return Mt(y);
            if (B(y)) return Ct(y, a, 2);
          })))
      : B(e)
      ? t
        ? (f = () => Ct(e, a, 2))
        : (f = () => {
            if (!(a && a.isUnmounted)) return h && h(), Be(e, a, 3, [L]);
          })
      : (f = Je),
    t && r)
  ) {
    const y = f;
    f = () => Mt(y());
  }
  let h,
    L = (y) => {
      h = I.onStop = () => {
        Ct(y, a, 4);
      };
    },
    k;
  if (In)
    if (
      ((L = Je),
      t ? n && Be(t, a, 3, [f(), _ ? [] : void 0, L]) : f(),
      s === "sync")
    ) {
      const y = ya();
      k = y.__watcherHandles || (y.__watcherHandles = []);
    } else return Je;
  let S = _ ? new Array(e.length).fill(Dn) : Dn;
  const M = () => {
    if (I.active)
      if (t) {
        const y = I.run();
        (r || m || (_ ? y.some((C, F) => vn(C, S[F])) : vn(y, S))) &&
          (h && h(),
          Be(t, a, 3, [y, S === Dn ? void 0 : _ && S[0] === Dn ? [] : S, L]),
          (S = y));
      } else I.run();
  };
  M.allowRecurse = !!t;
  let b;
  s === "sync"
    ? (b = M)
    : s === "post"
    ? (b = () => Ae(M, a && a.suspense))
    : ((M.pre = !0), a && (M.id = a.uid), (b = () => bs(M)));
  const I = new ls(f, b);
  t
    ? n
      ? M()
      : (S = I.run())
    : s === "post"
    ? Ae(I.run.bind(I), a && a.suspense)
    : I.run();
  const A = () => {
    I.stop(), a && a.scope && ts(a.scope.effects, I);
  };
  return k && k.push(A), A;
}
function Oc(e, t, n) {
  const r = this.proxy,
    s = be(e) ? (e.includes(".") ? Ei(r, e) : () => r[e]) : e.bind(r, r);
  let o;
  B(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = Ee;
  tn(this);
  const c = vs(s, o.bind(r), n);
  return i ? tn(i) : Ft(), c;
}
function Ei(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function Mt(e, t) {
  if (!le(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ue(e))) Mt(e.value, t);
  else if (H(e)) for (let n = 0; n < e.length; n++) Mt(e[n], t);
  else if (qo(e) || Yt(e))
    e.forEach((n) => {
      Mt(n, t);
    });
  else if (Jo(e)) for (const n in e) Mt(e[n], t);
  return e;
}
function hr(e, t) {
  const n = He;
  if (n === null) return e;
  const r = cr(n) || n.proxy,
    s = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, c, a, f = ce] = t[o];
    i &&
      (B(i) && (i = { mounted: i, updated: i }),
      i.deep && Mt(c),
      s.push({
        dir: i,
        instance: r,
        value: c,
        oldValue: void 0,
        arg: a,
        modifiers: f,
      }));
  }
  return e;
}
function St(e, t, n, r) {
  const s = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    o && (c.oldValue = o[i].value);
    let a = c.dir[r];
    a && (sn(), Be(a, n, 8, [e.el, c, e, t]), on());
  }
}
function Ac() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    ut(() => {
      e.isMounted = !0;
    }),
    Ni(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const je = [Function, Array],
  Ci = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: je,
    onEnter: je,
    onAfterEnter: je,
    onEnterCancelled: je,
    onBeforeLeave: je,
    onLeave: je,
    onAfterLeave: je,
    onLeaveCancelled: je,
    onBeforeAppear: je,
    onAppear: je,
    onAfterAppear: je,
    onAppearCancelled: je,
  },
  wc = {
    name: "BaseTransition",
    props: Ci,
    setup(e, { slots: t }) {
      const n = ln(),
        r = Ac();
      let s;
      return () => {
        const o = t.default && Li(t.default(), !0);
        if (!o || !o.length) return;
        let i = o[0];
        if (o.length > 1) {
          for (const S of o)
            if (S.type !== Qe) {
              i = S;
              break;
            }
        }
        const c = G(e),
          { mode: a } = c;
        if (r.isLeaving) return gr(i);
        const f = qs(i);
        if (!f) return gr(i);
        const m = xr(f, c, r, n);
        Pr(f, m);
        const _ = n.subTree,
          h = _ && qs(_);
        let L = !1;
        const { getTransitionKey: k } = f.type;
        if (k) {
          const S = k();
          s === void 0 ? (s = S) : S !== s && ((s = S), (L = !0));
        }
        if (h && h.type !== Qe && (!Pt(f, h) || L)) {
          const S = xr(h, c, r, n);
          if ((Pr(h, S), a === "out-in"))
            return (
              (r.isLeaving = !0),
              (S.afterLeave = () => {
                (r.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              gr(i)
            );
          a === "in-out" &&
            f.type !== Qe &&
            (S.delayLeave = (M, b, I) => {
              const A = Ti(r, h);
              (A[String(h.key)] = h),
                (M._leaveCb = () => {
                  b(), (M._leaveCb = void 0), delete m.delayedLeave;
                }),
                (m.delayedLeave = I);
            });
        }
        return i;
      };
    },
  },
  xc = wc;
function Ti(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function xr(e, t, n, r) {
  const {
      appear: s,
      mode: o,
      persisted: i = !1,
      onBeforeEnter: c,
      onEnter: a,
      onAfterEnter: f,
      onEnterCancelled: m,
      onBeforeLeave: _,
      onLeave: h,
      onAfterLeave: L,
      onLeaveCancelled: k,
      onBeforeAppear: S,
      onAppear: M,
      onAfterAppear: b,
      onAppearCancelled: I,
    } = t,
    A = String(e.key),
    y = Ti(n, e),
    C = (R, W) => {
      R && Be(R, r, 9, W);
    },
    F = (R, W) => {
      const V = W[1];
      C(R, W),
        H(R) ? R.every((X) => X.length <= 1) && V() : R.length <= 1 && V();
    },
    P = {
      mode: o,
      persisted: i,
      beforeEnter(R) {
        let W = c;
        if (!n.isMounted)
          if (s) W = S || c;
          else return;
        R._leaveCb && R._leaveCb(!0);
        const V = y[A];
        V && Pt(e, V) && V.el._leaveCb && V.el._leaveCb(), C(W, [R]);
      },
      enter(R) {
        let W = a,
          V = f,
          X = m;
        if (!n.isMounted)
          if (s) (W = M || a), (V = b || f), (X = I || m);
          else return;
        let $ = !1;
        const J = (R._enterCb = (ae) => {
          $ ||
            (($ = !0),
            ae ? C(X, [R]) : C(V, [R]),
            P.delayedLeave && P.delayedLeave(),
            (R._enterCb = void 0));
        });
        W ? F(W, [R, J]) : J();
      },
      leave(R, W) {
        const V = String(e.key);
        if ((R._enterCb && R._enterCb(!0), n.isUnmounting)) return W();
        C(_, [R]);
        let X = !1;
        const $ = (R._leaveCb = (J) => {
          X ||
            ((X = !0),
            W(),
            J ? C(k, [R]) : C(L, [R]),
            (R._leaveCb = void 0),
            y[V] === e && delete y[V]);
        });
        (y[V] = e), h ? F(h, [R, $]) : $();
      },
      clone(R) {
        return xr(R, t, n, r);
      },
    };
  return P;
}
function gr(e) {
  if (or(e)) return (e = Lt(e)), (e.children = null), e;
}
function qs(e) {
  return or(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Pr(e, t) {
  e.shapeFlag & 6 && e.component
    ? Pr(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function Li(e, t = !1, n) {
  let r = [],
    s = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const c = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
    i.type === Ce
      ? (i.patchFlag & 128 && s++, (r = r.concat(Li(i.children, t, c))))
      : (t || i.type !== Qe) && r.push(c != null ? Lt(i, { key: c }) : i);
  }
  if (s > 1) for (let o = 0; o < r.length; o++) r[o].patchFlag = -2;
  return r;
}
function Xe(e, t) {
  return B(e) ? (() => ge({ name: e.name }, t, { setup: e }))() : e;
}
const Wn = (e) => !!e.type.__asyncLoader,
  or = (e) => e.type.__isKeepAlive;
function Pc(e, t) {
  Ii(e, "a", t);
}
function kc(e, t) {
  Ii(e, "da", t);
}
function Ii(e, t, n = Ee) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((ir(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      or(s.parent.vnode) && Mc(r, t, n, s), (s = s.parent);
  }
}
function Mc(e, t, n, r) {
  const s = ir(t, e, r, !0);
  ys(() => {
    ts(r[t], s);
  }, n);
}
function ir(e, t, n = Ee, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          sn(), tn(n);
          const c = Be(t, n, e, i);
          return Ft(), on(), c;
        });
    return r ? s.unshift(o) : s.push(o), o;
  }
}
const at =
    (e) =>
    (t, n = Ee) =>
      (!In || e === "sp") && ir(e, (...r) => t(...r), n),
  Rc = at("bm"),
  ut = at("m"),
  Fc = at("bu"),
  Dc = at("u"),
  Ni = at("bum"),
  ys = at("um"),
  $c = at("sp"),
  Uc = at("rtg"),
  jc = at("rtc");
function Wc(e, t = Ee) {
  ir("ec", e, t);
}
const Hc = Symbol.for("v-ndc");
function Tn(e, t, n, r) {
  let s;
  const o = n && n[r];
  if (H(e) || be(e)) {
    s = new Array(e.length);
    for (let i = 0, c = e.length; i < c; i++)
      s[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let i = 0; i < e; i++) s[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (le(e))
    if (e[Symbol.iterator])
      s = Array.from(e, (i, c) => t(i, c, void 0, o && o[c]));
    else {
      const i = Object.keys(e);
      s = new Array(i.length);
      for (let c = 0, a = i.length; c < a; c++) {
        const f = i[c];
        s[c] = t(e[f], f, c, o && o[c]);
      }
    }
  else s = [];
  return n && (n[r] = s), s;
}
const kr = (e) => (e ? ($i(e) ? cr(e) || e.proxy : kr(e.parent)) : null),
  _n = ge(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => kr(e.parent),
    $root: (e) => kr(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Es(e),
    $forceUpdate: (e) => e.f || (e.f = () => bs(e.update)),
    $nextTick: (e) => e.n || (e.n = gs.bind(e.proxy)),
    $watch: (e) => Oc.bind(e),
  }),
  br = (e, t) => e !== ce && !e.__isScriptSetup && Q(e, t),
  Vc = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: o,
        accessCache: i,
        type: c,
        appContext: a,
      } = e;
      let f;
      if (t[0] !== "$") {
        const L = i[t];
        if (L !== void 0)
          switch (L) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (br(r, t)) return (i[t] = 1), r[t];
          if (s !== ce && Q(s, t)) return (i[t] = 2), s[t];
          if ((f = e.propsOptions[0]) && Q(f, t)) return (i[t] = 3), o[t];
          if (n !== ce && Q(n, t)) return (i[t] = 4), n[t];
          Mr && (i[t] = 0);
        }
      }
      const m = _n[t];
      let _, h;
      if (m) return t === "$attrs" && we(e, "get", t), m(e);
      if ((_ = c.__cssModules) && (_ = _[t])) return _;
      if (n !== ce && Q(n, t)) return (i[t] = 4), n[t];
      if (((h = a.config.globalProperties), Q(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: o } = e;
      return br(s, t)
        ? ((s[t] = n), !0)
        : r !== ce && Q(r, t)
        ? ((r[t] = n), !0)
        : Q(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: o,
        },
      },
      i
    ) {
      let c;
      return (
        !!n[i] ||
        (e !== ce && Q(e, i)) ||
        br(t, i) ||
        ((c = o[0]) && Q(c, i)) ||
        Q(r, i) ||
        Q(_n, i) ||
        Q(s.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : Q(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Ys(e) {
  return H(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Mr = !0;
function Bc(e) {
  const t = Es(e),
    n = e.proxy,
    r = e.ctx;
  (Mr = !1), t.beforeCreate && Gs(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: o,
    methods: i,
    watch: c,
    provide: a,
    inject: f,
    created: m,
    beforeMount: _,
    mounted: h,
    beforeUpdate: L,
    updated: k,
    activated: S,
    deactivated: M,
    beforeDestroy: b,
    beforeUnmount: I,
    destroyed: A,
    unmounted: y,
    render: C,
    renderTracked: F,
    renderTriggered: P,
    errorCaptured: R,
    serverPrefetch: W,
    expose: V,
    inheritAttrs: X,
    components: $,
    directives: J,
    filters: ae,
  } = t;
  if ((f && Kc(f, r, null), i))
    for (const z in i) {
      const te = i[z];
      B(te) && (r[z] = te.bind(n));
    }
  if (s) {
    const z = s.call(n, n);
    le(z) && (e.data = tr(z));
  }
  if (((Mr = !0), o))
    for (const z in o) {
      const te = o[z],
        De = B(te) ? te.bind(n, n) : B(te.get) ? te.get.bind(n, n) : Je,
        ft = !B(te) && B(te.set) ? te.set.bind(n) : Je,
        qe = We({ get: De, set: ft });
      Object.defineProperty(r, z, {
        enumerable: !0,
        configurable: !0,
        get: () => qe.value,
        set: (Se) => (qe.value = Se),
      });
    }
  if (c) for (const z in c) Si(c[z], r, n, z);
  if (a) {
    const z = B(a) ? a.call(n) : a;
    Reflect.ownKeys(z).forEach((te) => {
      Qc(te, z[te]);
    });
  }
  m && Gs(m, e, "c");
  function pe(z, te) {
    H(te) ? te.forEach((De) => z(De.bind(n))) : te && z(te.bind(n));
  }
  if (
    (pe(Rc, _),
    pe(ut, h),
    pe(Fc, L),
    pe(Dc, k),
    pe(Pc, S),
    pe(kc, M),
    pe(Wc, R),
    pe(jc, F),
    pe(Uc, P),
    pe(Ni, I),
    pe(ys, y),
    pe($c, W),
    H(V))
  )
    if (V.length) {
      const z = e.exposed || (e.exposed = {});
      V.forEach((te) => {
        Object.defineProperty(z, te, {
          get: () => n[te],
          set: (De) => (n[te] = De),
        });
      });
    } else e.exposed || (e.exposed = {});
  C && e.render === Je && (e.render = C),
    X != null && (e.inheritAttrs = X),
    $ && (e.components = $),
    J && (e.directives = J);
}
function Kc(e, t, n = Je) {
  H(e) && (e = Rr(e));
  for (const r in e) {
    const s = e[r];
    let o;
    le(s)
      ? "default" in s
        ? (o = Jt(s.from || r, s.default, !0))
        : (o = Jt(s.from || r))
      : (o = Jt(s)),
      ue(o)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[r] = o);
  }
}
function Gs(e, t, n) {
  Be(H(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Si(e, t, n, r) {
  const s = r.includes(".") ? Ei(n, r) : () => n[r];
  if (be(e)) {
    const o = t[e];
    B(o) && Me(s, o);
  } else if (B(e)) Me(s, e.bind(n));
  else if (le(e))
    if (H(e)) e.forEach((o) => Si(o, t, n, r));
    else {
      const o = B(e.handler) ? e.handler.bind(n) : t[e.handler];
      B(o) && Me(s, o, e);
    }
}
function Es(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    c = o.get(t);
  let a;
  return (
    c
      ? (a = c)
      : !s.length && !n && !r
      ? (a = t)
      : ((a = {}), s.length && s.forEach((f) => qn(a, f, i, !0)), qn(a, t, i)),
    le(t) && o.set(t, a),
    a
  );
}
function qn(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && qn(e, o, n, !0), s && s.forEach((i) => qn(e, i, n, !0));
  for (const i in t)
    if (!(r && i === "expose")) {
      const c = Xc[i] || (n && n[i]);
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Xc = {
  data: Js,
  props: Qs,
  emits: Qs,
  methods: mn,
  computed: mn,
  beforeCreate: Ie,
  created: Ie,
  beforeMount: Ie,
  mounted: Ie,
  beforeUpdate: Ie,
  updated: Ie,
  beforeDestroy: Ie,
  beforeUnmount: Ie,
  destroyed: Ie,
  unmounted: Ie,
  activated: Ie,
  deactivated: Ie,
  errorCaptured: Ie,
  serverPrefetch: Ie,
  components: mn,
  directives: mn,
  watch: Yc,
  provide: Js,
  inject: qc,
};
function Js(e, t) {
  return t
    ? e
      ? function () {
          return ge(
            B(e) ? e.call(this, this) : e,
            B(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function qc(e, t) {
  return mn(Rr(e), Rr(t));
}
function Rr(e) {
  if (H(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ie(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function mn(e, t) {
  return e ? ge(Object.create(null), e, t) : t;
}
function Qs(e, t) {
  return e
    ? H(e) && H(t)
      ? [...new Set([...e, ...t])]
      : ge(Object.create(null), Ys(e), Ys(t ?? {}))
    : t;
}
function Yc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ge(Object.create(null), e);
  for (const r in t) n[r] = Ie(e[r], t[r]);
  return n;
}
function Oi() {
  return {
    app: null,
    config: {
      isNativeTag: hl,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Gc = 0;
function Jc(e, t) {
  return function (r, s = null) {
    B(r) || (r = ge({}, r)), s != null && !le(s) && (s = null);
    const o = Oi(),
      i = new Set();
    let c = !1;
    const a = (o.app = {
      _uid: Gc++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: Ea,
      get config() {
        return o.config;
      },
      set config(f) {},
      use(f, ...m) {
        return (
          i.has(f) ||
            (f && B(f.install)
              ? (i.add(f), f.install(a, ...m))
              : B(f) && (i.add(f), f(a, ...m))),
          a
        );
      },
      mixin(f) {
        return o.mixins.includes(f) || o.mixins.push(f), a;
      },
      component(f, m) {
        return m ? ((o.components[f] = m), a) : o.components[f];
      },
      directive(f, m) {
        return m ? ((o.directives[f] = m), a) : o.directives[f];
      },
      mount(f, m, _) {
        if (!c) {
          const h = oe(r, s);
          return (
            (h.appContext = o),
            m && t ? t(h, f) : e(h, f, _),
            (c = !0),
            (a._container = f),
            (f.__vue_app__ = a),
            cr(h.component) || h.component.proxy
          );
        }
      },
      unmount() {
        c && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(f, m) {
        return (o.provides[f] = m), a;
      },
      runWithContext(f) {
        Yn = a;
        try {
          return f();
        } finally {
          Yn = null;
        }
      },
    });
    return a;
  };
}
let Yn = null;
function Qc(e, t) {
  if (Ee) {
    let n = Ee.provides;
    const r = Ee.parent && Ee.parent.provides;
    r === n && (n = Ee.provides = Object.create(r)), (n[e] = t);
  }
}
function Jt(e, t, n = !1) {
  const r = Ee || He;
  if (r || Yn) {
    const s = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : Yn._context.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && B(t) ? t.call(r && r.proxy) : t;
  }
}
function Zc(e, t, n, r = !1) {
  const s = {},
    o = {};
  Vn(o, lr, 1), (e.propsDefaults = Object.create(null)), Ai(e, t, s, o);
  for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
  n ? (e.props = r ? s : rc(s)) : e.type.props ? (e.props = s) : (e.props = o),
    (e.attrs = o);
}
function zc(e, t, n, r) {
  const {
      props: s,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    c = G(s),
    [a] = e.propsOptions;
  let f = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const m = e.vnode.dynamicProps;
      for (let _ = 0; _ < m.length; _++) {
        let h = m[_];
        if (rr(e.emitsOptions, h)) continue;
        const L = t[h];
        if (a)
          if (Q(o, h)) L !== o[h] && ((o[h] = L), (f = !0));
          else {
            const k = Qt(h);
            s[k] = Fr(a, c, k, L, e, !1);
          }
        else L !== o[h] && ((o[h] = L), (f = !0));
      }
    }
  } else {
    Ai(e, t, s, o) && (f = !0);
    let m;
    for (const _ in c)
      (!t || (!Q(t, _) && ((m = rn(_)) === _ || !Q(t, m)))) &&
        (a
          ? n &&
            (n[_] !== void 0 || n[m] !== void 0) &&
            (s[_] = Fr(a, c, _, void 0, e, !0))
          : delete s[_]);
    if (o !== c) for (const _ in o) (!t || !Q(t, _)) && (delete o[_], (f = !0));
  }
  f && ct(e, "set", "$attrs");
}
function Ai(e, t, n, r) {
  const [s, o] = e.propsOptions;
  let i = !1,
    c;
  if (t)
    for (let a in t) {
      if (Un(a)) continue;
      const f = t[a];
      let m;
      s && Q(s, (m = Qt(a)))
        ? !o || !o.includes(m)
          ? (n[m] = f)
          : ((c || (c = {}))[m] = f)
        : rr(e.emitsOptions, a) ||
          ((!(a in r) || f !== r[a]) && ((r[a] = f), (i = !0)));
    }
  if (o) {
    const a = G(n),
      f = c || ce;
    for (let m = 0; m < o.length; m++) {
      const _ = o[m];
      n[_] = Fr(s, a, _, f[_], e, !Q(f, _));
    }
  }
  return i;
}
function Fr(e, t, n, r, s, o) {
  const i = e[n];
  if (i != null) {
    const c = Q(i, "default");
    if (c && r === void 0) {
      const a = i.default;
      if (i.type !== Function && !i.skipFactory && B(a)) {
        const { propsDefaults: f } = s;
        n in f ? (r = f[n]) : (tn(s), (r = f[n] = a.call(null, t)), Ft());
      } else r = a;
    }
    i[0] &&
      (o && !c ? (r = !1) : i[1] && (r === "" || r === rn(n)) && (r = !0));
  }
  return r;
}
function wi(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const o = e.props,
    i = {},
    c = [];
  let a = !1;
  if (!B(e)) {
    const m = (_) => {
      a = !0;
      const [h, L] = wi(_, t, !0);
      ge(i, h), L && c.push(...L);
    };
    !n && t.mixins.length && t.mixins.forEach(m),
      e.extends && m(e.extends),
      e.mixins && e.mixins.forEach(m);
  }
  if (!o && !a) return le(e) && r.set(e, qt), qt;
  if (H(o))
    for (let m = 0; m < o.length; m++) {
      const _ = Qt(o[m]);
      Zs(_) && (i[_] = ce);
    }
  else if (o)
    for (const m in o) {
      const _ = Qt(m);
      if (Zs(_)) {
        const h = o[m],
          L = (i[_] = H(h) || B(h) ? { type: h } : ge({}, h));
        if (L) {
          const k = to(Boolean, L.type),
            S = to(String, L.type);
          (L[0] = k > -1),
            (L[1] = S < 0 || k < S),
            (k > -1 || Q(L, "default")) && c.push(_);
        }
      }
    }
  const f = [i, c];
  return le(e) && r.set(e, f), f;
}
function Zs(e) {
  return e[0] !== "$";
}
function zs(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function eo(e, t) {
  return zs(e) === zs(t);
}
function to(e, t) {
  return H(t) ? t.findIndex((n) => eo(n, e)) : B(t) && eo(t, e) ? 0 : -1;
}
const xi = (e) => e[0] === "_" || e === "$stable",
  Cs = (e) => (H(e) ? e.map(nt) : [nt(e)]),
  ea = (e, t, n) => {
    if (t._n) return t;
    const r = yi((...s) => Cs(t(...s)), n);
    return (r._c = !1), r;
  },
  Pi = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (xi(s)) continue;
      const o = e[s];
      if (B(o)) t[s] = ea(s, o, r);
      else if (o != null) {
        const i = Cs(o);
        t[s] = () => i;
      }
    }
  },
  ki = (e, t) => {
    const n = Cs(t);
    e.slots.default = () => n;
  },
  ta = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = G(t)), Vn(t, "_", n)) : Pi(t, (e.slots = {}));
    } else (e.slots = {}), t && ki(e, t);
    Vn(e.slots, lr, 1);
  },
  na = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let o = !0,
      i = ce;
    if (r.shapeFlag & 32) {
      const c = t._;
      c
        ? n && c === 1
          ? (o = !1)
          : (ge(s, t), !n && c === 1 && delete s._)
        : ((o = !t.$stable), Pi(t, s)),
        (i = t);
    } else t && (ki(e, t), (i = { default: 1 }));
    if (o) for (const c in s) !xi(c) && !(c in i) && delete s[c];
  };
function Dr(e, t, n, r, s = !1) {
  if (H(e)) {
    e.forEach((h, L) => Dr(h, t && (H(t) ? t[L] : t), n, r, s));
    return;
  }
  if (Wn(r) && !s) return;
  const o = r.shapeFlag & 4 ? cr(r.component) || r.component.proxy : r.el,
    i = s ? null : o,
    { i: c, r: a } = e,
    f = t && t.r,
    m = c.refs === ce ? (c.refs = {}) : c.refs,
    _ = c.setupState;
  if (
    (f != null &&
      f !== a &&
      (be(f)
        ? ((m[f] = null), Q(_, f) && (_[f] = null))
        : ue(f) && (f.value = null)),
    B(a))
  )
    Ct(a, c, 12, [i, m]);
  else {
    const h = be(a),
      L = ue(a);
    if (h || L) {
      const k = () => {
        if (e.f) {
          const S = h ? (Q(_, a) ? _[a] : m[a]) : a.value;
          s
            ? H(S) && ts(S, o)
            : H(S)
            ? S.includes(o) || S.push(o)
            : h
            ? ((m[a] = [o]), Q(_, a) && (_[a] = m[a]))
            : ((a.value = [o]), e.k && (m[e.k] = a.value));
        } else
          h
            ? ((m[a] = i), Q(_, a) && (_[a] = i))
            : L && ((a.value = i), e.k && (m[e.k] = i));
      };
      i ? ((k.id = -1), Ae(k, n)) : k();
    }
  }
}
const Ae = Nc;
function ra(e) {
  return sa(e);
}
function sa(e, t) {
  const n = Nr();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: o,
      createElement: i,
      createText: c,
      createComment: a,
      setText: f,
      setElementText: m,
      parentNode: _,
      nextSibling: h,
      setScopeId: L = Je,
      insertStaticContent: k,
    } = e,
    S = (
      d,
      l,
      u,
      p = null,
      g = null,
      T = null,
      O = !1,
      w = null,
      x = !!l.dynamicChildren
    ) => {
      if (d === l) return;
      d && !Pt(d, l) && ((p = dt(d)), Se(d, g, T, !0), (d = null)),
        l.patchFlag === -2 && ((x = !1), (l.dynamicChildren = null));
      const { type: N, ref: v, shapeFlag: E } = l;
      switch (N) {
        case wn:
          M(d, l, u, p);
          break;
        case Qe:
          b(d, l, u, p);
          break;
        case vr:
          d == null && I(l, u, p, O);
          break;
        case Ce:
          $(d, l, u, p, g, T, O, w, x);
          break;
        default:
          E & 1
            ? C(d, l, u, p, g, T, O, w, x)
            : E & 6
            ? J(d, l, u, p, g, T, O, w, x)
            : (E & 64 || E & 128) && N.process(d, l, u, p, g, T, O, w, x, $e);
      }
      v != null && g && Dr(v, d && d.ref, T, l || d, !l);
    },
    M = (d, l, u, p) => {
      if (d == null) r((l.el = c(l.children)), u, p);
      else {
        const g = (l.el = d.el);
        l.children !== d.children && f(g, l.children);
      }
    },
    b = (d, l, u, p) => {
      d == null ? r((l.el = a(l.children || "")), u, p) : (l.el = d.el);
    },
    I = (d, l, u, p) => {
      [d.el, d.anchor] = k(d.children, l, u, p, d.el, d.anchor);
    },
    A = ({ el: d, anchor: l }, u, p) => {
      let g;
      for (; d && d !== l; ) (g = h(d)), r(d, u, p), (d = g);
      r(l, u, p);
    },
    y = ({ el: d, anchor: l }) => {
      let u;
      for (; d && d !== l; ) (u = h(d)), s(d), (d = u);
      s(l);
    },
    C = (d, l, u, p, g, T, O, w, x) => {
      (O = O || l.type === "svg"),
        d == null ? F(l, u, p, g, T, O, w, x) : W(d, l, g, T, O, w, x);
    },
    F = (d, l, u, p, g, T, O, w) => {
      let x, N;
      const { type: v, props: E, shapeFlag: D, transition: j, dirs: K } = d;
      if (
        ((x = d.el = i(d.type, T, E && E.is, E)),
        D & 8
          ? m(x, d.children)
          : D & 16 &&
            R(d.children, x, null, p, g, T && v !== "foreignObject", O, w),
        K && St(d, null, p, "created"),
        P(x, d, d.scopeId, O, p),
        E)
      ) {
        for (const q in E)
          q !== "value" &&
            !Un(q) &&
            o(x, q, null, E[q], T, d.children, p, g, xe);
        "value" in E && o(x, "value", null, E.value),
          (N = E.onVnodeBeforeMount) && et(N, p, d);
      }
      K && St(d, null, p, "beforeMount");
      const ne = (!g || (g && !g.pendingBranch)) && j && !j.persisted;
      ne && j.beforeEnter(x),
        r(x, l, u),
        ((N = E && E.onVnodeMounted) || ne || K) &&
          Ae(() => {
            N && et(N, p, d), ne && j.enter(x), K && St(d, null, p, "mounted");
          }, g);
    },
    P = (d, l, u, p, g) => {
      if ((u && L(d, u), p)) for (let T = 0; T < p.length; T++) L(d, p[T]);
      if (g) {
        let T = g.subTree;
        if (l === T) {
          const O = g.vnode;
          P(d, O, O.scopeId, O.slotScopeIds, g.parent);
        }
      }
    },
    R = (d, l, u, p, g, T, O, w, x = 0) => {
      for (let N = x; N < d.length; N++) {
        const v = (d[N] = w ? vt(d[N]) : nt(d[N]));
        S(null, v, l, u, p, g, T, O, w);
      }
    },
    W = (d, l, u, p, g, T, O) => {
      const w = (l.el = d.el);
      let { patchFlag: x, dynamicChildren: N, dirs: v } = l;
      x |= d.patchFlag & 16;
      const E = d.props || ce,
        D = l.props || ce;
      let j;
      u && Ot(u, !1),
        (j = D.onVnodeBeforeUpdate) && et(j, u, l, d),
        v && St(l, d, u, "beforeUpdate"),
        u && Ot(u, !0);
      const K = g && l.type !== "foreignObject";
      if (
        (N
          ? V(d.dynamicChildren, N, w, u, p, K, T)
          : O || te(d, l, w, null, u, p, K, T, !1),
        x > 0)
      ) {
        if (x & 16) X(w, l, E, D, u, p, g);
        else if (
          (x & 2 && E.class !== D.class && o(w, "class", null, D.class, g),
          x & 4 && o(w, "style", E.style, D.style, g),
          x & 8)
        ) {
          const ne = l.dynamicProps;
          for (let q = 0; q < ne.length; q++) {
            const me = ne[q],
              Ue = E[me],
              Wt = D[me];
            (Wt !== Ue || me === "value") &&
              o(w, me, Ue, Wt, g, d.children, u, p, xe);
          }
        }
        x & 1 && d.children !== l.children && m(w, l.children);
      } else !O && N == null && X(w, l, E, D, u, p, g);
      ((j = D.onVnodeUpdated) || v) &&
        Ae(() => {
          j && et(j, u, l, d), v && St(l, d, u, "updated");
        }, p);
    },
    V = (d, l, u, p, g, T, O) => {
      for (let w = 0; w < l.length; w++) {
        const x = d[w],
          N = l[w],
          v =
            x.el && (x.type === Ce || !Pt(x, N) || x.shapeFlag & 70)
              ? _(x.el)
              : u;
        S(x, N, v, null, p, g, T, O, !0);
      }
    },
    X = (d, l, u, p, g, T, O) => {
      if (u !== p) {
        if (u !== ce)
          for (const w in u)
            !Un(w) && !(w in p) && o(d, w, u[w], null, O, l.children, g, T, xe);
        for (const w in p) {
          if (Un(w)) continue;
          const x = p[w],
            N = u[w];
          x !== N && w !== "value" && o(d, w, N, x, O, l.children, g, T, xe);
        }
        "value" in p && o(d, "value", u.value, p.value);
      }
    },
    $ = (d, l, u, p, g, T, O, w, x) => {
      const N = (l.el = d ? d.el : c("")),
        v = (l.anchor = d ? d.anchor : c(""));
      let { patchFlag: E, dynamicChildren: D, slotScopeIds: j } = l;
      j && (w = w ? w.concat(j) : j),
        d == null
          ? (r(N, u, p), r(v, u, p), R(l.children, u, v, g, T, O, w, x))
          : E > 0 && E & 64 && D && d.dynamicChildren
          ? (V(d.dynamicChildren, D, u, g, T, O, w),
            (l.key != null || (g && l === g.subTree)) && Mi(d, l, !0))
          : te(d, l, u, v, g, T, O, w, x);
    },
    J = (d, l, u, p, g, T, O, w, x) => {
      (l.slotScopeIds = w),
        d == null
          ? l.shapeFlag & 512
            ? g.ctx.activate(l, u, p, O, x)
            : ae(l, u, p, g, T, O, x)
          : de(d, l, x);
    },
    ae = (d, l, u, p, g, T, O) => {
      const w = (d.component = pa(d, p, g));
      if ((or(d) && (w.ctx.renderer = $e), ma(w), w.asyncDep)) {
        if ((g && g.registerDep(w, pe), !d.el)) {
          const x = (w.subTree = oe(Qe));
          b(null, x, l, u);
        }
        return;
      }
      pe(w, d, l, u, g, T, O);
    },
    de = (d, l, u) => {
      const p = (l.component = d.component);
      if (Tc(d, l, u))
        if (p.asyncDep && !p.asyncResolved) {
          z(p, l, u);
          return;
        } else (p.next = l), gc(p.update), p.update();
      else (l.el = d.el), (p.vnode = l);
    },
    pe = (d, l, u, p, g, T, O) => {
      const w = () => {
          if (d.isMounted) {
            let { next: v, bu: E, u: D, parent: j, vnode: K } = d,
              ne = v,
              q;
            Ot(d, !1),
              v ? ((v.el = K.el), z(d, v, O)) : (v = K),
              E && jn(E),
              (q = v.props && v.props.onVnodeBeforeUpdate) && et(q, j, v, K),
              Ot(d, !0);
            const me = _r(d),
              Ue = d.subTree;
            (d.subTree = me),
              S(Ue, me, _(Ue.el), dt(Ue), d, g, T),
              (v.el = me.el),
              ne === null && Lc(d, me.el),
              D && Ae(D, g),
              (q = v.props && v.props.onVnodeUpdated) &&
                Ae(() => et(q, j, v, K), g);
          } else {
            let v;
            const { el: E, props: D } = l,
              { bm: j, m: K, parent: ne } = d,
              q = Wn(l);
            if (
              (Ot(d, !1),
              j && jn(j),
              !q && (v = D && D.onVnodeBeforeMount) && et(v, ne, l),
              Ot(d, !0),
              E && ot)
            ) {
              const me = () => {
                (d.subTree = _r(d)), ot(E, d.subTree, d, g, null);
              };
              q
                ? l.type.__asyncLoader().then(() => !d.isUnmounted && me())
                : me();
            } else {
              const me = (d.subTree = _r(d));
              S(null, me, u, p, d, g, T), (l.el = me.el);
            }
            if ((K && Ae(K, g), !q && (v = D && D.onVnodeMounted))) {
              const me = l;
              Ae(() => et(v, ne, me), g);
            }
            (l.shapeFlag & 256 ||
              (ne && Wn(ne.vnode) && ne.vnode.shapeFlag & 256)) &&
              d.a &&
              Ae(d.a, g),
              (d.isMounted = !0),
              (l = u = p = null);
          }
        },
        x = (d.effect = new ls(w, () => bs(N), d.scope)),
        N = (d.update = () => x.run());
      (N.id = d.uid), Ot(d, !0), N();
    },
    z = (d, l, u) => {
      l.component = d;
      const p = d.vnode.props;
      (d.vnode = l),
        (d.next = null),
        zc(d, l.props, p, u),
        na(d, l.children, u),
        sn(),
        Ks(),
        on();
    },
    te = (d, l, u, p, g, T, O, w, x = !1) => {
      const N = d && d.children,
        v = d ? d.shapeFlag : 0,
        E = l.children,
        { patchFlag: D, shapeFlag: j } = l;
      if (D > 0) {
        if (D & 128) {
          ft(N, E, u, p, g, T, O, w, x);
          return;
        } else if (D & 256) {
          De(N, E, u, p, g, T, O, w, x);
          return;
        }
      }
      j & 8
        ? (v & 16 && xe(N, g, T), E !== N && m(u, E))
        : v & 16
        ? j & 16
          ? ft(N, E, u, p, g, T, O, w, x)
          : xe(N, g, T, !0)
        : (v & 8 && m(u, ""), j & 16 && R(E, u, p, g, T, O, w, x));
    },
    De = (d, l, u, p, g, T, O, w, x) => {
      (d = d || qt), (l = l || qt);
      const N = d.length,
        v = l.length,
        E = Math.min(N, v);
      let D;
      for (D = 0; D < E; D++) {
        const j = (l[D] = x ? vt(l[D]) : nt(l[D]));
        S(d[D], j, u, null, g, T, O, w, x);
      }
      N > v ? xe(d, g, T, !0, !1, E) : R(l, u, p, g, T, O, w, x, E);
    },
    ft = (d, l, u, p, g, T, O, w, x) => {
      let N = 0;
      const v = l.length;
      let E = d.length - 1,
        D = v - 1;
      for (; N <= E && N <= D; ) {
        const j = d[N],
          K = (l[N] = x ? vt(l[N]) : nt(l[N]));
        if (Pt(j, K)) S(j, K, u, null, g, T, O, w, x);
        else break;
        N++;
      }
      for (; N <= E && N <= D; ) {
        const j = d[E],
          K = (l[D] = x ? vt(l[D]) : nt(l[D]));
        if (Pt(j, K)) S(j, K, u, null, g, T, O, w, x);
        else break;
        E--, D--;
      }
      if (N > E) {
        if (N <= D) {
          const j = D + 1,
            K = j < v ? l[j].el : p;
          for (; N <= D; )
            S(null, (l[N] = x ? vt(l[N]) : nt(l[N])), u, K, g, T, O, w, x), N++;
        }
      } else if (N > D) for (; N <= E; ) Se(d[N], g, T, !0), N++;
      else {
        const j = N,
          K = N,
          ne = new Map();
        for (N = K; N <= D; N++) {
          const Pe = (l[N] = x ? vt(l[N]) : nt(l[N]));
          Pe.key != null && ne.set(Pe.key, N);
        }
        let q,
          me = 0;
        const Ue = D - K + 1;
        let Wt = !1,
          Ms = 0;
        const un = new Array(Ue);
        for (N = 0; N < Ue; N++) un[N] = 0;
        for (N = j; N <= E; N++) {
          const Pe = d[N];
          if (me >= Ue) {
            Se(Pe, g, T, !0);
            continue;
          }
          let ze;
          if (Pe.key != null) ze = ne.get(Pe.key);
          else
            for (q = K; q <= D; q++)
              if (un[q - K] === 0 && Pt(Pe, l[q])) {
                ze = q;
                break;
              }
          ze === void 0
            ? Se(Pe, g, T, !0)
            : ((un[ze - K] = N + 1),
              ze >= Ms ? (Ms = ze) : (Wt = !0),
              S(Pe, l[ze], u, null, g, T, O, w, x),
              me++);
        }
        const Rs = Wt ? oa(un) : qt;
        for (q = Rs.length - 1, N = Ue - 1; N >= 0; N--) {
          const Pe = K + N,
            ze = l[Pe],
            Fs = Pe + 1 < v ? l[Pe + 1].el : p;
          un[N] === 0
            ? S(null, ze, u, Fs, g, T, O, w, x)
            : Wt && (q < 0 || N !== Rs[q] ? qe(ze, u, Fs, 2) : q--);
        }
      }
    },
    qe = (d, l, u, p, g = null) => {
      const { el: T, type: O, transition: w, children: x, shapeFlag: N } = d;
      if (N & 6) {
        qe(d.component.subTree, l, u, p);
        return;
      }
      if (N & 128) {
        d.suspense.move(l, u, p);
        return;
      }
      if (N & 64) {
        O.move(d, l, u, $e);
        return;
      }
      if (O === Ce) {
        r(T, l, u);
        for (let E = 0; E < x.length; E++) qe(x[E], l, u, p);
        r(d.anchor, l, u);
        return;
      }
      if (O === vr) {
        A(d, l, u);
        return;
      }
      if (p !== 2 && N & 1 && w)
        if (p === 0) w.beforeEnter(T), r(T, l, u), Ae(() => w.enter(T), g);
        else {
          const { leave: E, delayLeave: D, afterLeave: j } = w,
            K = () => r(T, l, u),
            ne = () => {
              E(T, () => {
                K(), j && j();
              });
            };
          D ? D(T, K, ne) : ne();
        }
      else r(T, l, u);
    },
    Se = (d, l, u, p = !1, g = !1) => {
      const {
        type: T,
        props: O,
        ref: w,
        children: x,
        dynamicChildren: N,
        shapeFlag: v,
        patchFlag: E,
        dirs: D,
      } = d;
      if ((w != null && Dr(w, null, u, d, !0), v & 256)) {
        l.ctx.deactivate(d);
        return;
      }
      const j = v & 1 && D,
        K = !Wn(d);
      let ne;
      if ((K && (ne = O && O.onVnodeBeforeUnmount) && et(ne, l, d), v & 6))
        an(d.component, u, p);
      else {
        if (v & 128) {
          d.suspense.unmount(u, p);
          return;
        }
        j && St(d, null, l, "beforeUnmount"),
          v & 64
            ? d.type.remove(d, l, u, g, $e, p)
            : N && (T !== Ce || (E > 0 && E & 64))
            ? xe(N, l, u, !1, !0)
            : ((T === Ce && E & 384) || (!g && v & 16)) && xe(x, l, u),
          p && cn(d);
      }
      ((K && (ne = O && O.onVnodeUnmounted)) || j) &&
        Ae(() => {
          ne && et(ne, l, d), j && St(d, null, l, "unmounted");
        }, u);
    },
    cn = (d) => {
      const { type: l, el: u, anchor: p, transition: g } = d;
      if (l === Ce) {
        jt(u, p);
        return;
      }
      if (l === vr) {
        y(d);
        return;
      }
      const T = () => {
        s(u), g && !g.persisted && g.afterLeave && g.afterLeave();
      };
      if (d.shapeFlag & 1 && g && !g.persisted) {
        const { leave: O, delayLeave: w } = g,
          x = () => O(u, T);
        w ? w(d.el, T, x) : x();
      } else T();
    },
    jt = (d, l) => {
      let u;
      for (; d !== l; ) (u = h(d)), s(d), (d = u);
      s(l);
    },
    an = (d, l, u) => {
      const { bum: p, scope: g, update: T, subTree: O, um: w } = d;
      p && jn(p),
        g.stop(),
        T && ((T.active = !1), Se(O, d, l, u)),
        w && Ae(w, l),
        Ae(() => {
          d.isUnmounted = !0;
        }, l),
        l &&
          l.pendingBranch &&
          !l.isUnmounted &&
          d.asyncDep &&
          !d.asyncResolved &&
          d.suspenseId === l.pendingId &&
          (l.deps--, l.deps === 0 && l.resolve());
    },
    xe = (d, l, u, p = !1, g = !1, T = 0) => {
      for (let O = T; O < d.length; O++) Se(d[O], l, u, p, g);
    },
    dt = (d) =>
      d.shapeFlag & 6
        ? dt(d.component.subTree)
        : d.shapeFlag & 128
        ? d.suspense.next()
        : h(d.anchor || d.el),
    pt = (d, l, u) => {
      d == null
        ? l._vnode && Se(l._vnode, null, null, !0)
        : S(l._vnode || null, d, l, null, null, null, u),
        Ks(),
        gi(),
        (l._vnode = d);
    },
    $e = {
      p: S,
      um: Se,
      m: qe,
      r: cn,
      mt: ae,
      mc: R,
      pc: te,
      pbc: V,
      n: dt,
      o: e,
    };
  let Ze, ot;
  return (
    t && ([Ze, ot] = t($e)), { render: pt, hydrate: Ze, createApp: Jc(pt, Ze) }
  );
}
function Ot({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Mi(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (H(r) && H(s))
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      let c = s[o];
      c.shapeFlag & 1 &&
        !c.dynamicChildren &&
        ((c.patchFlag <= 0 || c.patchFlag === 32) &&
          ((c = s[o] = vt(s[o])), (c.el = i.el)),
        n || Mi(i, c)),
        c.type === wn && (c.el = i.el);
    }
}
function oa(e) {
  const t = e.slice(),
    n = [0];
  let r, s, o, i, c;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const f = e[r];
    if (f !== 0) {
      if (((s = n[n.length - 1]), e[s] < f)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (c = (o + i) >> 1), e[n[c]] < f ? (o = c + 1) : (i = c);
      f < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const ia = (e) => e.__isTeleport,
  Ce = Symbol.for("v-fgt"),
  wn = Symbol.for("v-txt"),
  Qe = Symbol.for("v-cmt"),
  vr = Symbol.for("v-stc"),
  hn = [];
let Ge = null;
function se(e = !1) {
  hn.push((Ge = e ? null : []));
}
function la() {
  hn.pop(), (Ge = hn[hn.length - 1] || null);
}
let Ln = 1;
function no(e) {
  Ln += e;
}
function Ri(e) {
  return (
    (e.dynamicChildren = Ln > 0 ? Ge || qt : null),
    la(),
    Ln > 0 && Ge && Ge.push(e),
    e
  );
}
function fe(e, t, n, r, s, o) {
  return Ri(Y(e, t, n, r, s, o, !0));
}
function xn(e, t, n, r, s) {
  return Ri(oe(e, t, n, r, s, !0));
}
function $r(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Pt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const lr = "__vInternal",
  Fi = ({ key: e }) => e ?? null,
  Hn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? be(e) || ue(e) || B(e)
        ? { i: He, r: e, k: t, f: !!n }
        : e
      : null
  );
function Y(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  o = e === Ce ? 0 : 1,
  i = !1,
  c = !1
) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Fi(t),
    ref: t && Hn(t),
    scopeId: sr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: He,
  };
  return (
    c
      ? (Ts(a, n), o & 128 && e.normalize(a))
      : n && (a.shapeFlag |= be(n) ? 8 : 16),
    Ln > 0 &&
      !i &&
      Ge &&
      (a.patchFlag > 0 || o & 6) &&
      a.patchFlag !== 32 &&
      Ge.push(a),
    a
  );
}
const oe = ca;
function ca(e, t = null, n = null, r = 0, s = null, o = !1) {
  if (((!e || e === Hc) && (e = Qe), $r(e))) {
    const c = Lt(e, t, !0);
    return (
      n && Ts(c, n),
      Ln > 0 &&
        !o &&
        Ge &&
        (c.shapeFlag & 6 ? (Ge[Ge.indexOf(e)] = c) : Ge.push(c)),
      (c.patchFlag |= -2),
      c
    );
  }
  if ((ba(e) && (e = e.__vccOpts), t)) {
    t = aa(t);
    let { class: c, style: a } = t;
    c && !be(c) && (t.class = Sn(c)),
      le(a) && (di(a) && !H(a) && (a = ge({}, a)), (t.style = zn(a)));
  }
  const i = be(e) ? 1 : Ic(e) ? 128 : ia(e) ? 64 : le(e) ? 4 : B(e) ? 2 : 0;
  return Y(e, t, n, r, s, i, o, !0);
}
function aa(e) {
  return e ? (di(e) || lr in e ? ge({}, e) : e) : null;
}
function Lt(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: i } = e,
    c = t ? ua(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Fi(c),
    ref:
      t && t.ref ? (n && s ? (H(s) ? s.concat(Hn(t)) : [s, Hn(t)]) : Hn(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Ce ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Lt(e.ssContent),
    ssFallback: e.ssFallback && Lt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function Di(e = " ", t = 0) {
  return oe(wn, null, e, t);
}
function en(e = "", t = !1) {
  return t ? (se(), xn(Qe, null, e)) : oe(Qe, null, e);
}
function nt(e) {
  return e == null || typeof e == "boolean"
    ? oe(Qe)
    : H(e)
    ? oe(Ce, null, e.slice())
    : typeof e == "object"
    ? vt(e)
    : oe(wn, null, String(e));
}
function vt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Lt(e);
}
function Ts(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (H(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Ts(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(lr in t)
        ? (t._ctx = He)
        : s === 3 &&
          He &&
          (He.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    B(t)
      ? ((t = { default: t, _ctx: He }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Di(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function ua(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = Sn([t.class, r.class]));
      else if (s === "style") t.style = zn([t.style, r.style]);
      else if (Jn(s)) {
        const o = t[s],
          i = r[s];
        i &&
          o !== i &&
          !(H(o) && o.includes(i)) &&
          (t[s] = o ? [].concat(o, i) : i);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
function et(e, t, n, r = null) {
  Be(e, t, 7, [n, r]);
}
const fa = Oi();
let da = 0;
function pa(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || fa,
    o = {
      uid: da++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new ei(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: wi(r, s),
      emitsOptions: vi(r, s),
      emit: null,
      emitted: null,
      propsDefaults: ce,
      inheritAttrs: r.inheritAttrs,
      ctx: ce,
      data: ce,
      props: ce,
      attrs: ce,
      slots: ce,
      refs: ce,
      setupState: ce,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = yc.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let Ee = null;
const ln = () => Ee || He;
let Ls,
  Ht,
  ro = "__VUE_INSTANCE_SETTERS__";
(Ht = Nr()[ro]) || (Ht = Nr()[ro] = []),
  Ht.push((e) => (Ee = e)),
  (Ls = (e) => {
    Ht.length > 1 ? Ht.forEach((t) => t(e)) : Ht[0](e);
  });
const tn = (e) => {
    Ls(e), e.scope.on();
  },
  Ft = () => {
    Ee && Ee.scope.off(), Ls(null);
  };
function $i(e) {
  return e.vnode.shapeFlag & 4;
}
let In = !1;
function ma(e, t = !1) {
  In = t;
  const { props: n, children: r } = e.vnode,
    s = $i(e);
  Zc(e, n, s, t), ta(e, r);
  const o = s ? _a(e, t) : void 0;
  return (In = !1), o;
}
function _a(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = zt(new Proxy(e.ctx, Vc)));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? ga(e) : null);
    tn(e), sn();
    const o = Ct(r, e, 0, [e.props, s]);
    if ((on(), Ft(), Yo(o))) {
      if ((o.then(Ft, Ft), t))
        return o
          .then((i) => {
            so(e, i, t);
          })
          .catch((i) => {
            nr(i, e, 0);
          });
      e.asyncDep = o;
    } else so(e, o, t);
  } else Ui(e, t);
}
function so(e, t, n) {
  B(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : le(t) && (e.setupState = pi(t)),
    Ui(e, n);
}
let oo;
function Ui(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && oo && !r.render) {
      const s = r.template || Es(e).template;
      if (s) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: c, compilerOptions: a } = r,
          f = ge(ge({ isCustomElement: o, delimiters: c }, i), a);
        r.render = oo(s, f);
      }
    }
    e.render = r.render || Je;
  }
  tn(e), sn(), Bc(e), on(), Ft();
}
function ha(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return we(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function ga(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return ha(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function cr(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(pi(zt(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in _n) return _n[n](e);
        },
        has(t, n) {
          return n in t || n in _n;
        },
      }))
    );
}
function ba(e) {
  return B(e) && "__vccOpts" in e;
}
const We = (e, t) => mc(e, t, In);
function Is(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? le(t) && !H(t)
      ? $r(t)
        ? oe(e, null, [t])
        : oe(e, t)
      : oe(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && $r(n) && (n = [n]),
      oe(e, t, n));
}
const va = Symbol.for("v-scx"),
  ya = () => Jt(va),
  Ea = "3.3.2",
  Ca = "http://www.w3.org/2000/svg",
  kt = typeof document < "u" ? document : null,
  io = kt && kt.createElement("template"),
  Ta = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? kt.createElementNS(Ca, e)
        : kt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          s.setAttribute("multiple", r.multiple),
        s
      );
    },
    createText: (e) => kt.createTextNode(e),
    createComment: (e) => kt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => kt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, s, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (s && (s === o || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling));

        );
      else {
        io.innerHTML = r ? `<svg>${e}</svg>` : e;
        const c = io.content;
        if (r) {
          const a = c.firstChild;
          for (; a.firstChild; ) c.appendChild(a.firstChild);
          c.removeChild(a);
        }
        t.insertBefore(c, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function La(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Ia(e, t, n) {
  const r = e.style,
    s = be(n);
  if (n && !s) {
    if (t && !be(t)) for (const o in t) n[o] == null && Ur(r, o, "");
    for (const o in n) Ur(r, o, n[o]);
  } else {
    const o = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = o);
  }
}
const lo = /\s*!important$/;
function Ur(e, t, n) {
  if (H(n)) n.forEach((r) => Ur(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = Na(e, t);
    lo.test(n)
      ? e.setProperty(rn(r), n.replace(lo, ""), "important")
      : (e[r] = n);
  }
}
const co = ["Webkit", "Moz", "ms"],
  yr = {};
function Na(e, t) {
  const n = yr[t];
  if (n) return n;
  let r = Qt(t);
  if (r !== "filter" && r in e) return (yr[t] = r);
  r = Qo(r);
  for (let s = 0; s < co.length; s++) {
    const o = co[s] + r;
    if (o in e) return (yr[t] = o);
  }
  return t;
}
const ao = "http://www.w3.org/1999/xlink";
function Sa(e, t, n, r, s) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(ao, t.slice(6, t.length))
      : e.setAttributeNS(ao, t, n);
  else {
    const o = Ol(t);
    n == null || (o && !Zo(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function Oa(e, t, n, r, s, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    r && i(r, s, o), (e[t] = n ?? "");
    return;
  }
  const c = e.tagName;
  if (t === "value" && c !== "PROGRESS" && !c.includes("-")) {
    e._value = n;
    const f = c === "OPTION" ? e.getAttribute("value") : e.value,
      m = n ?? "";
    f !== m && (e.value = m), n == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const f = typeof e[t];
    f === "boolean"
      ? (n = Zo(n))
      : n == null && f === "string"
      ? ((n = ""), (a = !0))
      : f === "number" && ((n = 0), (a = !0));
  }
  try {
    e[t] = n;
  } catch {}
  a && e.removeAttribute(t);
}
function Bt(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Aa(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function wa(e, t, n, r, s = null) {
  const o = e._vei || (e._vei = {}),
    i = o[t];
  if (r && i) i.value = r;
  else {
    const [c, a] = xa(t);
    if (r) {
      const f = (o[t] = Ma(r, s));
      Bt(e, c, f, a);
    } else i && (Aa(e, c, i, a), (o[t] = void 0));
  }
}
const uo = /(?:Once|Passive|Capture)$/;
function xa(e) {
  let t;
  if (uo.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(uo)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : rn(e.slice(2)), t];
}
let Er = 0;
const Pa = Promise.resolve(),
  ka = () => Er || (Pa.then(() => (Er = 0)), (Er = Date.now()));
function Ma(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    Be(Ra(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = ka()), n;
}
function Ra(e, t) {
  if (H(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    );
  } else return t;
}
const fo = /^on[a-z]/,
  Fa = (e, t, n, r, s = !1, o, i, c, a) => {
    t === "class"
      ? La(e, r, s)
      : t === "style"
      ? Ia(e, n, r)
      : Jn(t)
      ? es(t) || wa(e, t, n, r, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Da(e, t, r, s)
        )
      ? Oa(e, t, r, o, i, c, a)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        Sa(e, t, r, s));
  };
function Da(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && fo.test(t) && B(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (fo.test(t) && be(n))
    ? !1
    : t in e;
}
const _t = "transition",
  fn = "animation",
  Ns = (e, { slots: t }) => Is(xc, $a(e), t);
Ns.displayName = "Transition";
const ji = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
Ns.props = ge({}, Ci, ji);
const At = (e, t = []) => {
    H(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  po = (e) => (e ? (H(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function $a(e) {
  const t = {};
  for (const $ in e) $ in ji || (t[$] = e[$]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: r,
      duration: s,
      enterFromClass: o = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: c = `${n}-enter-to`,
      appearFromClass: a = o,
      appearActiveClass: f = i,
      appearToClass: m = c,
      leaveFromClass: _ = `${n}-leave-from`,
      leaveActiveClass: h = `${n}-leave-active`,
      leaveToClass: L = `${n}-leave-to`,
    } = e,
    k = Ua(s),
    S = k && k[0],
    M = k && k[1],
    {
      onBeforeEnter: b,
      onEnter: I,
      onEnterCancelled: A,
      onLeave: y,
      onLeaveCancelled: C,
      onBeforeAppear: F = b,
      onAppear: P = I,
      onAppearCancelled: R = A,
    } = t,
    W = ($, J, ae) => {
      wt($, J ? m : c), wt($, J ? f : i), ae && ae();
    },
    V = ($, J) => {
      ($._isLeaving = !1), wt($, _), wt($, L), wt($, h), J && J();
    },
    X = ($) => (J, ae) => {
      const de = $ ? P : I,
        pe = () => W(J, $, ae);
      At(de, [J, pe]),
        mo(() => {
          wt(J, $ ? a : o), ht(J, $ ? m : c), po(de) || _o(J, r, S, pe);
        });
    };
  return ge(t, {
    onBeforeEnter($) {
      At(b, [$]), ht($, o), ht($, i);
    },
    onBeforeAppear($) {
      At(F, [$]), ht($, a), ht($, f);
    },
    onEnter: X(!1),
    onAppear: X(!0),
    onLeave($, J) {
      $._isLeaving = !0;
      const ae = () => V($, J);
      ht($, _),
        Ha(),
        ht($, h),
        mo(() => {
          $._isLeaving && (wt($, _), ht($, L), po(y) || _o($, r, M, ae));
        }),
        At(y, [$, ae]);
    },
    onEnterCancelled($) {
      W($, !1), At(A, [$]);
    },
    onAppearCancelled($) {
      W($, !0), At(R, [$]);
    },
    onLeaveCancelled($) {
      V($), At(C, [$]);
    },
  });
}
function Ua(e) {
  if (e == null) return null;
  if (le(e)) return [Cr(e.enter), Cr(e.leave)];
  {
    const t = Cr(e);
    return [t, t];
  }
}
function Cr(e) {
  return Cl(e);
}
function ht(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function wt(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function mo(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let ja = 0;
function _o(e, t, n, r) {
  const s = (e._endId = ++ja),
    o = () => {
      s === e._endId && r();
    };
  if (n) return setTimeout(o, n);
  const { type: i, timeout: c, propCount: a } = Wa(e, t);
  if (!i) return r();
  const f = i + "end";
  let m = 0;
  const _ = () => {
      e.removeEventListener(f, h), o();
    },
    h = (L) => {
      L.target === e && ++m >= a && _();
    };
  setTimeout(() => {
    m < a && _();
  }, c + 1),
    e.addEventListener(f, h);
}
function Wa(e, t) {
  const n = window.getComputedStyle(e),
    r = (k) => (n[k] || "").split(", "),
    s = r(`${_t}Delay`),
    o = r(`${_t}Duration`),
    i = ho(s, o),
    c = r(`${fn}Delay`),
    a = r(`${fn}Duration`),
    f = ho(c, a);
  let m = null,
    _ = 0,
    h = 0;
  t === _t
    ? i > 0 && ((m = _t), (_ = i), (h = o.length))
    : t === fn
    ? f > 0 && ((m = fn), (_ = f), (h = a.length))
    : ((_ = Math.max(i, f)),
      (m = _ > 0 ? (i > f ? _t : fn) : null),
      (h = m ? (m === _t ? o.length : a.length) : 0));
  const L =
    m === _t && /\b(transform|all)(,|$)/.test(r(`${_t}Property`).toString());
  return { type: m, timeout: _, propCount: h, hasTransform: L };
}
function ho(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => go(n) + go(e[r])));
}
function go(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Ha() {
  return document.body.offsetHeight;
}
const bo = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return H(t) ? (n) => jn(t, n) : t;
};
function Va(e) {
  e.target.composing = !0;
}
function vo(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const Tr = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, s) {
      e._assign = bo(s);
      const o = r || (s.props && s.props.type === "number");
      Bt(e, t ? "change" : "input", (i) => {
        if (i.target.composing) return;
        let c = e.value;
        n && (c = c.trim()), o && (c = Ir(c)), e._assign(c);
      }),
        n &&
          Bt(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (Bt(e, "compositionstart", Va),
          Bt(e, "compositionend", vo),
          Bt(e, "change", vo));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: r, number: s } },
      o
    ) {
      if (
        ((e._assign = bo(o)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (r && e.value.trim() === t) ||
              ((s || e.type === "number") && Ir(e.value) === t))))
      )
        return;
      const i = t ?? "";
      e.value !== i && (e.value = i);
    },
  },
  Ba = ["ctrl", "shift", "alt", "meta"],
  Ka = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => Ba.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  Xa =
    (e, t) =>
    (n, ...r) => {
      for (let s = 0; s < t.length; s++) {
        const o = Ka[t[s]];
        if (o && o(n, t)) return;
      }
      return e(n, ...r);
    },
  qa = ge({ patchProp: Fa }, Ta);
let yo;
function Ya() {
  return yo || (yo = ra(qa));
}
const Ga = (...e) => {
  const t = Ya().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const s = Ja(r);
      if (!s) return;
      const o = t._component;
      !B(o) && !o.render && !o.template && (o.template = s.innerHTML),
        (s.innerHTML = "");
      const i = n(s, !1, s instanceof SVGElement);
      return (
        s instanceof Element &&
          (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function Ja(e) {
  return be(e) ? document.querySelector(e) : e;
}
var Qa = !1;
/*!
 * pinia v2.0.36
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ let Wi;
const ar = (e) => (Wi = e),
  Hi = Symbol();
function jr(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.toString.call(e) === "[object Object]" &&
    typeof e.toJSON != "function"
  );
}
var gn;
(function (e) {
  (e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function");
})(gn || (gn = {}));
function Za() {
  const e = ss(!0),
    t = e.run(() => re({}));
  let n = [],
    r = [];
  const s = zt({
    install(o) {
      ar(s),
        (s._a = o),
        o.provide(Hi, s),
        (o.config.globalProperties.$pinia = s),
        r.forEach((i) => n.push(i)),
        (r = []);
    },
    use(o) {
      return !this._a && !Qa ? r.push(o) : n.push(o), this;
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return s;
}
const Vi = () => {};
function Eo(e, t, n, r = Vi) {
  e.push(t);
  const s = () => {
    const o = e.indexOf(t);
    o > -1 && (e.splice(o, 1), r());
  };
  return !n && os() && ti(s), s;
}
function Vt(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
function Wr(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, r) => e.set(r, n)),
    e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue;
    const r = t[n],
      s = e[n];
    jr(s) && jr(r) && e.hasOwnProperty(n) && !ue(r) && !Et(r)
      ? (e[n] = Wr(s, r))
      : (e[n] = r);
  }
  return e;
}
const za = Symbol();
function eu(e) {
  return !jr(e) || !e.hasOwnProperty(za);
}
const { assign: bt } = Object;
function tu(e) {
  return !!(ue(e) && e.effect);
}
function nu(e, t, n, r) {
  const { state: s, actions: o, getters: i } = t,
    c = n.state.value[e];
  let a;
  function f() {
    c || (n.state.value[e] = s ? s() : {});
    const m = ac(n.state.value[e]);
    return bt(
      m,
      o,
      Object.keys(i || {}).reduce(
        (_, h) => (
          (_[h] = zt(
            We(() => {
              ar(n);
              const L = n._s.get(e);
              return i[h].call(L, L);
            })
          )),
          _
        ),
        {}
      )
    );
  }
  return (a = Bi(e, f, t, n, r, !0)), a;
}
function Bi(e, t, n = {}, r, s, o) {
  let i;
  const c = bt({ actions: {} }, n),
    a = { deep: !0 };
  let f,
    m,
    _ = zt([]),
    h = zt([]),
    L;
  const k = r.state.value[e];
  !o && !k && (r.state.value[e] = {}), re({});
  let S;
  function M(P) {
    let R;
    (f = m = !1),
      typeof P == "function"
        ? (P(r.state.value[e]),
          (R = { type: gn.patchFunction, storeId: e, events: L }))
        : (Wr(r.state.value[e], P),
          (R = { type: gn.patchObject, payload: P, storeId: e, events: L }));
    const W = (S = Symbol());
    gs().then(() => {
      S === W && (f = !0);
    }),
      (m = !0),
      Vt(_, R, r.state.value[e]);
  }
  const b = o
    ? function () {
        const { state: R } = n,
          W = R ? R() : {};
        this.$patch((V) => {
          bt(V, W);
        });
      }
    : Vi;
  function I() {
    i.stop(), (_ = []), (h = []), r._s.delete(e);
  }
  function A(P, R) {
    return function () {
      ar(r);
      const W = Array.from(arguments),
        V = [],
        X = [];
      function $(de) {
        V.push(de);
      }
      function J(de) {
        X.push(de);
      }
      Vt(h, { args: W, name: P, store: C, after: $, onError: J });
      let ae;
      try {
        ae = R.apply(this && this.$id === e ? this : C, W);
      } catch (de) {
        throw (Vt(X, de), de);
      }
      return ae instanceof Promise
        ? ae
            .then((de) => (Vt(V, de), de))
            .catch((de) => (Vt(X, de), Promise.reject(de)))
        : (Vt(V, ae), ae);
    };
  }
  const y = {
      _p: r,
      $id: e,
      $onAction: Eo.bind(null, h),
      $patch: M,
      $reset: b,
      $subscribe(P, R = {}) {
        const W = Eo(_, P, R.detached, () => V()),
          V = i.run(() =>
            Me(
              () => r.state.value[e],
              (X) => {
                (R.flush === "sync" ? m : f) &&
                  P({ storeId: e, type: gn.direct, events: L }, X);
              },
              bt({}, a, R)
            )
          );
        return W;
      },
      $dispose: I,
    },
    C = tr(y);
  r._s.set(e, C);
  const F = r._e.run(() => ((i = ss()), i.run(() => t())));
  for (const P in F) {
    const R = F[P];
    if ((ue(R) && !tu(R)) || Et(R))
      o ||
        (k && eu(R) && (ue(R) ? (R.value = k[P]) : Wr(R, k[P])),
        (r.state.value[e][P] = R));
    else if (typeof R == "function") {
      const W = A(P, R);
      (F[P] = W), (c.actions[P] = R);
    }
  }
  return (
    bt(C, F),
    bt(G(C), F),
    Object.defineProperty(C, "$state", {
      get: () => r.state.value[e],
      set: (P) => {
        M((R) => {
          bt(R, P);
        });
      },
    }),
    r._p.forEach((P) => {
      bt(
        C,
        i.run(() => P({ store: C, app: r._a, pinia: r, options: c }))
      );
    }),
    k && o && n.hydrate && n.hydrate(C.$state, k),
    (f = !0),
    (m = !0),
    C
  );
}
function ru(e, t, n) {
  let r, s;
  const o = typeof t == "function";
  typeof e == "string" ? ((r = e), (s = o ? n : t)) : ((s = e), (r = e.id));
  function i(c, a) {
    const f = ln();
    return (
      (c = c || (f && Jt(Hi, null))),
      c && ar(c),
      (c = Wi),
      c._s.has(r) || (o ? Bi(r, t, s, c) : nu(r, s, c)),
      c._s.get(r)
    );
  }
  return (i.$id = r), i;
}
/*!
 * shared v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const Hr = typeof window < "u",
  su = typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol",
  It = (e) => (su ? Symbol(e) : e),
  ou = (e, t, n) => iu({ l: e, k: t, s: n }),
  iu = (e) =>
    JSON.stringify(e)
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029")
      .replace(/\u0027/g, "\\u0027"),
  ve = (e) => typeof e == "number" && isFinite(e),
  lu = (e) => Os(e) === "[object Date]",
  Gn = (e) => Os(e) === "[object RegExp]",
  ur = (e) => Z(e) && Object.keys(e).length === 0;
function cu(e, t) {
  typeof console < "u" &&
    (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Le = Object.assign;
function Co(e) {
  return e
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
const au = Object.prototype.hasOwnProperty;
function Ss(e, t) {
  return au.call(e, t);
}
const he = Array.isArray,
  ye = (e) => typeof e == "function",
  U = (e) => typeof e == "string",
  _e = (e) => typeof e == "boolean",
  ie = (e) => e !== null && typeof e == "object",
  Ki = Object.prototype.toString,
  Os = (e) => Ki.call(e),
  Z = (e) => Os(e) === "[object Object]",
  uu = (e) =>
    e == null
      ? ""
      : he(e) || (Z(e) && e.toString === Ki)
      ? JSON.stringify(e, null, 2)
      : String(e);
/*!
 * message-compiler v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const ee = {
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  __EXTEND_POINT__: 15,
};
function fr(e, t, n = {}) {
  const { domain: r, messages: s, args: o } = n,
    i = e,
    c = new SyntaxError(String(i));
  return (c.code = e), t && (c.location = t), (c.domain = r), c;
}
function fu(e) {
  throw e;
}
function du(e, t, n) {
  return { line: e, column: t, offset: n };
}
function Vr(e, t, n) {
  const r = { start: e, end: t };
  return n != null && (r.source = n), r;
}
const it = " ",
  pu = "\r",
  Ne = `
`,
  mu = String.fromCharCode(8232),
  _u = String.fromCharCode(8233);
function hu(e) {
  const t = e;
  let n = 0,
    r = 1,
    s = 1,
    o = 0;
  const i = (P) => t[P] === pu && t[P + 1] === Ne,
    c = (P) => t[P] === Ne,
    a = (P) => t[P] === _u,
    f = (P) => t[P] === mu,
    m = (P) => i(P) || c(P) || a(P) || f(P),
    _ = () => n,
    h = () => r,
    L = () => s,
    k = () => o,
    S = (P) => (i(P) || a(P) || f(P) ? Ne : t[P]),
    M = () => S(n),
    b = () => S(n + o);
  function I() {
    return (o = 0), m(n) && (r++, (s = 0)), i(n) && n++, n++, s++, t[n];
  }
  function A() {
    return i(n + o) && o++, o++, t[n + o];
  }
  function y() {
    (n = 0), (r = 1), (s = 1), (o = 0);
  }
  function C(P = 0) {
    o = P;
  }
  function F() {
    const P = n + o;
    for (; P !== n; ) I();
    o = 0;
  }
  return {
    index: _,
    line: h,
    column: L,
    peekOffset: k,
    charAt: S,
    currentChar: M,
    currentPeek: b,
    next: I,
    peek: A,
    reset: y,
    resetPeek: C,
    skipToPeek: F,
  };
}
const gt = void 0,
  To = "'",
  gu = "tokenizer";
function bu(e, t = {}) {
  const n = t.location !== !1,
    r = hu(e),
    s = () => r.index(),
    o = () => du(r.line(), r.column(), r.index()),
    i = o(),
    c = s(),
    a = {
      currentType: 14,
      offset: c,
      startLoc: i,
      endLoc: i,
      lastType: 14,
      lastOffset: c,
      lastStartLoc: i,
      lastEndLoc: i,
      braceNest: 0,
      inLinked: !1,
      text: "",
    },
    f = () => a,
    { onError: m } = t;
  function _(l, u, p, ...g) {
    const T = f();
    if (((u.column += p), (u.offset += p), m)) {
      const O = Vr(T.startLoc, u),
        w = fr(l, O, { domain: gu, args: g });
      m(w);
    }
  }
  function h(l, u, p) {
    (l.endLoc = o()), (l.currentType = u);
    const g = { type: u };
    return (
      n && (g.loc = Vr(l.startLoc, l.endLoc)), p != null && (g.value = p), g
    );
  }
  const L = (l) => h(l, 14);
  function k(l, u) {
    return l.currentChar() === u
      ? (l.next(), u)
      : (_(ee.EXPECTED_TOKEN, o(), 0, u), "");
  }
  function S(l) {
    let u = "";
    for (; l.currentPeek() === it || l.currentPeek() === Ne; )
      (u += l.currentPeek()), l.peek();
    return u;
  }
  function M(l) {
    const u = S(l);
    return l.skipToPeek(), u;
  }
  function b(l) {
    if (l === gt) return !1;
    const u = l.charCodeAt(0);
    return (u >= 97 && u <= 122) || (u >= 65 && u <= 90) || u === 95;
  }
  function I(l) {
    if (l === gt) return !1;
    const u = l.charCodeAt(0);
    return u >= 48 && u <= 57;
  }
  function A(l, u) {
    const { currentType: p } = u;
    if (p !== 2) return !1;
    S(l);
    const g = b(l.currentPeek());
    return l.resetPeek(), g;
  }
  function y(l, u) {
    const { currentType: p } = u;
    if (p !== 2) return !1;
    S(l);
    const g = l.currentPeek() === "-" ? l.peek() : l.currentPeek(),
      T = I(g);
    return l.resetPeek(), T;
  }
  function C(l, u) {
    const { currentType: p } = u;
    if (p !== 2) return !1;
    S(l);
    const g = l.currentPeek() === To;
    return l.resetPeek(), g;
  }
  function F(l, u) {
    const { currentType: p } = u;
    if (p !== 8) return !1;
    S(l);
    const g = l.currentPeek() === ".";
    return l.resetPeek(), g;
  }
  function P(l, u) {
    const { currentType: p } = u;
    if (p !== 9) return !1;
    S(l);
    const g = b(l.currentPeek());
    return l.resetPeek(), g;
  }
  function R(l, u) {
    const { currentType: p } = u;
    if (!(p === 8 || p === 12)) return !1;
    S(l);
    const g = l.currentPeek() === ":";
    return l.resetPeek(), g;
  }
  function W(l, u) {
    const { currentType: p } = u;
    if (p !== 10) return !1;
    const g = () => {
        const O = l.currentPeek();
        return O === "{"
          ? b(l.peek())
          : O === "@" ||
            O === "%" ||
            O === "|" ||
            O === ":" ||
            O === "." ||
            O === it ||
            !O
          ? !1
          : O === Ne
          ? (l.peek(), g())
          : b(O);
      },
      T = g();
    return l.resetPeek(), T;
  }
  function V(l) {
    S(l);
    const u = l.currentPeek() === "|";
    return l.resetPeek(), u;
  }
  function X(l) {
    const u = S(l),
      p = l.currentPeek() === "%" && l.peek() === "{";
    return l.resetPeek(), { isModulo: p, hasSpace: u.length > 0 };
  }
  function $(l, u = !0) {
    const p = (T = !1, O = "", w = !1) => {
        const x = l.currentPeek();
        return x === "{"
          ? O === "%"
            ? !1
            : T
          : x === "@" || !x
          ? O === "%"
            ? !0
            : T
          : x === "%"
          ? (l.peek(), p(T, "%", !0))
          : x === "|"
          ? O === "%" || w
            ? !0
            : !(O === it || O === Ne)
          : x === it
          ? (l.peek(), p(!0, it, w))
          : x === Ne
          ? (l.peek(), p(!0, Ne, w))
          : !0;
      },
      g = p();
    return u && l.resetPeek(), g;
  }
  function J(l, u) {
    const p = l.currentChar();
    return p === gt ? gt : u(p) ? (l.next(), p) : null;
  }
  function ae(l) {
    return J(l, (p) => {
      const g = p.charCodeAt(0);
      return (
        (g >= 97 && g <= 122) ||
        (g >= 65 && g <= 90) ||
        (g >= 48 && g <= 57) ||
        g === 95 ||
        g === 36
      );
    });
  }
  function de(l) {
    return J(l, (p) => {
      const g = p.charCodeAt(0);
      return g >= 48 && g <= 57;
    });
  }
  function pe(l) {
    return J(l, (p) => {
      const g = p.charCodeAt(0);
      return (
        (g >= 48 && g <= 57) || (g >= 65 && g <= 70) || (g >= 97 && g <= 102)
      );
    });
  }
  function z(l) {
    let u = "",
      p = "";
    for (; (u = de(l)); ) p += u;
    return p;
  }
  function te(l) {
    M(l);
    const u = l.currentChar();
    return u !== "%" && _(ee.EXPECTED_TOKEN, o(), 0, u), l.next(), "%";
  }
  function De(l) {
    let u = "";
    for (;;) {
      const p = l.currentChar();
      if (p === "{" || p === "}" || p === "@" || p === "|" || !p) break;
      if (p === "%")
        if ($(l)) (u += p), l.next();
        else break;
      else if (p === it || p === Ne)
        if ($(l)) (u += p), l.next();
        else {
          if (V(l)) break;
          (u += p), l.next();
        }
      else (u += p), l.next();
    }
    return u;
  }
  function ft(l) {
    M(l);
    let u = "",
      p = "";
    for (; (u = ae(l)); ) p += u;
    return (
      l.currentChar() === gt && _(ee.UNTERMINATED_CLOSING_BRACE, o(), 0), p
    );
  }
  function qe(l) {
    M(l);
    let u = "";
    return (
      l.currentChar() === "-" ? (l.next(), (u += `-${z(l)}`)) : (u += z(l)),
      l.currentChar() === gt && _(ee.UNTERMINATED_CLOSING_BRACE, o(), 0),
      u
    );
  }
  function Se(l) {
    M(l), k(l, "'");
    let u = "",
      p = "";
    const g = (O) => O !== To && O !== Ne;
    for (; (u = J(l, g)); ) u === "\\" ? (p += cn(l)) : (p += u);
    const T = l.currentChar();
    return T === Ne || T === gt
      ? (_(ee.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, o(), 0),
        T === Ne && (l.next(), k(l, "'")),
        p)
      : (k(l, "'"), p);
  }
  function cn(l) {
    const u = l.currentChar();
    switch (u) {
      case "\\":
      case "'":
        return l.next(), `\\${u}`;
      case "u":
        return jt(l, u, 4);
      case "U":
        return jt(l, u, 6);
      default:
        return _(ee.UNKNOWN_ESCAPE_SEQUENCE, o(), 0, u), "";
    }
  }
  function jt(l, u, p) {
    k(l, u);
    let g = "";
    for (let T = 0; T < p; T++) {
      const O = pe(l);
      if (!O) {
        _(
          ee.INVALID_UNICODE_ESCAPE_SEQUENCE,
          o(),
          0,
          `\\${u}${g}${l.currentChar()}`
        );
        break;
      }
      g += O;
    }
    return `\\${u}${g}`;
  }
  function an(l) {
    M(l);
    let u = "",
      p = "";
    const g = (T) => T !== "{" && T !== "}" && T !== it && T !== Ne;
    for (; (u = J(l, g)); ) p += u;
    return p;
  }
  function xe(l) {
    let u = "",
      p = "";
    for (; (u = ae(l)); ) p += u;
    return p;
  }
  function dt(l) {
    const u = (p = !1, g) => {
      const T = l.currentChar();
      return T === "{" || T === "%" || T === "@" || T === "|" || !T || T === it
        ? g
        : T === Ne
        ? ((g += T), l.next(), u(p, g))
        : ((g += T), l.next(), u(!0, g));
    };
    return u(!1, "");
  }
  function pt(l) {
    M(l);
    const u = k(l, "|");
    return M(l), u;
  }
  function $e(l, u) {
    let p = null;
    switch (l.currentChar()) {
      case "{":
        return (
          u.braceNest >= 1 && _(ee.NOT_ALLOW_NEST_PLACEHOLDER, o(), 0),
          l.next(),
          (p = h(u, 2, "{")),
          M(l),
          u.braceNest++,
          p
        );
      case "}":
        return (
          u.braceNest > 0 &&
            u.currentType === 2 &&
            _(ee.EMPTY_PLACEHOLDER, o(), 0),
          l.next(),
          (p = h(u, 3, "}")),
          u.braceNest--,
          u.braceNest > 0 && M(l),
          u.inLinked && u.braceNest === 0 && (u.inLinked = !1),
          p
        );
      case "@":
        return (
          u.braceNest > 0 && _(ee.UNTERMINATED_CLOSING_BRACE, o(), 0),
          (p = Ze(l, u) || L(u)),
          (u.braceNest = 0),
          p
        );
      default:
        let T = !0,
          O = !0,
          w = !0;
        if (V(l))
          return (
            u.braceNest > 0 && _(ee.UNTERMINATED_CLOSING_BRACE, o(), 0),
            (p = h(u, 1, pt(l))),
            (u.braceNest = 0),
            (u.inLinked = !1),
            p
          );
        if (
          u.braceNest > 0 &&
          (u.currentType === 5 || u.currentType === 6 || u.currentType === 7)
        )
          return (
            _(ee.UNTERMINATED_CLOSING_BRACE, o(), 0),
            (u.braceNest = 0),
            ot(l, u)
          );
        if ((T = A(l, u))) return (p = h(u, 5, ft(l))), M(l), p;
        if ((O = y(l, u))) return (p = h(u, 6, qe(l))), M(l), p;
        if ((w = C(l, u))) return (p = h(u, 7, Se(l))), M(l), p;
        if (!T && !O && !w)
          return (
            (p = h(u, 13, an(l))),
            _(ee.INVALID_TOKEN_IN_PLACEHOLDER, o(), 0, p.value),
            M(l),
            p
          );
        break;
    }
    return p;
  }
  function Ze(l, u) {
    const { currentType: p } = u;
    let g = null;
    const T = l.currentChar();
    switch (
      ((p === 8 || p === 9 || p === 12 || p === 10) &&
        (T === Ne || T === it) &&
        _(ee.INVALID_LINKED_FORMAT, o(), 0),
      T)
    ) {
      case "@":
        return l.next(), (g = h(u, 8, "@")), (u.inLinked = !0), g;
      case ".":
        return M(l), l.next(), h(u, 9, ".");
      case ":":
        return M(l), l.next(), h(u, 10, ":");
      default:
        return V(l)
          ? ((g = h(u, 1, pt(l))), (u.braceNest = 0), (u.inLinked = !1), g)
          : F(l, u) || R(l, u)
          ? (M(l), Ze(l, u))
          : P(l, u)
          ? (M(l), h(u, 12, xe(l)))
          : W(l, u)
          ? (M(l), T === "{" ? $e(l, u) || g : h(u, 11, dt(l)))
          : (p === 8 && _(ee.INVALID_LINKED_FORMAT, o(), 0),
            (u.braceNest = 0),
            (u.inLinked = !1),
            ot(l, u));
    }
  }
  function ot(l, u) {
    let p = { type: 14 };
    if (u.braceNest > 0) return $e(l, u) || L(u);
    if (u.inLinked) return Ze(l, u) || L(u);
    switch (l.currentChar()) {
      case "{":
        return $e(l, u) || L(u);
      case "}":
        return _(ee.UNBALANCED_CLOSING_BRACE, o(), 0), l.next(), h(u, 3, "}");
      case "@":
        return Ze(l, u) || L(u);
      default:
        if (V(l))
          return (p = h(u, 1, pt(l))), (u.braceNest = 0), (u.inLinked = !1), p;
        const { isModulo: T, hasSpace: O } = X(l);
        if (T) return O ? h(u, 0, De(l)) : h(u, 4, te(l));
        if ($(l)) return h(u, 0, De(l));
        break;
    }
    return p;
  }
  function d() {
    const { currentType: l, offset: u, startLoc: p, endLoc: g } = a;
    return (
      (a.lastType = l),
      (a.lastOffset = u),
      (a.lastStartLoc = p),
      (a.lastEndLoc = g),
      (a.offset = s()),
      (a.startLoc = o()),
      r.currentChar() === gt ? h(a, 14) : ot(r, a)
    );
  }
  return { nextToken: d, currentOffset: s, currentPosition: o, context: f };
}
const vu = "parser",
  yu = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Eu(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\";
    case "\\'":
      return "'";
    default: {
      const r = parseInt(t || n, 16);
      return r <= 55295 || r >= 57344 ? String.fromCodePoint(r) : "�";
    }
  }
}
function Cu(e = {}) {
  const t = e.location !== !1,
    { onError: n } = e;
  function r(b, I, A, y, ...C) {
    const F = b.currentPosition();
    if (((F.offset += y), (F.column += y), n)) {
      const P = Vr(A, F),
        R = fr(I, P, { domain: vu, args: C });
      n(R);
    }
  }
  function s(b, I, A) {
    const y = { type: b, start: I, end: I };
    return t && (y.loc = { start: A, end: A }), y;
  }
  function o(b, I, A, y) {
    (b.end = I), y && (b.type = y), t && b.loc && (b.loc.end = A);
  }
  function i(b, I) {
    const A = b.context(),
      y = s(3, A.offset, A.startLoc);
    return (y.value = I), o(y, b.currentOffset(), b.currentPosition()), y;
  }
  function c(b, I) {
    const A = b.context(),
      { lastOffset: y, lastStartLoc: C } = A,
      F = s(5, y, C);
    return (
      (F.index = parseInt(I, 10)),
      b.nextToken(),
      o(F, b.currentOffset(), b.currentPosition()),
      F
    );
  }
  function a(b, I) {
    const A = b.context(),
      { lastOffset: y, lastStartLoc: C } = A,
      F = s(4, y, C);
    return (
      (F.key = I),
      b.nextToken(),
      o(F, b.currentOffset(), b.currentPosition()),
      F
    );
  }
  function f(b, I) {
    const A = b.context(),
      { lastOffset: y, lastStartLoc: C } = A,
      F = s(9, y, C);
    return (
      (F.value = I.replace(yu, Eu)),
      b.nextToken(),
      o(F, b.currentOffset(), b.currentPosition()),
      F
    );
  }
  function m(b) {
    const I = b.nextToken(),
      A = b.context(),
      { lastOffset: y, lastStartLoc: C } = A,
      F = s(8, y, C);
    return I.type !== 12
      ? (r(b, ee.UNEXPECTED_EMPTY_LINKED_MODIFIER, A.lastStartLoc, 0),
        (F.value = ""),
        o(F, y, C),
        { nextConsumeToken: I, node: F })
      : (I.value == null &&
          r(b, ee.UNEXPECTED_LEXICAL_ANALYSIS, A.lastStartLoc, 0, tt(I)),
        (F.value = I.value || ""),
        o(F, b.currentOffset(), b.currentPosition()),
        { node: F });
  }
  function _(b, I) {
    const A = b.context(),
      y = s(7, A.offset, A.startLoc);
    return (y.value = I), o(y, b.currentOffset(), b.currentPosition()), y;
  }
  function h(b) {
    const I = b.context(),
      A = s(6, I.offset, I.startLoc);
    let y = b.nextToken();
    if (y.type === 9) {
      const C = m(b);
      (A.modifier = C.node), (y = C.nextConsumeToken || b.nextToken());
    }
    switch (
      (y.type !== 10 &&
        r(b, ee.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, tt(y)),
      (y = b.nextToken()),
      y.type === 2 && (y = b.nextToken()),
      y.type)
    ) {
      case 11:
        y.value == null &&
          r(b, ee.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, tt(y)),
          (A.key = _(b, y.value || ""));
        break;
      case 5:
        y.value == null &&
          r(b, ee.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, tt(y)),
          (A.key = a(b, y.value || ""));
        break;
      case 6:
        y.value == null &&
          r(b, ee.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, tt(y)),
          (A.key = c(b, y.value || ""));
        break;
      case 7:
        y.value == null &&
          r(b, ee.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, tt(y)),
          (A.key = f(b, y.value || ""));
        break;
      default:
        r(b, ee.UNEXPECTED_EMPTY_LINKED_KEY, I.lastStartLoc, 0);
        const C = b.context(),
          F = s(7, C.offset, C.startLoc);
        return (
          (F.value = ""),
          o(F, C.offset, C.startLoc),
          (A.key = F),
          o(A, C.offset, C.startLoc),
          { nextConsumeToken: y, node: A }
        );
    }
    return o(A, b.currentOffset(), b.currentPosition()), { node: A };
  }
  function L(b) {
    const I = b.context(),
      A = I.currentType === 1 ? b.currentOffset() : I.offset,
      y = I.currentType === 1 ? I.endLoc : I.startLoc,
      C = s(2, A, y);
    C.items = [];
    let F = null;
    do {
      const W = F || b.nextToken();
      switch (((F = null), W.type)) {
        case 0:
          W.value == null &&
            r(b, ee.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, tt(W)),
            C.items.push(i(b, W.value || ""));
          break;
        case 6:
          W.value == null &&
            r(b, ee.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, tt(W)),
            C.items.push(c(b, W.value || ""));
          break;
        case 5:
          W.value == null &&
            r(b, ee.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, tt(W)),
            C.items.push(a(b, W.value || ""));
          break;
        case 7:
          W.value == null &&
            r(b, ee.UNEXPECTED_LEXICAL_ANALYSIS, I.lastStartLoc, 0, tt(W)),
            C.items.push(f(b, W.value || ""));
          break;
        case 8:
          const V = h(b);
          C.items.push(V.node), (F = V.nextConsumeToken || null);
          break;
      }
    } while (I.currentType !== 14 && I.currentType !== 1);
    const P = I.currentType === 1 ? I.lastOffset : b.currentOffset(),
      R = I.currentType === 1 ? I.lastEndLoc : b.currentPosition();
    return o(C, P, R), C;
  }
  function k(b, I, A, y) {
    const C = b.context();
    let F = y.items.length === 0;
    const P = s(1, I, A);
    (P.cases = []), P.cases.push(y);
    do {
      const R = L(b);
      F || (F = R.items.length === 0), P.cases.push(R);
    } while (C.currentType !== 14);
    return (
      F && r(b, ee.MUST_HAVE_MESSAGES_IN_PLURAL, A, 0),
      o(P, b.currentOffset(), b.currentPosition()),
      P
    );
  }
  function S(b) {
    const I = b.context(),
      { offset: A, startLoc: y } = I,
      C = L(b);
    return I.currentType === 14 ? C : k(b, A, y, C);
  }
  function M(b) {
    const I = bu(b, Le({}, e)),
      A = I.context(),
      y = s(0, A.offset, A.startLoc);
    return (
      t && y.loc && (y.loc.source = b),
      (y.body = S(I)),
      A.currentType !== 14 &&
        r(
          I,
          ee.UNEXPECTED_LEXICAL_ANALYSIS,
          A.lastStartLoc,
          0,
          b[A.offset] || ""
        ),
      o(y, I.currentOffset(), I.currentPosition()),
      y
    );
  }
  return { parse: M };
}
function tt(e) {
  if (e.type === 14) return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function Tu(e, t = {}) {
  const n = { ast: e, helpers: new Set() };
  return { context: () => n, helper: (o) => (n.helpers.add(o), o) };
}
function Lo(e, t) {
  for (let n = 0; n < e.length; n++) As(e[n], t);
}
function As(e, t) {
  switch (e.type) {
    case 1:
      Lo(e.cases, t), t.helper("plural");
      break;
    case 2:
      Lo(e.items, t);
      break;
    case 6:
      As(e.key, t), t.helper("linked"), t.helper("type");
      break;
    case 5:
      t.helper("interpolate"), t.helper("list");
      break;
    case 4:
      t.helper("interpolate"), t.helper("named");
      break;
  }
}
function Lu(e, t = {}) {
  const n = Tu(e);
  n.helper("normalize"), e.body && As(e.body, n);
  const r = n.context();
  e.helpers = Array.from(r.helpers);
}
function Iu(e, t) {
  const { sourceMap: n, filename: r, breakLineCode: s, needIndent: o } = t,
    i = {
      source: e.loc.source,
      filename: r,
      code: "",
      column: 1,
      line: 1,
      offset: 0,
      map: void 0,
      breakLineCode: s,
      needIndent: o,
      indentLevel: 0,
    },
    c = () => i;
  function a(S, M) {
    i.code += S;
  }
  function f(S, M = !0) {
    const b = M ? s : "";
    a(o ? b + "  ".repeat(S) : b);
  }
  function m(S = !0) {
    const M = ++i.indentLevel;
    S && f(M);
  }
  function _(S = !0) {
    const M = --i.indentLevel;
    S && f(M);
  }
  function h() {
    f(i.indentLevel);
  }
  return {
    context: c,
    push: a,
    indent: m,
    deindent: _,
    newline: h,
    helper: (S) => `_${S}`,
    needIndent: () => i.needIndent,
  };
}
function Nu(e, t) {
  const { helper: n } = e;
  e.push(`${n("linked")}(`),
    nn(e, t.key),
    t.modifier
      ? (e.push(", "), nn(e, t.modifier), e.push(", _type"))
      : e.push(", undefined, _type"),
    e.push(")");
}
function Su(e, t) {
  const { helper: n, needIndent: r } = e;
  e.push(`${n("normalize")}([`), e.indent(r());
  const s = t.items.length;
  for (let o = 0; o < s && (nn(e, t.items[o]), o !== s - 1); o++) e.push(", ");
  e.deindent(r()), e.push("])");
}
function Ou(e, t) {
  const { helper: n, needIndent: r } = e;
  if (t.cases.length > 1) {
    e.push(`${n("plural")}([`), e.indent(r());
    const s = t.cases.length;
    for (let o = 0; o < s && (nn(e, t.cases[o]), o !== s - 1); o++)
      e.push(", ");
    e.deindent(r()), e.push("])");
  }
}
function Au(e, t) {
  t.body ? nn(e, t.body) : e.push("null");
}
function nn(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Au(e, t);
      break;
    case 1:
      Ou(e, t);
      break;
    case 2:
      Su(e, t);
      break;
    case 6:
      Nu(e, t);
      break;
    case 8:
      e.push(JSON.stringify(t.value), t);
      break;
    case 7:
      e.push(JSON.stringify(t.value), t);
      break;
    case 5:
      e.push(`${n("interpolate")}(${n("list")}(${t.index}))`, t);
      break;
    case 4:
      e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`, t);
      break;
    case 9:
      e.push(JSON.stringify(t.value), t);
      break;
    case 3:
      e.push(JSON.stringify(t.value), t);
      break;
  }
}
const wu = (e, t = {}) => {
  const n = U(t.mode) ? t.mode : "normal",
    r = U(t.filename) ? t.filename : "message.intl",
    s = !!t.sourceMap,
    o =
      t.breakLineCode != null
        ? t.breakLineCode
        : n === "arrow"
        ? ";"
        : `
`,
    i = t.needIndent ? t.needIndent : n !== "arrow",
    c = e.helpers || [],
    a = Iu(e, {
      mode: n,
      filename: r,
      sourceMap: s,
      breakLineCode: o,
      needIndent: i,
    });
  a.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"),
    a.indent(i),
    c.length > 0 &&
      (a.push(`const { ${c.map((_) => `${_}: _${_}`).join(", ")} } = ctx`),
      a.newline()),
    a.push("return "),
    nn(a, e),
    a.deindent(i),
    a.push("}");
  const { code: f, map: m } = a.context();
  return { ast: e, code: f, map: m ? m.toJSON() : void 0 };
};
function xu(e, t = {}) {
  const n = Le({}, t),
    s = Cu(n).parse(e);
  return Lu(s, n), wu(s, n);
}
/*!
 * core-base v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const Nt = [];
Nt[0] = { w: [0], i: [3, 0], ["["]: [4], o: [7] };
Nt[1] = { w: [1], ["."]: [2], ["["]: [4], o: [7] };
Nt[2] = { w: [2], i: [3, 0], [0]: [3, 0] };
Nt[3] = {
  i: [3, 0],
  [0]: [3, 0],
  w: [1, 1],
  ["."]: [2, 1],
  ["["]: [4, 1],
  o: [7, 1],
};
Nt[4] = {
  ["'"]: [5, 0],
  ['"']: [6, 0],
  ["["]: [4, 2],
  ["]"]: [1, 3],
  o: 8,
  l: [4, 0],
};
Nt[5] = { ["'"]: [4, 0], o: 8, l: [5, 0] };
Nt[6] = { ['"']: [4, 0], o: 8, l: [6, 0] };
const Pu = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function ku(e) {
  return Pu.test(e);
}
function Mu(e) {
  const t = e.charCodeAt(0),
    n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Ru(e) {
  if (e == null) return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function Fu(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e))
    ? !1
    : ku(t)
    ? Mu(t)
    : "*" + t;
}
function Du(e) {
  const t = [];
  let n = -1,
    r = 0,
    s = 0,
    o,
    i,
    c,
    a,
    f,
    m,
    _;
  const h = [];
  (h[0] = () => {
    i === void 0 ? (i = c) : (i += c);
  }),
    (h[1] = () => {
      i !== void 0 && (t.push(i), (i = void 0));
    }),
    (h[2] = () => {
      h[0](), s++;
    }),
    (h[3] = () => {
      if (s > 0) s--, (r = 4), h[0]();
      else {
        if (((s = 0), i === void 0 || ((i = Fu(i)), i === !1))) return !1;
        h[1]();
      }
    });
  function L() {
    const k = e[n + 1];
    if ((r === 5 && k === "'") || (r === 6 && k === '"'))
      return n++, (c = "\\" + k), h[0](), !0;
  }
  for (; r !== null; )
    if ((n++, (o = e[n]), !(o === "\\" && L()))) {
      if (
        ((a = Ru(o)),
        (_ = Nt[r]),
        (f = _[a] || _.l || 8),
        f === 8 ||
          ((r = f[0]),
          f[1] !== void 0 && ((m = h[f[1]]), m && ((c = o), m() === !1))))
      )
        return;
      if (r === 7) return t;
    }
}
const Io = new Map();
function $u(e, t) {
  return ie(e) ? e[t] : null;
}
function Uu(e, t) {
  if (!ie(e)) return null;
  let n = Io.get(t);
  if ((n || ((n = Du(t)), n && Io.set(t, n)), !n)) return null;
  const r = n.length;
  let s = e,
    o = 0;
  for (; o < r; ) {
    const i = s[n[o]];
    if (i === void 0) return null;
    (s = i), o++;
  }
  return s;
}
const ju = (e) => e,
  Wu = (e) => "",
  Hu = "text",
  Vu = (e) => (e.length === 0 ? "" : e.join("")),
  Bu = uu;
function No(e, t) {
  return (
    (e = Math.abs(e)),
    t === 2 ? (e ? (e > 1 ? 1 : 0) : 1) : e ? Math.min(e, 2) : 0
  );
}
function Ku(e) {
  const t = ve(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (ve(e.named.count) || ve(e.named.n))
    ? ve(e.named.count)
      ? e.named.count
      : ve(e.named.n)
      ? e.named.n
      : t
    : t;
}
function Xu(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function qu(e = {}) {
  const t = e.locale,
    n = Ku(e),
    r =
      ie(e.pluralRules) && U(t) && ye(e.pluralRules[t]) ? e.pluralRules[t] : No,
    s = ie(e.pluralRules) && U(t) && ye(e.pluralRules[t]) ? No : void 0,
    o = (b) => b[r(n, b.length, s)],
    i = e.list || [],
    c = (b) => i[b],
    a = e.named || {};
  ve(e.pluralIndex) && Xu(n, a);
  const f = (b) => a[b];
  function m(b) {
    const I = ye(e.messages)
      ? e.messages(b)
      : ie(e.messages)
      ? e.messages[b]
      : !1;
    return I || (e.parent ? e.parent.message(b) : Wu);
  }
  const _ = (b) => (e.modifiers ? e.modifiers[b] : ju),
    h =
      Z(e.processor) && ye(e.processor.normalize) ? e.processor.normalize : Vu,
    L =
      Z(e.processor) && ye(e.processor.interpolate)
        ? e.processor.interpolate
        : Bu,
    k = Z(e.processor) && U(e.processor.type) ? e.processor.type : Hu,
    M = {
      list: c,
      named: f,
      plural: o,
      linked: (b, ...I) => {
        const [A, y] = I;
        let C = "text",
          F = "";
        I.length === 1
          ? ie(A)
            ? ((F = A.modifier || F), (C = A.type || C))
            : U(A) && (F = A || F)
          : I.length === 2 && (U(A) && (F = A || F), U(y) && (C = y || C));
        let P = m(b)(M);
        return C === "vnode" && he(P) && F && (P = P[0]), F ? _(F)(P, C) : P;
      },
      message: m,
      type: k,
      interpolate: L,
      normalize: h,
    };
  return M;
}
function Yu(e, t, n) {
  return [
    ...new Set([n, ...(he(t) ? t : ie(t) ? Object.keys(t) : U(t) ? [t] : [n])]),
  ];
}
function Xi(e, t, n) {
  const r = U(n) ? n : ws,
    s = e;
  s.__localeChainCache || (s.__localeChainCache = new Map());
  let o = s.__localeChainCache.get(r);
  if (!o) {
    o = [];
    let i = [n];
    for (; he(i); ) i = So(o, i, t);
    const c = he(t) || !Z(t) ? t : t.default ? t.default : null;
    (i = U(c) ? [c] : c), he(i) && So(o, i, !1), s.__localeChainCache.set(r, o);
  }
  return o;
}
function So(e, t, n) {
  let r = !0;
  for (let s = 0; s < t.length && _e(r); s++) {
    const o = t[s];
    U(o) && (r = Gu(e, t[s], n));
  }
  return r;
}
function Gu(e, t, n) {
  let r;
  const s = t.split("-");
  do {
    const o = s.join("-");
    (r = Ju(e, o, n)), s.splice(-1, 1);
  } while (s.length && r === !0);
  return r;
}
function Ju(e, t, n) {
  let r = !1;
  if (!e.includes(t) && ((r = !0), t)) {
    r = t[t.length - 1] !== "!";
    const s = t.replace(/!/g, "");
    e.push(s), (he(n) || Z(n)) && n[s] && (r = n[s]);
  }
  return r;
}
const Qu = "9.2.2",
  dr = -1,
  ws = "en-US",
  Oo = "",
  Ao = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Zu() {
  return {
    upper: (e, t) =>
      t === "text" && U(e)
        ? e.toUpperCase()
        : t === "vnode" && ie(e) && "__v_isVNode" in e
        ? e.children.toUpperCase()
        : e,
    lower: (e, t) =>
      t === "text" && U(e)
        ? e.toLowerCase()
        : t === "vnode" && ie(e) && "__v_isVNode" in e
        ? e.children.toLowerCase()
        : e,
    capitalize: (e, t) =>
      t === "text" && U(e)
        ? Ao(e)
        : t === "vnode" && ie(e) && "__v_isVNode" in e
        ? Ao(e.children)
        : e,
  };
}
let qi;
function zu(e) {
  qi = e;
}
let Yi;
function ef(e) {
  Yi = e;
}
let Gi;
function tf(e) {
  Gi = e;
}
let wo = 0;
function nf(e = {}) {
  const t = U(e.version) ? e.version : Qu,
    n = U(e.locale) ? e.locale : ws,
    r =
      he(e.fallbackLocale) ||
      Z(e.fallbackLocale) ||
      U(e.fallbackLocale) ||
      e.fallbackLocale === !1
        ? e.fallbackLocale
        : n,
    s = Z(e.messages) ? e.messages : { [n]: {} },
    o = Z(e.datetimeFormats) ? e.datetimeFormats : { [n]: {} },
    i = Z(e.numberFormats) ? e.numberFormats : { [n]: {} },
    c = Le({}, e.modifiers || {}, Zu()),
    a = e.pluralRules || {},
    f = ye(e.missing) ? e.missing : null,
    m = _e(e.missingWarn) || Gn(e.missingWarn) ? e.missingWarn : !0,
    _ = _e(e.fallbackWarn) || Gn(e.fallbackWarn) ? e.fallbackWarn : !0,
    h = !!e.fallbackFormat,
    L = !!e.unresolving,
    k = ye(e.postTranslation) ? e.postTranslation : null,
    S = Z(e.processor) ? e.processor : null,
    M = _e(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
    b = !!e.escapeParameter,
    I = ye(e.messageCompiler) ? e.messageCompiler : qi,
    A = ye(e.messageResolver) ? e.messageResolver : Yi || $u,
    y = ye(e.localeFallbacker) ? e.localeFallbacker : Gi || Yu,
    C = ie(e.fallbackContext) ? e.fallbackContext : void 0,
    F = ye(e.onWarn) ? e.onWarn : cu,
    P = e,
    R = ie(P.__datetimeFormatters) ? P.__datetimeFormatters : new Map(),
    W = ie(P.__numberFormatters) ? P.__numberFormatters : new Map(),
    V = ie(P.__meta) ? P.__meta : {};
  wo++;
  const X = {
    version: t,
    cid: wo,
    locale: n,
    fallbackLocale: r,
    messages: s,
    modifiers: c,
    pluralRules: a,
    missing: f,
    missingWarn: m,
    fallbackWarn: _,
    fallbackFormat: h,
    unresolving: L,
    postTranslation: k,
    processor: S,
    warnHtmlMessage: M,
    escapeParameter: b,
    messageCompiler: I,
    messageResolver: A,
    localeFallbacker: y,
    fallbackContext: C,
    onWarn: F,
    __meta: V,
  };
  return (
    (X.datetimeFormats = o),
    (X.numberFormats = i),
    (X.__datetimeFormatters = R),
    (X.__numberFormatters = W),
    X
  );
}
function xs(e, t, n, r, s) {
  const { missing: o, onWarn: i } = e;
  if (o !== null) {
    const c = o(e, n, t, s);
    return U(c) ? c : t;
  } else return t;
}
function dn(e, t, n) {
  const r = e;
  (r.__localeChainCache = new Map()), e.localeFallbacker(e, n, t);
}
const rf = (e) => e;
let xo = Object.create(null);
function sf(e, t = {}) {
  {
    const r = (t.onCacheKey || rf)(e),
      s = xo[r];
    if (s) return s;
    let o = !1;
    const i = t.onError || fu;
    t.onError = (f) => {
      (o = !0), i(f);
    };
    const { code: c } = xu(e, t),
      a = new Function(`return ${c}`)();
    return o ? a : (xo[r] = a);
  }
}
let Ji = ee.__EXTEND_POINT__;
const Lr = () => ++Ji,
  Kt = {
    INVALID_ARGUMENT: Ji,
    INVALID_DATE_ARGUMENT: Lr(),
    INVALID_ISO_DATE_ARGUMENT: Lr(),
    __EXTEND_POINT__: Lr(),
  };
function Xt(e) {
  return fr(e, null, void 0);
}
const Po = () => "",
  Dt = (e) => ye(e);
function ko(e, ...t) {
  const {
      fallbackFormat: n,
      postTranslation: r,
      unresolving: s,
      messageCompiler: o,
      fallbackLocale: i,
      messages: c,
    } = e,
    [a, f] = Br(...t),
    m = _e(f.missingWarn) ? f.missingWarn : e.missingWarn,
    _ = _e(f.fallbackWarn) ? f.fallbackWarn : e.fallbackWarn,
    h = _e(f.escapeParameter) ? f.escapeParameter : e.escapeParameter,
    L = !!f.resolvedMessage,
    k =
      U(f.default) || _e(f.default)
        ? _e(f.default)
          ? o
            ? a
            : () => a
          : f.default
        : n
        ? o
          ? a
          : () => a
        : "",
    S = n || k !== "",
    M = U(f.locale) ? f.locale : e.locale;
  h && of(f);
  let [b, I, A] = L ? [a, M, c[M] || {}] : Qi(e, a, M, i, _, m),
    y = b,
    C = a;
  if (
    (!L && !(U(y) || Dt(y)) && S && ((y = k), (C = y)),
    !L && (!(U(y) || Dt(y)) || !U(I)))
  )
    return s ? dr : a;
  let F = !1;
  const P = () => {
      F = !0;
    },
    R = Dt(y) ? y : Zi(e, a, I, y, C, P);
  if (F) return y;
  const W = af(e, I, A, f),
    V = qu(W),
    X = lf(e, R, V);
  return r ? r(X, a) : X;
}
function of(e) {
  he(e.list)
    ? (e.list = e.list.map((t) => (U(t) ? Co(t) : t)))
    : ie(e.named) &&
      Object.keys(e.named).forEach((t) => {
        U(e.named[t]) && (e.named[t] = Co(e.named[t]));
      });
}
function Qi(e, t, n, r, s, o) {
  const { messages: i, onWarn: c, messageResolver: a, localeFallbacker: f } = e,
    m = f(e, r, n);
  let _ = {},
    h,
    L = null;
  const k = "translate";
  for (
    let S = 0;
    S < m.length &&
    ((h = m[S]),
    (_ = i[h] || {}),
    (L = a(_, t)) === null && (L = _[t]),
    !(U(L) || ye(L)));
    S++
  ) {
    const M = xs(e, t, h, o, k);
    M !== t && (L = M);
  }
  return [L, h, _];
}
function Zi(e, t, n, r, s, o) {
  const { messageCompiler: i, warnHtmlMessage: c } = e;
  if (Dt(r)) {
    const f = r;
    return (f.locale = f.locale || n), (f.key = f.key || t), f;
  }
  if (i == null) {
    const f = () => r;
    return (f.locale = n), (f.key = t), f;
  }
  const a = i(r, cf(e, n, s, r, c, o));
  return (a.locale = n), (a.key = t), (a.source = r), a;
}
function lf(e, t, n) {
  return t(n);
}
function Br(...e) {
  const [t, n, r] = e,
    s = {};
  if (!U(t) && !ve(t) && !Dt(t)) throw Xt(Kt.INVALID_ARGUMENT);
  const o = ve(t) ? String(t) : (Dt(t), t);
  return (
    ve(n)
      ? (s.plural = n)
      : U(n)
      ? (s.default = n)
      : Z(n) && !ur(n)
      ? (s.named = n)
      : he(n) && (s.list = n),
    ve(r) ? (s.plural = r) : U(r) ? (s.default = r) : Z(r) && Le(s, r),
    [o, s]
  );
}
function cf(e, t, n, r, s, o) {
  return {
    warnHtmlMessage: s,
    onError: (i) => {
      throw (o && o(i), i);
    },
    onCacheKey: (i) => ou(t, n, i),
  };
}
function af(e, t, n, r) {
  const {
      modifiers: s,
      pluralRules: o,
      messageResolver: i,
      fallbackLocale: c,
      fallbackWarn: a,
      missingWarn: f,
      fallbackContext: m,
    } = e,
    h = {
      locale: t,
      modifiers: s,
      pluralRules: o,
      messages: (L) => {
        let k = i(n, L);
        if (k == null && m) {
          const [, , S] = Qi(m, L, t, c, a, f);
          k = i(S, L);
        }
        if (U(k)) {
          let S = !1;
          const b = Zi(e, L, t, k, L, () => {
            S = !0;
          });
          return S ? Po : b;
        } else return Dt(k) ? k : Po;
      },
    };
  return (
    e.processor && (h.processor = e.processor),
    r.list && (h.list = r.list),
    r.named && (h.named = r.named),
    ve(r.plural) && (h.pluralIndex = r.plural),
    h
  );
}
function Mo(e, ...t) {
  const {
      datetimeFormats: n,
      unresolving: r,
      fallbackLocale: s,
      onWarn: o,
      localeFallbacker: i,
    } = e,
    { __datetimeFormatters: c } = e,
    [a, f, m, _] = Kr(...t),
    h = _e(m.missingWarn) ? m.missingWarn : e.missingWarn;
  _e(m.fallbackWarn) ? m.fallbackWarn : e.fallbackWarn;
  const L = !!m.part,
    k = U(m.locale) ? m.locale : e.locale,
    S = i(e, s, k);
  if (!U(a) || a === "") return new Intl.DateTimeFormat(k, _).format(f);
  let M = {},
    b,
    I = null;
  const A = "datetime format";
  for (
    let F = 0;
    F < S.length && ((b = S[F]), (M = n[b] || {}), (I = M[a]), !Z(I));
    F++
  )
    xs(e, a, b, h, A);
  if (!Z(I) || !U(b)) return r ? dr : a;
  let y = `${b}__${a}`;
  ur(_) || (y = `${y}__${JSON.stringify(_)}`);
  let C = c.get(y);
  return (
    C || ((C = new Intl.DateTimeFormat(b, Le({}, I, _))), c.set(y, C)),
    L ? C.formatToParts(f) : C.format(f)
  );
}
const zi = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits",
];
function Kr(...e) {
  const [t, n, r, s] = e,
    o = {};
  let i = {},
    c;
  if (U(t)) {
    const a = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!a) throw Xt(Kt.INVALID_ISO_DATE_ARGUMENT);
    const f = a[3]
      ? a[3].trim().startsWith("T")
        ? `${a[1].trim()}${a[3].trim()}`
        : `${a[1].trim()}T${a[3].trim()}`
      : a[1].trim();
    c = new Date(f);
    try {
      c.toISOString();
    } catch {
      throw Xt(Kt.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (lu(t)) {
    if (isNaN(t.getTime())) throw Xt(Kt.INVALID_DATE_ARGUMENT);
    c = t;
  } else if (ve(t)) c = t;
  else throw Xt(Kt.INVALID_ARGUMENT);
  return (
    U(n)
      ? (o.key = n)
      : Z(n) &&
        Object.keys(n).forEach((a) => {
          zi.includes(a) ? (i[a] = n[a]) : (o[a] = n[a]);
        }),
    U(r) ? (o.locale = r) : Z(r) && (i = r),
    Z(s) && (i = s),
    [o.key || "", c, o, i]
  );
}
function Ro(e, t, n) {
  const r = e;
  for (const s in n) {
    const o = `${t}__${s}`;
    r.__datetimeFormatters.has(o) && r.__datetimeFormatters.delete(o);
  }
}
function Fo(e, ...t) {
  const {
      numberFormats: n,
      unresolving: r,
      fallbackLocale: s,
      onWarn: o,
      localeFallbacker: i,
    } = e,
    { __numberFormatters: c } = e,
    [a, f, m, _] = Xr(...t),
    h = _e(m.missingWarn) ? m.missingWarn : e.missingWarn;
  _e(m.fallbackWarn) ? m.fallbackWarn : e.fallbackWarn;
  const L = !!m.part,
    k = U(m.locale) ? m.locale : e.locale,
    S = i(e, s, k);
  if (!U(a) || a === "") return new Intl.NumberFormat(k, _).format(f);
  let M = {},
    b,
    I = null;
  const A = "number format";
  for (
    let F = 0;
    F < S.length && ((b = S[F]), (M = n[b] || {}), (I = M[a]), !Z(I));
    F++
  )
    xs(e, a, b, h, A);
  if (!Z(I) || !U(b)) return r ? dr : a;
  let y = `${b}__${a}`;
  ur(_) || (y = `${y}__${JSON.stringify(_)}`);
  let C = c.get(y);
  return (
    C || ((C = new Intl.NumberFormat(b, Le({}, I, _))), c.set(y, C)),
    L ? C.formatToParts(f) : C.format(f)
  );
}
const el = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay",
];
function Xr(...e) {
  const [t, n, r, s] = e,
    o = {};
  let i = {};
  if (!ve(t)) throw Xt(Kt.INVALID_ARGUMENT);
  const c = t;
  return (
    U(n)
      ? (o.key = n)
      : Z(n) &&
        Object.keys(n).forEach((a) => {
          el.includes(a) ? (i[a] = n[a]) : (o[a] = n[a]);
        }),
    U(r) ? (o.locale = r) : Z(r) && (i = r),
    Z(s) && (i = s),
    [o.key || "", c, o, i]
  );
}
function Do(e, t, n) {
  const r = e;
  for (const s in n) {
    const o = `${t}__${s}`;
    r.__numberFormatters.has(o) && r.__numberFormatters.delete(o);
  }
}
/*!
 * vue-i18n v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const uf = "9.2.2";
let tl = ee.__EXTEND_POINT__;
const Oe = () => ++tl,
  Re = {
    UNEXPECTED_RETURN_TYPE: tl,
    INVALID_ARGUMENT: Oe(),
    MUST_BE_CALL_SETUP_TOP: Oe(),
    NOT_INSLALLED: Oe(),
    NOT_AVAILABLE_IN_LEGACY_MODE: Oe(),
    REQUIRED_VALUE: Oe(),
    INVALID_VALUE: Oe(),
    CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: Oe(),
    NOT_INSLALLED_WITH_PROVIDE: Oe(),
    UNEXPECTED_ERROR: Oe(),
    NOT_COMPATIBLE_LEGACY_VUE_I18N: Oe(),
    BRIDGE_SUPPORT_VUE_2_ONLY: Oe(),
    MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: Oe(),
    NOT_AVAILABLE_COMPOSITION_IN_LEGACY: Oe(),
    __EXTEND_POINT__: Oe(),
  };
function Ke(e, ...t) {
  return fr(e, null, void 0);
}
const qr = It("__transrateVNode"),
  Yr = It("__datetimeParts"),
  Gr = It("__numberParts"),
  ff = It("__setPluralRules");
It("__intlifyMeta");
const df = It("__injectWithOption");
function Jr(e) {
  if (!ie(e)) return e;
  for (const t in e)
    if (Ss(e, t))
      if (!t.includes(".")) ie(e[t]) && Jr(e[t]);
      else {
        const n = t.split("."),
          r = n.length - 1;
        let s = e;
        for (let o = 0; o < r; o++) n[o] in s || (s[n[o]] = {}), (s = s[n[o]]);
        (s[n[r]] = e[t]), delete e[t], ie(s[n[r]]) && Jr(s[n[r]]);
      }
  return e;
}
function nl(e, t) {
  const { messages: n, __i18n: r, messageResolver: s, flatJson: o } = t,
    i = Z(n) ? n : he(r) ? {} : { [e]: {} };
  if (
    (he(r) &&
      r.forEach((c) => {
        if ("locale" in c && "resource" in c) {
          const { locale: a, resource: f } = c;
          a ? ((i[a] = i[a] || {}), bn(f, i[a])) : bn(f, i);
        } else U(c) && bn(JSON.parse(c), i);
      }),
    s == null && o)
  )
    for (const c in i) Ss(i, c) && Jr(i[c]);
  return i;
}
const $n = (e) => !ie(e) || he(e);
function bn(e, t) {
  if ($n(e) || $n(t)) throw Ke(Re.INVALID_VALUE);
  for (const n in e)
    Ss(e, n) && ($n(e[n]) || $n(t[n]) ? (t[n] = e[n]) : bn(e[n], t[n]));
}
function pf(e) {
  return e.type;
}
function mf(e, t, n) {
  let r = ie(t.messages) ? t.messages : {};
  "__i18nGlobal" in n &&
    (r = nl(e.locale.value, { messages: r, __i18n: n.__i18nGlobal }));
  const s = Object.keys(r);
  s.length &&
    s.forEach((o) => {
      e.mergeLocaleMessage(o, r[o]);
    });
  {
    if (ie(t.datetimeFormats)) {
      const o = Object.keys(t.datetimeFormats);
      o.length &&
        o.forEach((i) => {
          e.mergeDateTimeFormat(i, t.datetimeFormats[i]);
        });
    }
    if (ie(t.numberFormats)) {
      const o = Object.keys(t.numberFormats);
      o.length &&
        o.forEach((i) => {
          e.mergeNumberFormat(i, t.numberFormats[i]);
        });
    }
  }
}
function $o(e) {
  return oe(wn, null, e, 0);
}
let Uo = 0;
function jo(e) {
  return (t, n, r, s) => e(n, r, ln() || void 0, s);
}
function rl(e = {}, t) {
  const { __root: n } = e,
    r = n === void 0;
  let s = _e(e.inheritLocale) ? e.inheritLocale : !0;
  const o = re(n && s ? n.locale.value : U(e.locale) ? e.locale : ws),
    i = re(
      n && s
        ? n.fallbackLocale.value
        : U(e.fallbackLocale) ||
          he(e.fallbackLocale) ||
          Z(e.fallbackLocale) ||
          e.fallbackLocale === !1
        ? e.fallbackLocale
        : o.value
    ),
    c = re(nl(o.value, e)),
    a = re(Z(e.datetimeFormats) ? e.datetimeFormats : { [o.value]: {} }),
    f = re(Z(e.numberFormats) ? e.numberFormats : { [o.value]: {} });
  let m = n
      ? n.missingWarn
      : _e(e.missingWarn) || Gn(e.missingWarn)
      ? e.missingWarn
      : !0,
    _ = n
      ? n.fallbackWarn
      : _e(e.fallbackWarn) || Gn(e.fallbackWarn)
      ? e.fallbackWarn
      : !0,
    h = n ? n.fallbackRoot : _e(e.fallbackRoot) ? e.fallbackRoot : !0,
    L = !!e.fallbackFormat,
    k = ye(e.missing) ? e.missing : null,
    S = ye(e.missing) ? jo(e.missing) : null,
    M = ye(e.postTranslation) ? e.postTranslation : null,
    b = n ? n.warnHtmlMessage : _e(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
    I = !!e.escapeParameter;
  const A = n ? n.modifiers : Z(e.modifiers) ? e.modifiers : {};
  let y = e.pluralRules || (n && n.pluralRules),
    C;
  (C = (() => {
    const v = {
      version: uf,
      locale: o.value,
      fallbackLocale: i.value,
      messages: c.value,
      modifiers: A,
      pluralRules: y,
      missing: S === null ? void 0 : S,
      missingWarn: m,
      fallbackWarn: _,
      fallbackFormat: L,
      unresolving: !0,
      postTranslation: M === null ? void 0 : M,
      warnHtmlMessage: b,
      escapeParameter: I,
      messageResolver: e.messageResolver,
      __meta: { framework: "vue" },
    };
    return (
      (v.datetimeFormats = a.value),
      (v.numberFormats = f.value),
      (v.__datetimeFormatters = Z(C) ? C.__datetimeFormatters : void 0),
      (v.__numberFormatters = Z(C) ? C.__numberFormatters : void 0),
      nf(v)
    );
  })()),
    dn(C, o.value, i.value);
  function P() {
    return [o.value, i.value, c.value, a.value, f.value];
  }
  const R = We({
      get: () => o.value,
      set: (v) => {
        (o.value = v), (C.locale = o.value);
      },
    }),
    W = We({
      get: () => i.value,
      set: (v) => {
        (i.value = v), (C.fallbackLocale = i.value), dn(C, o.value, v);
      },
    }),
    V = We(() => c.value),
    X = We(() => a.value),
    $ = We(() => f.value);
  function J() {
    return ye(M) ? M : null;
  }
  function ae(v) {
    (M = v), (C.postTranslation = v);
  }
  function de() {
    return k;
  }
  function pe(v) {
    v !== null && (S = jo(v)), (k = v), (C.missing = S);
  }
  const z = (v, E, D, j, K, ne) => {
    P();
    let q;
    if (((q = v(C)), ve(q) && q === dr)) {
      const [me, Ue] = E();
      return n && h ? j(n) : K(me);
    } else {
      if (ne(q)) return q;
      throw Ke(Re.UNEXPECTED_RETURN_TYPE);
    }
  };
  function te(...v) {
    return z(
      (E) => Reflect.apply(ko, null, [E, ...v]),
      () => Br(...v),
      "translate",
      (E) => Reflect.apply(E.t, E, [...v]),
      (E) => E,
      (E) => U(E)
    );
  }
  function De(...v) {
    const [E, D, j] = v;
    if (j && !ie(j)) throw Ke(Re.INVALID_ARGUMENT);
    return te(E, D, Le({ resolvedMessage: !0 }, j || {}));
  }
  function ft(...v) {
    return z(
      (E) => Reflect.apply(Mo, null, [E, ...v]),
      () => Kr(...v),
      "datetime format",
      (E) => Reflect.apply(E.d, E, [...v]),
      () => Oo,
      (E) => U(E)
    );
  }
  function qe(...v) {
    return z(
      (E) => Reflect.apply(Fo, null, [E, ...v]),
      () => Xr(...v),
      "number format",
      (E) => Reflect.apply(E.n, E, [...v]),
      () => Oo,
      (E) => U(E)
    );
  }
  function Se(v) {
    return v.map((E) => (U(E) || ve(E) || _e(E) ? $o(String(E)) : E));
  }
  const jt = { normalize: Se, interpolate: (v) => v, type: "vnode" };
  function an(...v) {
    return z(
      (E) => {
        let D;
        const j = E;
        try {
          (j.processor = jt), (D = Reflect.apply(ko, null, [j, ...v]));
        } finally {
          j.processor = null;
        }
        return D;
      },
      () => Br(...v),
      "translate",
      (E) => E[qr](...v),
      (E) => [$o(E)],
      (E) => he(E)
    );
  }
  function xe(...v) {
    return z(
      (E) => Reflect.apply(Fo, null, [E, ...v]),
      () => Xr(...v),
      "number format",
      (E) => E[Gr](...v),
      () => [],
      (E) => U(E) || he(E)
    );
  }
  function dt(...v) {
    return z(
      (E) => Reflect.apply(Mo, null, [E, ...v]),
      () => Kr(...v),
      "datetime format",
      (E) => E[Yr](...v),
      () => [],
      (E) => U(E) || he(E)
    );
  }
  function pt(v) {
    (y = v), (C.pluralRules = y);
  }
  function $e(v, E) {
    const D = U(E) ? E : o.value,
      j = d(D);
    return C.messageResolver(j, v) !== null;
  }
  function Ze(v) {
    let E = null;
    const D = Xi(C, i.value, o.value);
    for (let j = 0; j < D.length; j++) {
      const K = c.value[D[j]] || {},
        ne = C.messageResolver(K, v);
      if (ne != null) {
        E = ne;
        break;
      }
    }
    return E;
  }
  function ot(v) {
    const E = Ze(v);
    return E ?? (n ? n.tm(v) || {} : {});
  }
  function d(v) {
    return c.value[v] || {};
  }
  function l(v, E) {
    (c.value[v] = E), (C.messages = c.value);
  }
  function u(v, E) {
    (c.value[v] = c.value[v] || {}), bn(E, c.value[v]), (C.messages = c.value);
  }
  function p(v) {
    return a.value[v] || {};
  }
  function g(v, E) {
    (a.value[v] = E), (C.datetimeFormats = a.value), Ro(C, v, E);
  }
  function T(v, E) {
    (a.value[v] = Le(a.value[v] || {}, E)),
      (C.datetimeFormats = a.value),
      Ro(C, v, E);
  }
  function O(v) {
    return f.value[v] || {};
  }
  function w(v, E) {
    (f.value[v] = E), (C.numberFormats = f.value), Do(C, v, E);
  }
  function x(v, E) {
    (f.value[v] = Le(f.value[v] || {}, E)),
      (C.numberFormats = f.value),
      Do(C, v, E);
  }
  Uo++,
    n &&
      Hr &&
      (Me(n.locale, (v) => {
        s && ((o.value = v), (C.locale = v), dn(C, o.value, i.value));
      }),
      Me(n.fallbackLocale, (v) => {
        s && ((i.value = v), (C.fallbackLocale = v), dn(C, o.value, i.value));
      }));
  const N = {
    id: Uo,
    locale: R,
    fallbackLocale: W,
    get inheritLocale() {
      return s;
    },
    set inheritLocale(v) {
      (s = v),
        v &&
          n &&
          ((o.value = n.locale.value),
          (i.value = n.fallbackLocale.value),
          dn(C, o.value, i.value));
    },
    get availableLocales() {
      return Object.keys(c.value).sort();
    },
    messages: V,
    get modifiers() {
      return A;
    },
    get pluralRules() {
      return y || {};
    },
    get isGlobal() {
      return r;
    },
    get missingWarn() {
      return m;
    },
    set missingWarn(v) {
      (m = v), (C.missingWarn = m);
    },
    get fallbackWarn() {
      return _;
    },
    set fallbackWarn(v) {
      (_ = v), (C.fallbackWarn = _);
    },
    get fallbackRoot() {
      return h;
    },
    set fallbackRoot(v) {
      h = v;
    },
    get fallbackFormat() {
      return L;
    },
    set fallbackFormat(v) {
      (L = v), (C.fallbackFormat = L);
    },
    get warnHtmlMessage() {
      return b;
    },
    set warnHtmlMessage(v) {
      (b = v), (C.warnHtmlMessage = v);
    },
    get escapeParameter() {
      return I;
    },
    set escapeParameter(v) {
      (I = v), (C.escapeParameter = v);
    },
    t: te,
    getLocaleMessage: d,
    setLocaleMessage: l,
    mergeLocaleMessage: u,
    getPostTranslationHandler: J,
    setPostTranslationHandler: ae,
    getMissingHandler: de,
    setMissingHandler: pe,
    [ff]: pt,
  };
  return (
    (N.datetimeFormats = X),
    (N.numberFormats = $),
    (N.rt = De),
    (N.te = $e),
    (N.tm = ot),
    (N.d = ft),
    (N.n = qe),
    (N.getDateTimeFormat = p),
    (N.setDateTimeFormat = g),
    (N.mergeDateTimeFormat = T),
    (N.getNumberFormat = O),
    (N.setNumberFormat = w),
    (N.mergeNumberFormat = x),
    (N[df] = e.__injectWithOption),
    (N[qr] = an),
    (N[Yr] = dt),
    (N[Gr] = xe),
    N
  );
}
const Ps = {
  tag: { type: [String, Object] },
  locale: { type: String },
  scope: {
    type: String,
    validator: (e) => e === "parent" || e === "global",
    default: "parent",
  },
  i18n: { type: Object },
};
function _f({ slots: e }, t) {
  return t.length === 1 && t[0] === "default"
    ? (e.default ? e.default() : []).reduce(
        (r, s) => (r = [...r, ...(he(s.children) ? s.children : [s])]),
        []
      )
    : t.reduce((n, r) => {
        const s = e[r];
        return s && (n[r] = s()), n;
      }, {});
}
function sl(e) {
  return Ce;
}
const Wo = {
  name: "i18n-t",
  props: Le(
    {
      keypath: { type: String, required: !0 },
      plural: { type: [Number, String], validator: (e) => ve(e) || !isNaN(e) },
    },
    Ps
  ),
  setup(e, t) {
    const { slots: n, attrs: r } = t,
      s = e.i18n || Ut({ useScope: e.scope, __useComponent: !0 });
    return () => {
      const o = Object.keys(n).filter((_) => _ !== "_"),
        i = {};
      e.locale && (i.locale = e.locale),
        e.plural !== void 0 && (i.plural = U(e.plural) ? +e.plural : e.plural);
      const c = _f(t, o),
        a = s[qr](e.keypath, c, i),
        f = Le({}, r),
        m = U(e.tag) || ie(e.tag) ? e.tag : sl();
      return Is(m, f, a);
    };
  },
};
function hf(e) {
  return he(e) && !U(e[0]);
}
function ol(e, t, n, r) {
  const { slots: s, attrs: o } = t;
  return () => {
    const i = { part: !0 };
    let c = {};
    e.locale && (i.locale = e.locale),
      U(e.format)
        ? (i.key = e.format)
        : ie(e.format) &&
          (U(e.format.key) && (i.key = e.format.key),
          (c = Object.keys(e.format).reduce(
            (h, L) => (n.includes(L) ? Le({}, h, { [L]: e.format[L] }) : h),
            {}
          )));
    const a = r(e.value, i, c);
    let f = [i.key];
    he(a)
      ? (f = a.map((h, L) => {
          const k = s[h.type],
            S = k ? k({ [h.type]: h.value, index: L, parts: a }) : [h.value];
          return hf(S) && (S[0].key = `${h.type}-${L}`), S;
        }))
      : U(a) && (f = [a]);
    const m = Le({}, o),
      _ = U(e.tag) || ie(e.tag) ? e.tag : sl();
    return Is(_, m, f);
  };
}
const Ho = {
    name: "i18n-n",
    props: Le(
      {
        value: { type: Number, required: !0 },
        format: { type: [String, Object] },
      },
      Ps
    ),
    setup(e, t) {
      const n = e.i18n || Ut({ useScope: "parent", __useComponent: !0 });
      return ol(e, t, el, (...r) => n[Gr](...r));
    },
  },
  Vo = {
    name: "i18n-d",
    props: Le(
      {
        value: { type: [Number, Date], required: !0 },
        format: { type: [String, Object] },
      },
      Ps
    ),
    setup(e, t) {
      const n = e.i18n || Ut({ useScope: "parent", __useComponent: !0 });
      return ol(e, t, zi, (...r) => n[Yr](...r));
    },
  };
function gf(e, t) {
  const n = e;
  if (e.mode === "composition") return n.__getInstance(t) || e.global;
  {
    const r = n.__getInstance(t);
    return r != null ? r.__composer : e.global.__composer;
  }
}
function bf(e) {
  const t = (i) => {
    const { instance: c, modifiers: a, value: f } = i;
    if (!c || !c.$) throw Ke(Re.UNEXPECTED_ERROR);
    const m = gf(e, c.$),
      _ = Bo(f);
    return [Reflect.apply(m.t, m, [...Ko(_)]), m];
  };
  return {
    created: (i, c) => {
      const [a, f] = t(c);
      Hr &&
        e.global === f &&
        (i.__i18nWatcher = Me(f.locale, () => {
          c.instance && c.instance.$forceUpdate();
        })),
        (i.__composer = f),
        (i.textContent = a);
    },
    unmounted: (i) => {
      Hr &&
        i.__i18nWatcher &&
        (i.__i18nWatcher(), (i.__i18nWatcher = void 0), delete i.__i18nWatcher),
        i.__composer && ((i.__composer = void 0), delete i.__composer);
    },
    beforeUpdate: (i, { value: c }) => {
      if (i.__composer) {
        const a = i.__composer,
          f = Bo(c);
        i.textContent = Reflect.apply(a.t, a, [...Ko(f)]);
      }
    },
    getSSRProps: (i) => {
      const [c] = t(i);
      return { textContent: c };
    },
  };
}
function Bo(e) {
  if (U(e)) return { path: e };
  if (Z(e)) {
    if (!("path" in e)) throw Ke(Re.REQUIRED_VALUE, "path");
    return e;
  } else throw Ke(Re.INVALID_VALUE);
}
function Ko(e) {
  const { path: t, locale: n, args: r, choice: s, plural: o } = e,
    i = {},
    c = r || {};
  return (
    U(n) && (i.locale = n),
    ve(s) && (i.plural = s),
    ve(o) && (i.plural = o),
    [t, c, i]
  );
}
function vf(e, t, ...n) {
  const r = Z(n[0]) ? n[0] : {},
    s = !!r.useI18nComponentName;
  (_e(r.globalInstall) ? r.globalInstall : !0) &&
    (e.component(s ? "i18n" : Wo.name, Wo),
    e.component(Ho.name, Ho),
    e.component(Vo.name, Vo)),
    e.directive("t", bf(t));
}
const yf = It("global-vue-i18n");
function Ef(e = {}, t) {
  const n = _e(e.globalInjection) ? e.globalInjection : !0,
    r = !0,
    s = new Map(),
    [o, i] = Cf(e),
    c = It("");
  function a(_) {
    return s.get(_) || null;
  }
  function f(_, h) {
    s.set(_, h);
  }
  function m(_) {
    s.delete(_);
  }
  {
    const _ = {
      get mode() {
        return "composition";
      },
      get allowComposition() {
        return r;
      },
      async install(h, ...L) {
        (h.__VUE_I18N_SYMBOL__ = c),
          h.provide(h.__VUE_I18N_SYMBOL__, _),
          n && wf(h, _.global),
          vf(h, _, ...L);
        const k = h.unmount;
        h.unmount = () => {
          _.dispose(), k();
        };
      },
      get global() {
        return i;
      },
      dispose() {
        o.stop();
      },
      __instances: s,
      __getInstance: a,
      __setInstance: f,
      __deleteInstance: m,
    };
    return _;
  }
}
function Ut(e = {}) {
  const t = ln();
  if (t == null) throw Ke(Re.MUST_BE_CALL_SETUP_TOP);
  if (
    !t.isCE &&
    t.appContext.app != null &&
    !t.appContext.app.__VUE_I18N_SYMBOL__
  )
    throw Ke(Re.NOT_INSLALLED);
  const n = Tf(t),
    r = If(n),
    s = pf(t),
    o = Lf(e, s);
  if (o === "global") return mf(r, e, s), r;
  if (o === "parent") {
    let a = Nf(n, t, e.__useComponent);
    return a == null && (a = r), a;
  }
  const i = n;
  let c = i.__getInstance(t);
  if (c == null) {
    const a = Le({}, e);
    "__i18n" in s && (a.__i18n = s.__i18n),
      r && (a.__root = r),
      (c = rl(a)),
      Sf(i, t),
      i.__setInstance(t, c);
  }
  return c;
}
function Cf(e, t, n) {
  const r = ss();
  {
    const s = r.run(() => rl(e));
    if (s == null) throw Ke(Re.UNEXPECTED_ERROR);
    return [r, s];
  }
}
function Tf(e) {
  {
    const t = Jt(e.isCE ? yf : e.appContext.app.__VUE_I18N_SYMBOL__);
    if (!t)
      throw Ke(e.isCE ? Re.NOT_INSLALLED_WITH_PROVIDE : Re.UNEXPECTED_ERROR);
    return t;
  }
}
function Lf(e, t) {
  return ur(e)
    ? "__i18n" in t
      ? "local"
      : "global"
    : e.useScope
    ? e.useScope
    : "local";
}
function If(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function Nf(e, t, n = !1) {
  let r = null;
  const s = t.root;
  let o = t.parent;
  for (; o != null; ) {
    const i = e;
    if (
      (e.mode === "composition" && (r = i.__getInstance(o)),
      r != null || s === o)
    )
      break;
    o = o.parent;
  }
  return r;
}
function Sf(e, t, n) {
  ut(() => {}, t),
    ys(() => {
      e.__deleteInstance(t);
    }, t);
}
const Of = ["locale", "fallbackLocale", "availableLocales"],
  Af = ["t", "rt", "d", "n", "tm"];
function wf(e, t) {
  const n = Object.create(null);
  Of.forEach((r) => {
    const s = Object.getOwnPropertyDescriptor(t, r);
    if (!s) throw Ke(Re.UNEXPECTED_ERROR);
    const o = ue(s.value)
      ? {
          get() {
            return s.value.value;
          },
          set(i) {
            s.value.value = i;
          },
        }
      : {
          get() {
            return s.get && s.get();
          },
        };
    Object.defineProperty(n, r, o);
  }),
    (e.config.globalProperties.$i18n = n),
    Af.forEach((r) => {
      const s = Object.getOwnPropertyDescriptor(t, r);
      if (!s || !s.value) throw Ke(Re.UNEXPECTED_ERROR);
      Object.defineProperty(e.config.globalProperties, `$${r}`, s);
    });
}
zu(sf);
ef(Uu);
tf(Xi);
const st = ru("variable", () => {
  const e = re(!0),
    t = re(!1),
    n = re("EN"),
    r = { c1: re(null), c2: re(null), c3: re(null) };
  return { isDesktop: e, menuIsOpen: t, language: n, categories: r };
});
function il(e) {
  return os() ? (ti(e), !0) : !1;
}
function ll(e) {
  return typeof e == "function" ? e() : $t(e);
}
const xf = typeof window < "u",
  cl = () => {};
function Pf(...e) {
  if (e.length !== 1) return dc(...e);
  const t = e[0];
  return typeof t == "function" ? fs(cc(() => ({ get: t, set: cl }))) : re(t);
}
function kf(e, t = !0) {
  ln() ? ut(e) : t ? e() : gs(e);
}
function Mf(e) {
  var t;
  const n = ll(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const pr = xf ? window : void 0;
function al(...e) {
  let t, n, r, s;
  if (
    (typeof e[0] == "string" || Array.isArray(e[0])
      ? (([n, r, s] = e), (t = pr))
      : ([t, n, r, s] = e),
    !t)
  )
    return cl;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const o = [],
    i = () => {
      o.forEach((m) => m()), (o.length = 0);
    },
    c = (m, _, h, L) => (
      m.addEventListener(_, h, L), () => m.removeEventListener(_, h, L)
    ),
    a = Me(
      () => [Mf(t), ll(s)],
      ([m, _]) => {
        i(), m && o.push(...n.flatMap((h) => r.map((L) => c(m, h, L, _))));
      },
      { immediate: !0, flush: "post" }
    ),
    f = () => {
      a(), i();
    };
  return il(f), f;
}
function Rf() {
  const e = re(!1);
  return (
    ln() &&
      ut(() => {
        e.value = !0;
      }),
    e
  );
}
function Ff(e) {
  const t = Rf();
  return We(() => (t.value, !!e()));
}
function Df(e, t = {}) {
  const { window: n = pr } = t,
    r = Ff(() => n && "matchMedia" in n && typeof n.matchMedia == "function");
  let s;
  const o = re(!1),
    i = () => {
      s &&
        ("removeEventListener" in s
          ? s.removeEventListener("change", c)
          : s.removeListener(c));
    },
    c = () => {
      r.value &&
        (i(),
        (s = n.matchMedia(Pf(e).value)),
        (o.value = !!(s != null && s.matches)),
        s &&
          ("addEventListener" in s
            ? s.addEventListener("change", c)
            : s.addListener(c)));
    };
  return Sc(c), il(() => i()), o;
}
function ul({ window: e = pr } = {}) {
  if (!e) return { x: re(0), y: re(0) };
  const t = re(e.scrollX),
    n = re(e.scrollY);
  return (
    al(
      e,
      "scroll",
      () => {
        (t.value = e.scrollX), (n.value = e.scrollY);
      },
      { capture: !1, passive: !0 }
    ),
    { x: t, y: n }
  );
}
function $f(e = {}) {
  const {
      window: t = pr,
      initialWidth: n = 1 / 0,
      initialHeight: r = 1 / 0,
      listenOrientation: s = !0,
      includeScrollbar: o = !0,
    } = e,
    i = re(n),
    c = re(r),
    a = () => {
      t &&
        (o
          ? ((i.value = t.innerWidth), (c.value = t.innerHeight))
          : ((i.value = t.document.documentElement.clientWidth),
            (c.value = t.document.documentElement.clientHeight)));
    };
  if ((a(), kf(a), al("resize", a, { passive: !0 }), s)) {
    const f = Df("(orientation: portrait)");
    Me(f, () => a());
  }
  return { width: i, height: c };
}
const Uf = "/Portfolio/assets/logo-d43331f6.png";
const Fe = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n;
  },
  jf = {},
  Wf = (e) => (On("data-v-5bd21b25"), (e = e()), An(), e),
  Hf = { class: "logo" },
  Vf = Wf(() => Y("img", { src: Uf, alt: "logo" }, null, -1)),
  Bf = [Vf];
function Kf(e, t) {
  return se(), fe("div", Hf, Bf);
}
const Xf = Fe(jf, [
    ["render", Kf],
    ["__scopeId", "data-v-5bd21b25"],
  ]),
  qf = ["onClick"],
  Yf = Xe({
    __name: "HeaderNav",
    setup(e) {
      const { t } = Ut(),
        n = st();
      re(null);
      const r = We(() => n.menuIsOpen),
        s = (i) => {
          const c = i.toLowerCase(),
            a = n.categories[c];
          a == null || a.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        o = We(() => {
          const i = [];
          for (let c = 1; c <= 3; c++)
            i.push({ key: `c${c}`, value: t(`categories.c${c}`) });
          return i;
        });
      return (i, c) => (
        se(),
        fe(
          "nav",
          { class: Sn(r.value ? "nav--slider" : "nav--header") },
          [
            (se(!0),
            fe(
              Ce,
              null,
              Tn(
                o.value,
                (a) => (
                  se(),
                  fe("a", { onClick: (f) => s(a.key) }, Ve(a.value), 9, qf)
                )
              ),
              256
            )),
          ],
          2
        )
      );
    },
  });
const fl = Fe(Yf, [["__scopeId", "data-v-4b6e0ec3"]]),
  Gf = (e) => (On("data-v-2a3759c8"), (e = e()), An(), e),
  Jf = Gf(() => Y("div", { class: "divider" }, null, -1)),
  Qf = Xe({
    __name: "ChangeLanguage",
    setup(e) {
      const { locale: t } = Ut(),
        n = st(),
        r = () => {
          t.value === "en" ? (t.value = "fr") : (t.value = "en"),
            (n.language = t.value.toUpperCase());
        };
      return (s, o) => (
        se(),
        fe("div", null, [
          Y("button", { onClick: r }, Ve($t(n).language), 1),
          Jf,
        ])
      );
    },
  });
const Zf = Fe(Qf, [["__scopeId", "data-v-2a3759c8"]]),
  zf = { class: "line" },
  ed = Xe({
    __name: "Burger",
    setup(e) {
      const t = st(),
        n = () => {
          t.menuIsOpen = !t.menuIsOpen;
        };
      return (r, s) => (
        se(),
        fe("div", { class: "icon", onClick: n }, [
          (se(),
          fe(
            Ce,
            null,
            Tn(3, (o) => Y("div", zf)),
            64
          )),
        ])
      );
    },
  });
const td = Fe(ed, [["__scopeId", "data-v-f3cc1acc"]]),
  nd = { class: "container" },
  rd = { class: "navigation" },
  sd = { key: 0, class: "burger" },
  od = Xe({
    __name: "TheHeader",
    setup(e) {
      const { y: t } = ul(),
        n = st(),
        r = re(null),
        s = (o) => {
          if (typeof o == "number")
            o !== 0
              ? r.value && r.value.classList.add("colorBandWidth")
              : r.value && r.value.classList.remove("colorBandWidth");
          else if (typeof o == "boolean") {
            const i = o,
              c = t.value;
            r.value &&
              (i
                ? ((r.value.style.boxShadow = "none"),
                  r.value.classList.add("colorBandWidth"))
                : ((r.value.style.boxShadow = "0 0 10px 0 rgba(0, 0, 0, 0.2)"),
                  c === 0 && r.value.classList.remove("colorBandWidth")));
          }
        };
      return (
        Me(() => t.value, s),
        Me(() => n.menuIsOpen, s),
        (o, i) => (
          se(),
          fe("header", null, [
            Y("div", nd, [
              oe(Xf),
              Y("nav", rd, [
                oe(Zf),
                $t(n).isDesktop ? (se(), xn(fl, { key: 0 })) : en("", !0),
              ]),
              $t(n).isDesktop ? en("", !0) : (se(), fe("button", sd, [oe(td)])),
            ]),
            Y(
              "div",
              { class: "colorBand", ref_key: "band", ref: r },
              null,
              512
            ),
          ])
        )
      );
    },
  });
const id = Fe(od, [["__scopeId", "data-v-4af825bb"]]),
  ld = Xe({
    __name: "SlideMenu",
    setup(e) {
      const t = st();
      return (n, r) =>
        $t(t).menuIsOpen ? (se(), xn(fl, { key: 0 })) : en("", !0);
    },
  });
const cd = Fe(ld, [["__scopeId", "data-v-7d92f34b"]]),
  ad = Xe({
    __name: "GetInTouch",
    props: { text: String, type: String },
    setup(e) {
      return (t, n) => (
        se(),
        fe(
          "button",
          { ref: "button", class: Sn(e.type === "repo" ? "repo" : null) },
          [Y("span", null, Ve(e.text), 1)],
          2
        )
      );
    },
  });
const Qr = Fe(ad, [["__scopeId", "data-v-e537f385"]]),
  ud = (e) => (On("data-v-e7410e25"), (e = e()), An(), e),
  fd = ud(() => Y("h1", null, "MEHDI BIRLAKHDAR", -1)),
  dd = { class: "presentation" },
  pd = Xe({
    __name: "Welcome",
    setup(e) {
      const t = st(),
        n = (r) => {
          var s;
          (s = t.categories.c3) == null ||
            s.scrollIntoView({ behavior: "smooth", block: "start" });
        };
      return (r, s) => (
        se(),
        fe("section", null, [
          Y("p", null, Ve(r.$t("welcome.title")), 1),
          fd,
          Y("p", dd, Ve(r.$t("welcome.introduction")), 1),
          oe(Qr, { text: r.$t("welcome.button"), onClick: n }, null, 8, [
            "text",
          ]),
        ])
      );
    },
  });
const md = Fe(pd, [["__scopeId", "data-v-e7410e25"]]),
  _d = { id: "about" },
  hd = Xe({
    __name: "About",
    setup(e) {
      const { t } = Ut(),
        n = st(),
        r = We(() => {
          const s = [];
          for (let o = 1; o <= 5; o++) s.push(t(`about.introduction.p${o}`));
          return s;
        });
      return (
        ut(() => {
          n.categories.c1 = document.querySelector("#about");
        }),
        (s, o) => (
          se(),
          fe("section", _d, [
            Y("h2", null, Ve(s.$t("about.title")), 1),
            (se(!0),
            fe(
              Ce,
              null,
              Tn(r.value, (i) => (se(), fe("p", null, Ve(i), 1))),
              256
            )),
          ])
        )
      );
    },
  });
const gd = Fe(hd, [["__scopeId", "data-v-de0eeb62"]]),
  Zr = {
    en: {
      categories: { c1: "ABOUT", c2: "PROJECTS", c3: "CONTACT" },
      welcome: {
        title: "Hi, my name is",
        introduction: "Vue and Node.js developer from France",
        button: "GET IN TOUCH",
      },
      about: {
        title: "About",
        introduction: {
          p1: "My name is Mehdi, I'm 25 years old and I'm a web developer. Development has been a double discovery for me: the discovery of an exciting, complex and challenging field, but also the discovery of myself. Indeed, more than ever, I have been confronted with my strengths and weaknesses head-on throughout my training at OpenClassrooms and beyond. Every day is an opportunity to learn a new concept or to have a different perspective on those already encountered in the past.",
          p2: "By nature very curious and meticulous, development fulfills all my expectations. It pushes me to go beyond my limits, to deepen my knowledge, to optimize what already exists and to anticipate the optimization of what will exist. To sum up, thanks to developement, I get to challenge myself on a daily basis.",
          p3: "Through my various projects, I have come to understand that knowing everything is not a goal but a vocation to constantly progress in a field with infinite possibilities and evolution.",
          p4: "As I'm looking for my first experience and aware of the long journey ahead, I am open to any opportunity, any exchange because I'm convinced that each of them will allow me to improve.",
          p5: "Don't hesitate to contact me!",
        },
      },
      projects: {
        project1: {
          title: "TinyTeams",
          description:
            "TinyTeams is a corporate social network inspired by Facebook.",
          img: "/src/assets/tinyteams.png",
          link: "https://github.com/soonbtf/TinyTeams",
          technos: {
            t1: "Vue 3",
            t2: "Express",
            t3: "Sequelize",
            t4: "Socket.io",
            t5: "SQLite",
            t6: "VueUse",
          },
        },
        project2: {
          title: "This website",
          description: "You are here 🚩",
          img: "/src/assets/thisPortfolio.png",
          link: "https://github.com/soonbtf/Portfolio",
          technos: { t1: "Vue 3", t2: "TypeScript", t3: "i18n", t4: "VueUse" },
        },
      },
      misc: {
        viewButton: "View project",
        watchDemo: "Watch the demo",
        inputName: "NAME *",
        popupMsg: "Messange sent !",
      },
    },
    fr: {
      categories: { c1: "À PROPOS", c2: "PROJETS", c3: "CONTACT" },
      welcome: {
        title: "Bonjour, je suis",
        introduction: "Développeur web Vue.js / Node.js",
        button: "ME CONTACTER",
      },
      about: {
        title: "À propos",
        introduction: {
          p1: "Je m'appelle Mehdi, j'ai 25 ans et je suis développeur web. Le développement a été une double découverte pour moi : la découverte d'un domaine passionnant, complexe et challengeant mais également, la découverte de ma propre personne. En effet, plus que jamais, j'ai pu être confronté à mes forces et faiblesses de plein fouet tout au long de ma formation chez OpenClassrooms et au-délà. Chaque jour est une opportunité d'apprendre une nouvelle notion ou d'avoir un regard différent sur celles déjà rencontrées par le passé.",
          p2: "Par nature très curieux et minutieux, le développement vient combler toutes mes attentes. Il me pousse à aller au-delà de mes limites, à approfondir mes connaissances, à optimiser l'existant et à anticiper l'optimisation de ce qui existera.",
          p3: "Au travers mes divers projets, j'ai compris que tout connaître n'était pas un objectif mais une vocation pour progresser constamment dans un domaine aux possibilités et à l'évolution infinies.",
          p4: "Étant à la recherche d'une première expérience et conscient de tout le chemin que j'ai à parcourir, je suis ouvert à toute opportunité, à tout échange car je suis persuadé que chacun d'entre eux me permettra de m'améliorer.",
          p5: "N'hésitez pas à me contacter !",
        },
      },
      projects: {
        project1: {
          title: "TinyTeams",
          description:
            "TinyTeams est un réseau social d'entreprise s'inspirant du réseau social Facebook.",
          img: "/src/assets/tinyteams.png",
          link: "https://github.com/soonbtf/TinyTeams",
          button: "Voir le projet",
          technos: {
            t1: "Vue 3",
            t2: "Express",
            t3: "Sequelize",
            t4: "Socket.io",
            t5: "SQLite",
            t6: "VueUse",
          },
        },
        project2: {
          title: "Ce site",
          description: "Vous êtes ici 🚩",
          img: "/src/assets/thisPortfolio.png",
          link: "https://github.com/soonbtf/Portfolio",
          button: "Voir le projet",
          technos: { t1: "Vue 3", t2: "TypeScript", t3: "i18n", t4: "VueUse" },
        },
      },
      misc: {
        viewButton: "Voir le projet",
        watchDemo: "Voir la démo",
        inputName: "NOM *",
        popupMsg: "Message envoyé !",
      },
    },
  },
  bd = { class: "text" },
  vd = { class: "project__title" },
  yd = { class: "project__descp" },
  Ed = { class: "project__techno" },
  Cd = ["title"],
  Td = ["src"],
  Ld = Xe({
    __name: "Project",
    setup(e) {
      const { t } = Ut(),
        n = ["#001F37", "#222222"],
        r = (o) => {
          o
            ? window.open(o, "_blank")
            : window.open(
                "https://www.youtube.com/watch?v=yxCXfmS1xC4",
                "_blank"
              );
        },
        s = We(() =>
          Object.keys(Zr.en.projects).map((o) => {
            const i = Zr.en.projects[o];
            return {
              name: t(`projects.${o}.title`),
              description: t(`projects.${o}.description`),
              img: t(`projects.${o}.img`),
              link: t(`projects.${o}.link`),
              technos: Object.keys(i.technos).map((c) =>
                t(`projects.${o}.technos.${c}`)
              ),
            };
          })
        );
      return (o, i) => (
        se(!0),
        fe(
          Ce,
          null,
          Tn(
            s.value,
            (c, a) => (
              se(),
              fe(
                "section",
                { style: zn({ backgroundColor: n[a] }) },
                [
                  Y("article", null, [
                    Y("div", bd, [
                      Y("h2", vd, Ve(c.name), 1),
                      Y("p", yd, Ve(c.description), 1),
                      Y("ul", Ed, [
                        (se(!0),
                        fe(
                          Ce,
                          null,
                          Tn(
                            c.technos,
                            (f) => (se(), fe("li", null, Ve(f), 1))
                          ),
                          256
                        )),
                      ]),
                      Y(
                        "div",
                        { class: "button", title: c.link },
                        [
                          oe(
                            Qr,
                            {
                              onClick: (f) => r(c.link),
                              text: o.$t("misc.viewButton"),
                              type: "repo",
                            },
                            null,
                            8,
                            ["onClick", "text"]
                          ),
                          c.name === "TinyTeams"
                            ? (se(),
                              xn(
                                Qr,
                                {
                                  key: 0,
                                  onClick: i[0] || (i[0] = (f) => r()),
                                  text: o.$t("misc.watchDemo"),
                                  type: "repo",
                                },
                                null,
                                8,
                                ["text"]
                              ))
                            : en("", !0),
                        ],
                        8,
                        Cd
                      ),
                    ]),
                    Y("img", { src: c.img, alt: "", srcset: "" }, null, 8, Td),
                  ]),
                ],
                4
              )
            )
          ),
          256
        )
      );
    },
  });
const Id = Fe(Ld, [["__scopeId", "data-v-f5b2c135"]]),
  Nd = { id: "myWorks" },
  Sd = Xe({
    __name: "MyWorks",
    setup(e) {
      const t = st();
      return (
        ut(() => {
          t.categories.c2 = document.querySelector("#myWorks");
        }),
        (n, r) => (
          se(),
          fe("section", Nd, [
            Y("h3", null, Ve(n.$t("categories.c2")), 1),
            oe(Id),
          ])
        )
      );
    },
  });
const Od = Fe(Sd, [["__scopeId", "data-v-07ed41ec"]]),
  Nn = { _origin: "https://api.emailjs.com" },
  Ad = (e, t = "https://api.emailjs.com") => {
    (Nn._userID = e), (Nn._origin = t);
  },
  dl = (e, t, n) => {
    if (!e)
      throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
    if (!t)
      throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
    if (!n)
      throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
    return !0;
  };
class Xo {
  constructor(t) {
    (this.status = t ? t.status : 0),
      (this.text = t ? t.responseText : "Network Error");
  }
}
const pl = (e, t, n = {}) =>
    new Promise((r, s) => {
      const o = new XMLHttpRequest();
      o.addEventListener("load", ({ target: i }) => {
        const c = new Xo(i);
        c.status === 200 || c.text === "OK" ? r(c) : s(c);
      }),
        o.addEventListener("error", ({ target: i }) => {
          s(new Xo(i));
        }),
        o.open("POST", Nn._origin + e, !0),
        Object.keys(n).forEach((i) => {
          o.setRequestHeader(i, n[i]);
        }),
        o.send(t);
    }),
  wd = (e, t, n, r) => {
    const s = r || Nn._userID;
    return (
      dl(s, e, t),
      pl(
        "/api/v1.0/email/send",
        JSON.stringify({
          lib_version: "3.11.0",
          user_id: s,
          service_id: e,
          template_id: t,
          template_params: n,
        }),
        { "Content-type": "application/json" }
      )
    );
  },
  xd = (e) => {
    let t;
    if (
      (typeof e == "string" ? (t = document.querySelector(e)) : (t = e),
      !t || t.nodeName !== "FORM")
    )
      throw "The 3rd parameter is expected to be the HTML form element or the style selector of form";
    return t;
  },
  Pd = (e, t, n, r) => {
    const s = r || Nn._userID,
      o = xd(n);
    dl(s, e, t);
    const i = new FormData(o);
    return (
      i.append("lib_version", "3.11.0"),
      i.append("service_id", e),
      i.append("template_id", t),
      i.append("user_id", s),
      pl("/api/v1.0/email/send-form", i)
    );
  },
  kd = { init: Ad, send: wd, sendForm: Pd },
  ml = (e) => (On("data-v-f77efde4"), (e = e()), An(), e),
  Md = { id: "contact" },
  Rd = ["onSubmit"],
  Fd = ml(() => Y("h3", null, "CONTACT", -1)),
  Dd = ["placeholder"],
  $d = ml(() => Y("button", { type: "submit" }, "SEND MESSAGE", -1)),
  Ud = { key: 0, class: "popup" },
  jd = Xe({
    __name: "ContactForm",
    setup(e) {
      const t = st(),
        n = re(null),
        r = re(""),
        s = re(""),
        o = re(""),
        i = re(!1),
        c = () => {
          kd.send(
            "service_xufnxq8",
            "template_yo9qmic",
            { from_name: r.value, message: o.value, from_email: s.value },
            "I70RKpmZdwqxkUKKs"
          )
            .then((f) => {
              a(), (r.value = ""), (s.value = ""), (o.value = "");
            })
            .catch((f) => console.log(f));
        },
        a = () => {
          (i.value = !0),
            setTimeout(() => {
              i.value = !1;
            }, 3e3);
        };
      return (
        ut(() => {
          t.categories.c3 = document.querySelector("#contact");
        }),
        (f, m) => (
          se(),
          fe("section", Md, [
            Y(
              "form",
              { ref_key: "form", ref: n, onSubmit: Xa(c, ["prevent"]) },
              [
                Fd,
                hr(
                  Y(
                    "input",
                    {
                      "onUpdate:modelValue":
                        m[0] || (m[0] = (_) => (r.value = _)),
                      placeholder: f.$t("misc.inputName"),
                      type: "text",
                      required: "",
                    },
                    null,
                    8,
                    Dd
                  ),
                  [[Tr, r.value]]
                ),
                hr(
                  Y(
                    "input",
                    {
                      "onUpdate:modelValue":
                        m[1] || (m[1] = (_) => (s.value = _)),
                      type: "email",
                      placeholder: "EMAIL *",
                      required: "",
                    },
                    null,
                    512
                  ),
                  [[Tr, s.value]]
                ),
                hr(
                  Y(
                    "textarea",
                    {
                      "onUpdate:modelValue":
                        m[2] || (m[2] = (_) => (o.value = _)),
                      placeholder: "MESSAGE *",
                      required: "",
                    },
                    null,
                    512
                  ),
                  [[Tr, o.value]]
                ),
                $d,
              ],
              40,
              Rd
            ),
            i.value
              ? (se(), fe("div", Ud, Ve(f.$t("misc.popupMsg")), 1))
              : en("", !0),
          ])
        )
      );
    },
  });
const Wd = Fe(jd, [["__scopeId", "data-v-f77efde4"]]);
const Hd = {},
  _l = (e) => (On("data-v-ee8733ec"), (e = e()), An(), e),
  Vd = _l(() =>
    Y(
      "p",
      null,
      [
        Di(" Made with ❤️ | Insipired by "),
        Y(
          "a",
          {
            href: "https://chaseohlson.com/",
            target: "_blank",
            class: "portfolio",
          },
          "Chase Ohlson"
        ),
      ],
      -1
    )
  ),
  Bd = _l(() =>
    Y(
      "div",
      { class: "socialMedia" },
      [
        Y(
          "a",
          { href: "https://github.com/soonbtf", target: "_blank" },
          " Github -"
        ),
        Y(
          "a",
          {
            href: "https://www.linkedin.com/in/mehdibirlakhdar/",
            target: "_blank",
          },
          " LinkedIn"
        ),
      ],
      -1
    )
  ),
  Kd = [Vd, Bd];
function Xd(e, t) {
  return se(), fe("footer", null, Kd);
}
const qd = Fe(Hd, [
    ["render", Xd],
    ["__scopeId", "data-v-ee8733ec"],
  ]),
  Yd = { id: "container" },
  Gd = Xe({
    __name: "App",
    setup(e) {
      const t = st(),
        { width: n } = $f(),
        { y: r } = ul(),
        s = (o) => {
          (t.isDesktop = o > 768), (t.menuIsOpen = !1);
        };
      return (
        Me(() => n.value, s),
        Me(
          () => r.value,
          () => {
            t.menuIsOpen = !1;
          }
        ),
        ut(() => s(n.value)),
        (o, i) => (
          se(),
          fe("div", Yd, [
            oe(id),
            Y("main", null, [oe(md), oe(gd), oe(Od), oe(Wd)]),
            oe(qd),
            oe(Ns, null, {
              default: yi(() => [
                $t(t).menuIsOpen ? (se(), xn(cd, { key: 0 })) : en("", !0),
              ]),
              _: 1,
            }),
          ])
        )
      );
    },
  });
const ks = Ga(Gd),
  Jd = Za(),
  Qd = Ef({ locale: "en", messages: Zr, legacy: !1 });
ks.use(Jd);
ks.use(Qd);
ks.mount("#app");
