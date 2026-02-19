import { withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, withModifiers, withDirectives, vModelText, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-7_VVwp8m.js";
import { useForm, Head, Link, router } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "lucide-vue-next";
import "clsx";
import "axios";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    sessions: Array,
    archivedSessions: Array
  },
  setup(__props) {
    const form = useForm({
      session_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      session_type: "weekly",
      name: "Alive Youth",
      location: "Alive Church"
    });
    const submit = () => {
      form.post(route("admin.attendance.store"));
    };
    const archive = (id) => {
      if (!confirm("Archive this register?")) return;
      router.post(route("admin.attendance.archive", id), {}, { preserveScroll: true });
    };
    const destroySession = (id) => {
      if (!confirm("Delete this register? This cannot be undone.")) return;
      router.delete(route("admin.attendance.destroy", id));
    };
    const restore = (id) => {
      router.post(route("admin.attendance.restore", id), {}, { preserveScroll: true });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Attendance" }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-6" data-v-8f612103${_scopeId}><div class="grid gap-6 lg:grid-cols-3" data-v-8f612103${_scopeId}><section class="panel p-6 lg:col-span-2" data-v-8f612103${_scopeId}><div class="flex items-center justify-between" data-v-8f612103${_scopeId}><div data-v-8f612103${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-8f612103${_scopeId}>Registers</p><p class="text-xs text-slate-500" data-v-8f612103${_scopeId}>Past and upcoming sessions</p></div><span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600" data-v-8f612103${_scopeId}>${ssrInterpolate(__props.sessions.length)} active</span></div><div class="mt-4 overflow-x-auto" data-v-8f612103${_scopeId}><table class="min-w-full divide-y divide-border text-sm" data-v-8f612103${_scopeId}><thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500" data-v-8f612103${_scopeId}><tr data-v-8f612103${_scopeId}><th class="py-2" data-v-8f612103${_scopeId}>Date</th><th class="py-2" data-v-8f612103${_scopeId}>Type</th><th class="py-2" data-v-8f612103${_scopeId}>Present</th><th data-v-8f612103${_scopeId}></th></tr></thead><tbody class="divide-y divide-slate-100 bg-white" data-v-8f612103${_scopeId}><!--[-->`);
            ssrRenderList(__props.sessions, (session) => {
              _push2(`<tr class="hover:bg-slate-50" data-v-8f612103${_scopeId}><td class="py-3" data-v-8f612103${_scopeId}><p class="font-semibold text-slate-900" data-v-8f612103${_scopeId}>${ssrInterpolate(new Date(session.session_date).toLocaleDateString())}</p><p class="text-xs text-slate-500" data-v-8f612103${_scopeId}>${ssrInterpolate(session.name)}</p></td><td class="py-3 text-slate-600" data-v-8f612103${_scopeId}>${ssrInterpolate(session.session_type)}</td><td class="py-3" data-v-8f612103${_scopeId}>${ssrInterpolate(session.present_count ?? 0)}</td><td class="py-3 text-right" data-v-8f612103${_scopeId}><div class="flex flex-wrap justify-end gap-3 text-sm font-semibold" data-v-8f612103${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin.attendance.show", session.id),
                class: "text-indigo-600"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Open`);
                  } else {
                    return [
                      createTextVNode("Open")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="text-amber-600" data-v-8f612103${_scopeId}>Archive</button><button class="text-rose-600" data-v-8f612103${_scopeId}>Delete</button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (!__props.sessions.length) {
              _push2(`<tr data-v-8f612103${_scopeId}><td colspan="4" class="py-6 text-center text-sm text-slate-500" data-v-8f612103${_scopeId}>No sessions yet.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></section><section class="panel p-6" data-v-8f612103${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-8f612103${_scopeId}>Create session</p><p class="text-xs text-slate-500" data-v-8f612103${_scopeId}>Prefill your weekly gatherings</p><form class="mt-4 space-y-4" data-v-8f612103${_scopeId}><div data-v-8f612103${_scopeId}><label class="form-label" data-v-8f612103${_scopeId}>Date</label><input${ssrRenderAttr("value", unref(form).session_date)} type="date" class="form-input" data-v-8f612103${_scopeId}>`);
            if (unref(form).errors.session_date) {
              _push2(`<p class="form-error" data-v-8f612103${_scopeId}>${ssrInterpolate(unref(form).errors.session_date)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8f612103${_scopeId}><label class="form-label" data-v-8f612103${_scopeId}>Name</label><input${ssrRenderAttr("value", unref(form).name)} class="form-input" data-v-8f612103${_scopeId}></div><div data-v-8f612103${_scopeId}><label class="form-label" data-v-8f612103${_scopeId}>Location</label><input${ssrRenderAttr("value", unref(form).location)} class="form-input" data-v-8f612103${_scopeId}></div><div data-v-8f612103${_scopeId}><label class="form-label" data-v-8f612103${_scopeId}>Session type</label><select class="form-input" data-v-8f612103${_scopeId}><option value="weekly" data-v-8f612103${ssrIncludeBooleanAttr(Array.isArray(unref(form).session_type) ? ssrLooseContain(unref(form).session_type, "weekly") : ssrLooseEqual(unref(form).session_type, "weekly")) ? " selected" : ""}${_scopeId}>Weekly</option><option value="event" data-v-8f612103${ssrIncludeBooleanAttr(Array.isArray(unref(form).session_type) ? ssrLooseContain(unref(form).session_type, "event") : ssrLooseEqual(unref(form).session_type, "event")) ? " selected" : ""}${_scopeId}>Event</option></select></div><button type="submit" class="w-full rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-8f612103${_scopeId}> Create &amp; open register </button></form></section></div><section class="panel p-6" data-v-8f612103${_scopeId}><div class="flex items-center justify-between" data-v-8f612103${_scopeId}><div data-v-8f612103${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-8f612103${_scopeId}>Archived sessions</p><p class="text-xs text-slate-500" data-v-8f612103${_scopeId}>Stored for reference</p></div></div><div class="mt-4 overflow-x-auto" data-v-8f612103${_scopeId}><table class="min-w-full divide-y divide-border text-sm" data-v-8f612103${_scopeId}><thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500" data-v-8f612103${_scopeId}><tr data-v-8f612103${_scopeId}><th class="py-2" data-v-8f612103${_scopeId}>Date</th><th class="py-2" data-v-8f612103${_scopeId}>Type</th><th class="py-2" data-v-8f612103${_scopeId}>Present</th><th data-v-8f612103${_scopeId}></th></tr></thead><tbody class="divide-y divide-slate-100 bg-white" data-v-8f612103${_scopeId}><!--[-->`);
            ssrRenderList(__props.archivedSessions, (session) => {
              _push2(`<tr class="hover:bg-slate-50" data-v-8f612103${_scopeId}><td class="py-3" data-v-8f612103${_scopeId}>${ssrInterpolate(new Date(session.session_date).toLocaleDateString())}</td><td class="py-3 text-slate-600" data-v-8f612103${_scopeId}>${ssrInterpolate(session.session_type)}</td><td class="py-3" data-v-8f612103${_scopeId}>${ssrInterpolate(session.present_count ?? 0)}</td><td class="py-3 text-right" data-v-8f612103${_scopeId}><div class="flex flex-wrap justify-end gap-3 text-sm font-semibold" data-v-8f612103${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin.attendance.show", session.id),
                class: "text-indigo-600"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Open`);
                  } else {
                    return [
                      createTextVNode("Open")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="text-emerald-600" data-v-8f612103${_scopeId}>Restore</button><button class="text-rose-600" data-v-8f612103${_scopeId}>Delete</button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (!__props.archivedSessions.length) {
              _push2(`<tr data-v-8f612103${_scopeId}><td colspan="4" class="py-6 text-center text-sm text-slate-500" data-v-8f612103${_scopeId}>No archived sessions.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></section></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Attendance" }),
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "grid gap-6 lg:grid-cols-3" }, [
                  createVNode("section", { class: "panel p-6 lg:col-span-2" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Registers"),
                        createVNode("p", { class: "text-xs text-slate-500" }, "Past and upcoming sessions")
                      ]),
                      createVNode("span", { class: "rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600" }, toDisplayString(__props.sessions.length) + " active", 1)
                    ]),
                    createVNode("div", { class: "mt-4 overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-border text-sm" }, [
                        createVNode("thead", { class: "bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "py-2" }, "Date"),
                            createVNode("th", { class: "py-2" }, "Type"),
                            createVNode("th", { class: "py-2" }, "Present"),
                            createVNode("th")
                          ])
                        ]),
                        createVNode("tbody", { class: "divide-y divide-slate-100 bg-white" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.sessions, (session) => {
                            return openBlock(), createBlock("tr", {
                              key: session.id,
                              class: "hover:bg-slate-50"
                            }, [
                              createVNode("td", { class: "py-3" }, [
                                createVNode("p", { class: "font-semibold text-slate-900" }, toDisplayString(new Date(session.session_date).toLocaleDateString()), 1),
                                createVNode("p", { class: "text-xs text-slate-500" }, toDisplayString(session.name), 1)
                              ]),
                              createVNode("td", { class: "py-3 text-slate-600" }, toDisplayString(session.session_type), 1),
                              createVNode("td", { class: "py-3" }, toDisplayString(session.present_count ?? 0), 1),
                              createVNode("td", { class: "py-3 text-right" }, [
                                createVNode("div", { class: "flex flex-wrap justify-end gap-3 text-sm font-semibold" }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route("admin.attendance.show", session.id),
                                    class: "text-indigo-600"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Open")
                                    ]),
                                    _: 1
                                  }, 8, ["href"]),
                                  createVNode("button", {
                                    class: "text-amber-600",
                                    onClick: ($event) => archive(session.id)
                                  }, "Archive", 8, ["onClick"]),
                                  createVNode("button", {
                                    class: "text-rose-600",
                                    onClick: ($event) => destroySession(session.id)
                                  }, "Delete", 8, ["onClick"])
                                ])
                              ])
                            ]);
                          }), 128)),
                          !__props.sessions.length ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "4",
                              class: "py-6 text-center text-sm text-slate-500"
                            }, "No sessions yet.")
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("section", { class: "panel p-6" }, [
                    createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Create session"),
                    createVNode("p", { class: "text-xs text-slate-500" }, "Prefill your weekly gatherings"),
                    createVNode("form", {
                      class: "mt-4 space-y-4",
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Date"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).session_date = $event,
                          type: "date",
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).session_date]
                        ]),
                        unref(form).errors.session_date ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "form-error"
                        }, toDisplayString(unref(form).errors.session_date), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Name"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).name]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Location"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).location = $event,
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).location]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Session type"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).session_type = $event,
                          class: "form-input"
                        }, [
                          createVNode("option", { value: "weekly" }, "Weekly"),
                          createVNode("option", { value: "event" }, "Event")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).session_type]
                        ])
                      ]),
                      createVNode("button", {
                        type: "submit",
                        class: "w-full rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white",
                        disabled: unref(form).processing
                      }, " Create & open register ", 8, ["disabled"])
                    ], 32)
                  ])
                ]),
                createVNode("section", { class: "panel p-6" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Archived sessions"),
                      createVNode("p", { class: "text-xs text-slate-500" }, "Stored for reference")
                    ])
                  ]),
                  createVNode("div", { class: "mt-4 overflow-x-auto" }, [
                    createVNode("table", { class: "min-w-full divide-y divide-border text-sm" }, [
                      createVNode("thead", { class: "bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "py-2" }, "Date"),
                          createVNode("th", { class: "py-2" }, "Type"),
                          createVNode("th", { class: "py-2" }, "Present"),
                          createVNode("th")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-slate-100 bg-white" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.archivedSessions, (session) => {
                          return openBlock(), createBlock("tr", {
                            key: `arch-${session.id}`,
                            class: "hover:bg-slate-50"
                          }, [
                            createVNode("td", { class: "py-3" }, toDisplayString(new Date(session.session_date).toLocaleDateString()), 1),
                            createVNode("td", { class: "py-3 text-slate-600" }, toDisplayString(session.session_type), 1),
                            createVNode("td", { class: "py-3" }, toDisplayString(session.present_count ?? 0), 1),
                            createVNode("td", { class: "py-3 text-right" }, [
                              createVNode("div", { class: "flex flex-wrap justify-end gap-3 text-sm font-semibold" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin.attendance.show", session.id),
                                  class: "text-indigo-600"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Open")
                                  ]),
                                  _: 1
                                }, 8, ["href"]),
                                createVNode("button", {
                                  class: "text-emerald-600",
                                  onClick: ($event) => restore(session.id)
                                }, "Restore", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "text-rose-600",
                                  onClick: ($event) => destroySession(session.id)
                                }, "Delete", 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128)),
                        !__props.archivedSessions.length ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "4",
                            class: "py-6 text-center text-sm text-slate-500"
                          }, "No archived sessions.")
                        ])) : createCommentVNode("", true)
                      ])
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Attendance/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8f612103"]]);
export {
  Index as default
};
