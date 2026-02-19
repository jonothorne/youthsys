import { withCtx, unref, createVNode, resolveDynamicComponent, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderVNode, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-XQF9hSWa.js";
import { Head, Link } from "@inertiajs/vue3";
import * as Icons from "lucide-vue-next";
import "clsx";
import "axios";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    stats: Object,
    attendanceRecent: Array,
    ageBuckets: Object
  },
  setup(__props) {
    const props = __props;
    const metricCards = [
      { key: "active_youth", label: "Active youth", icon: "Users" },
      { key: "pending_youth", label: "Pending approvals", icon: "UserPlus" },
      { key: "sessions_this_month", label: "Sessions this month", icon: "CalendarRange" },
      { key: "token_liability", label: "Tokens outstanding", icon: "Coins", prefix: "" }
    ];
    const quickActions = [
      { label: "Start weekly register", description: "Open the attendance grid", route: "admin.attendance.index" },
      { label: "Invite leader", description: "Add a new admin/token operator", route: "admin.users.index" },
      { label: "Send parent form", description: "Share registration link", route: "enrolment.form", external: true }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Overview" }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-8"${_scopeId}><section class="grid gap-4 lg:grid-cols-4"${_scopeId}><!--[-->`);
            ssrRenderList(metricCards, (metric) => {
              _push2(`<div class="stat-card flex items-start justify-between"${_scopeId}><div${_scopeId}><p class="text-xs uppercase tracking-wide text-slate-500"${_scopeId}>${ssrInterpolate(metric.label)}</p><p class="mt-2 text-3xl font-semibold text-slate-900"${_scopeId}>${ssrInterpolate(props.stats?.[metric.key] ?? 0)}</p></div><div class="rounded-2xl bg-slate-100 p-3 text-slate-500"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(Icons[metric.icon]), { class: "h-5 w-5" }, null), _parent2, _scopeId);
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></section><section class="grid gap-6 lg:grid-cols-3"${_scopeId}><div class="panel p-6 lg:col-span-2"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-semibold text-slate-900"${_scopeId}>Attendance pulse</p><p class="text-xs text-slate-500"${_scopeId}>Past six gatherings</p></div><span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"${_scopeId}>Live</span></div><div class="mt-6 space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.attendanceRecent, (session) => {
              _push2(`<div class="flex items-center gap-4"${_scopeId}><div class="w-24 text-sm text-slate-600"${_scopeId}>${ssrInterpolate(new Date(session.session_date).toLocaleDateString())}</div><div class="flex-1"${_scopeId}><div class="h-3 rounded-full bg-slate-100"${_scopeId}><div class="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style="${ssrRenderStyle({ width: `${Math.min(session.present_count * 3, 100)}%` })}"${_scopeId}></div></div></div><div class="w-12 text-right text-sm font-semibold text-slate-800"${_scopeId}>${ssrInterpolate(session.present_count)}</div></div>`);
            });
            _push2(`<!--]-->`);
            if (!__props.attendanceRecent?.length) {
              _push2(`<p class="text-sm text-slate-500"${_scopeId}>No sessions logged yet.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="panel p-6"${_scopeId}><p class="text-sm font-semibold text-slate-900"${_scopeId}>Age distribution</p><ul class="mt-6 space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.ageBuckets, (count, label) => {
              _push2(`<li class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-semibold text-slate-800"${_scopeId}>${ssrInterpolate(label)}</p></div><span class="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700"${_scopeId}>${ssrInterpolate(count)}</span></li>`);
            });
            _push2(`<!--]-->`);
            if (!Object.keys(__props.ageBuckets).length) {
              _push2(`<li class="text-sm text-slate-500"${_scopeId}>Add DOBs to view age spread.</li>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</ul></div></section><section class="grid gap-6 lg:grid-cols-3"${_scopeId}><div class="panel p-6 lg:col-span-2"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-semibold text-slate-900"${_scopeId}>Quick actions</p><p class="text-xs text-slate-500"${_scopeId}>Shortcuts for the team</p></div></div><div class="mt-5 grid gap-3 md:grid-cols-3"${_scopeId}><!--[-->`);
            ssrRenderList(quickActions, (action) => {
              _push2(ssrRenderComponent(unref(Link), {
                key: action.label,
                href: _ctx.route(action.route),
                target: action.external ? "_blank" : void 0,
                class: "rounded-2xl border border-border/80 p-4 text-sm text-slate-600 shadow-sm transition hover:border-indigo-400 hover:text-indigo-600"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="font-semibold text-slate-900"${_scopeId2}>${ssrInterpolate(action.label)}</p><p class="mt-1 text-xs text-slate-500"${_scopeId2}>${ssrInterpolate(action.description)}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "font-semibold text-slate-900" }, toDisplayString(action.label), 1),
                      createVNode("p", { class: "mt-1 text-xs text-slate-500" }, toDisplayString(action.description), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div><div class="panel p-6"${_scopeId}><p class="text-sm font-semibold text-slate-900"${_scopeId}>Tokens snapshot</p><p class="text-xs text-slate-500"${_scopeId}>Outstanding balances</p><div class="mt-6 rounded-2xl border border-slate-100 bg-slate-50/60 p-4"${_scopeId}><p class="text-3xl font-semibold text-slate-900"${_scopeId}>${ssrInterpolate(props.stats?.token_liability ?? 0)}</p><p class="text-xs text-slate-500"${_scopeId}>tokens ready to redeem</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.tokens.index"),
              class: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Open token console `);
                  _push3(ssrRenderComponent(Icons.ArrowRight, { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Open token console "),
                    createVNode(Icons.ArrowRight, { class: "h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></section></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Overview" }),
              createVNode("div", { class: "space-y-8" }, [
                createVNode("section", { class: "grid gap-4 lg:grid-cols-4" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(metricCards, (metric) => {
                    return createVNode("div", {
                      key: metric.key,
                      class: "stat-card flex items-start justify-between"
                    }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs uppercase tracking-wide text-slate-500" }, toDisplayString(metric.label), 1),
                        createVNode("p", { class: "mt-2 text-3xl font-semibold text-slate-900" }, toDisplayString(props.stats?.[metric.key] ?? 0), 1)
                      ]),
                      createVNode("div", { class: "rounded-2xl bg-slate-100 p-3 text-slate-500" }, [
                        (openBlock(), createBlock(resolveDynamicComponent(Icons[metric.icon]), { class: "h-5 w-5" }))
                      ])
                    ]);
                  }), 64))
                ]),
                createVNode("section", { class: "grid gap-6 lg:grid-cols-3" }, [
                  createVNode("div", { class: "panel p-6 lg:col-span-2" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Attendance pulse"),
                        createVNode("p", { class: "text-xs text-slate-500" }, "Past six gatherings")
                      ]),
                      createVNode("span", { class: "rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700" }, "Live")
                    ]),
                    createVNode("div", { class: "mt-6 space-y-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.attendanceRecent, (session) => {
                        return openBlock(), createBlock("div", {
                          key: session.id,
                          class: "flex items-center gap-4"
                        }, [
                          createVNode("div", { class: "w-24 text-sm text-slate-600" }, toDisplayString(new Date(session.session_date).toLocaleDateString()), 1),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("div", { class: "h-3 rounded-full bg-slate-100" }, [
                              createVNode("div", {
                                class: "h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500",
                                style: { width: `${Math.min(session.present_count * 3, 100)}%` }
                              }, null, 4)
                            ])
                          ]),
                          createVNode("div", { class: "w-12 text-right text-sm font-semibold text-slate-800" }, toDisplayString(session.present_count), 1)
                        ]);
                      }), 128)),
                      !__props.attendanceRecent?.length ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-slate-500"
                      }, "No sessions logged yet.")) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "panel p-6" }, [
                    createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Age distribution"),
                    createVNode("ul", { class: "mt-6 space-y-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.ageBuckets, (count, label) => {
                        return openBlock(), createBlock("li", {
                          key: label,
                          class: "flex items-center justify-between"
                        }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-semibold text-slate-800" }, toDisplayString(label), 1)
                          ]),
                          createVNode("span", { class: "rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700" }, toDisplayString(count), 1)
                        ]);
                      }), 128)),
                      !Object.keys(__props.ageBuckets).length ? (openBlock(), createBlock("li", {
                        key: 0,
                        class: "text-sm text-slate-500"
                      }, "Add DOBs to view age spread.")) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                createVNode("section", { class: "grid gap-6 lg:grid-cols-3" }, [
                  createVNode("div", { class: "panel p-6 lg:col-span-2" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Quick actions"),
                        createVNode("p", { class: "text-xs text-slate-500" }, "Shortcuts for the team")
                      ])
                    ]),
                    createVNode("div", { class: "mt-5 grid gap-3 md:grid-cols-3" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(quickActions, (action) => {
                        return createVNode(unref(Link), {
                          key: action.label,
                          href: _ctx.route(action.route),
                          target: action.external ? "_blank" : void 0,
                          class: "rounded-2xl border border-border/80 p-4 text-sm text-slate-600 shadow-sm transition hover:border-indigo-400 hover:text-indigo-600"
                        }, {
                          default: withCtx(() => [
                            createVNode("p", { class: "font-semibold text-slate-900" }, toDisplayString(action.label), 1),
                            createVNode("p", { class: "mt-1 text-xs text-slate-500" }, toDisplayString(action.description), 1)
                          ]),
                          _: 2
                        }, 1032, ["href", "target"]);
                      }), 64))
                    ])
                  ]),
                  createVNode("div", { class: "panel p-6" }, [
                    createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Tokens snapshot"),
                    createVNode("p", { class: "text-xs text-slate-500" }, "Outstanding balances"),
                    createVNode("div", { class: "mt-6 rounded-2xl border border-slate-100 bg-slate-50/60 p-4" }, [
                      createVNode("p", { class: "text-3xl font-semibold text-slate-900" }, toDisplayString(props.stats?.token_liability ?? 0), 1),
                      createVNode("p", { class: "text-xs text-slate-500" }, "tokens ready to redeem")
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("admin.tokens.index"),
                      class: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Open token console "),
                        createVNode(Icons.ArrowRight, { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
