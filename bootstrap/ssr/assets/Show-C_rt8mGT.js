import { withCtx, unref, createTextVNode, createVNode, toDisplayString, withModifiers, withDirectives, vModelText, vModelSelect, vModelCheckbox, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-7_VVwp8m.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import * as Icons from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "clsx";
import "axios";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    youth: Object,
    guardians: Array
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      first_name: props.youth.first_name,
      last_name: props.youth.last_name,
      preferred_name: props.youth.preferred_name,
      status: props.youth.status,
      active: props.youth.active,
      photo_consent: props.youth.photo_consent
    });
    const submit = () => {
      form.put(route("admin.youth.update", props.youth.id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: props.youth.first_name
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-6" data-v-482b3a1c${_scopeId}><div class="flex flex-wrap items-center justify-between gap-4" data-v-482b3a1c${_scopeId}><div data-v-482b3a1c${_scopeId}><p class="text-xs uppercase tracking-wide text-slate-500" data-v-482b3a1c${_scopeId}>Young person</p><h1 class="text-2xl font-semibold text-slate-900" data-v-482b3a1c${_scopeId}>${ssrInterpolate(props.youth.first_name)} ${ssrInterpolate(props.youth.last_name)}</h1><p class="text-sm text-slate-500" data-v-482b3a1c${_scopeId}>Preferred name: ${ssrInterpolate(props.youth.preferred_name || "—")}</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.youth.index"),
              class: "rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ← Back to directory `);
                } else {
                  return [
                    createTextVNode(" ← Back to directory ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><section class="grid gap-6 lg:grid-cols-3" data-v-482b3a1c${_scopeId}><div class="panel p-6 lg:col-span-2" data-v-482b3a1c${_scopeId}><div class="flex items-center justify-between" data-v-482b3a1c${_scopeId}><div data-v-482b3a1c${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-482b3a1c${_scopeId}>Profile &amp; status</p><p class="text-xs text-slate-500" data-v-482b3a1c${_scopeId}>Update status or preferred name</p></div><span class="${ssrRenderClass([props.youth.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700", "rounded-full px-3 py-1 text-xs font-semibold"])}" data-v-482b3a1c${_scopeId}>${ssrInterpolate(props.youth.status)}</span></div><form class="mt-6 grid gap-4 md:grid-cols-2" data-v-482b3a1c${_scopeId}><div data-v-482b3a1c${_scopeId}><label class="form-label" data-v-482b3a1c${_scopeId}>First name</label><input${ssrRenderAttr("value", unref(form).first_name)} class="form-input" data-v-482b3a1c${_scopeId}></div><div data-v-482b3a1c${_scopeId}><label class="form-label" data-v-482b3a1c${_scopeId}>Last name</label><input${ssrRenderAttr("value", unref(form).last_name)} class="form-input" data-v-482b3a1c${_scopeId}></div><div data-v-482b3a1c${_scopeId}><label class="form-label" data-v-482b3a1c${_scopeId}>Preferred name</label><input${ssrRenderAttr("value", unref(form).preferred_name)} class="form-input" data-v-482b3a1c${_scopeId}></div><div data-v-482b3a1c${_scopeId}><label class="form-label" data-v-482b3a1c${_scopeId}>Status</label><select class="form-input" data-v-482b3a1c${_scopeId}><option value="pending" data-v-482b3a1c${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "pending") : ssrLooseEqual(unref(form).status, "pending")) ? " selected" : ""}${_scopeId}>Pending</option><option value="active" data-v-482b3a1c${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "active") : ssrLooseEqual(unref(form).status, "active")) ? " selected" : ""}${_scopeId}>Active</option><option value="inactive" data-v-482b3a1c${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "inactive") : ssrLooseEqual(unref(form).status, "inactive")) ? " selected" : ""}${_scopeId}>Inactive</option></select></div><label class="flex items-center gap-2 text-sm text-slate-600" data-v-482b3a1c${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).active) ? ssrLooseContain(unref(form).active, null) : unref(form).active) ? " checked" : ""} type="checkbox" class="rounded" data-v-482b3a1c${_scopeId}> Active on register </label><label class="flex items-center gap-2 text-sm text-slate-600" data-v-482b3a1c${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).photo_consent) ? ssrLooseContain(unref(form).photo_consent, null) : unref(form).photo_consent) ? " checked" : ""} type="checkbox" class="rounded" data-v-482b3a1c${_scopeId}> Photo consent </label><div class="md:col-span-2 flex justify-end gap-3 pt-4" data-v-482b3a1c${_scopeId}><button type="submit" class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-482b3a1c${_scopeId}> Save changes </button></div></form></div><div class="panel p-6" data-v-482b3a1c${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-482b3a1c${_scopeId}>Guardians</p><p class="text-xs text-slate-500" data-v-482b3a1c${_scopeId}>Primary contacts</p><div class="mt-4 space-y-3" data-v-482b3a1c${_scopeId}><!--[-->`);
            ssrRenderList(__props.youth.guardians, (guardian) => {
              _push2(`<div class="rounded-2xl border border-slate-100 bg-slate-50 p-4" data-v-482b3a1c${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-482b3a1c${_scopeId}>${ssrInterpolate(guardian.first_name)} ${ssrInterpolate(guardian.last_name)}</p><p class="text-xs text-slate-500" data-v-482b3a1c${_scopeId}>${ssrInterpolate(guardian.relationship)}</p><p class="text-sm text-slate-600" data-v-482b3a1c${_scopeId}>${ssrInterpolate(guardian.primary_phone)}</p></div>`);
            });
            _push2(`<!--]-->`);
            if (!__props.youth.guardians.length) {
              _push2(`<p class="text-sm text-slate-500" data-v-482b3a1c${_scopeId}>No guardians linked yet.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></section><section class="grid gap-6 lg:grid-cols-3" data-v-482b3a1c${_scopeId}><div class="panel p-6 lg:col-span-2" data-v-482b3a1c${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-482b3a1c${_scopeId}>Recent attendance</p><ul class="mt-4 divide-y divide-slate-100" data-v-482b3a1c${_scopeId}><!--[-->`);
            ssrRenderList(__props.youth.attendance_records, (record) => {
              _push2(`<li class="flex items-center justify-between py-3 text-sm" data-v-482b3a1c${_scopeId}><span class="text-slate-600" data-v-482b3a1c${_scopeId}>${ssrInterpolate(new Date(record.session.session_date).toLocaleDateString())}</span><span class="text-sm font-semibold text-slate-900" data-v-482b3a1c${_scopeId}>${ssrInterpolate(record.status)}</span></li>`);
            });
            _push2(`<!--]-->`);
            if (!__props.youth.attendance_records?.length) {
              _push2(`<li class="py-4 text-sm text-slate-500" data-v-482b3a1c${_scopeId}>No attendance yet.</li>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</ul></div><div class="panel p-6" data-v-482b3a1c${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-482b3a1c${_scopeId}>Consents</p><div class="mt-4 space-y-3" data-v-482b3a1c${_scopeId}><!--[-->`);
            ssrRenderList(__props.youth.consents, (consent) => {
              _push2(`<div class="rounded-2xl border border-slate-100 p-3 text-sm" data-v-482b3a1c${_scopeId}><p class="font-semibold text-slate-900" data-v-482b3a1c${_scopeId}>Signed ${ssrInterpolate(new Date(consent.signed_at).toLocaleDateString())}</p><div class="mt-2 flex flex-wrap gap-2 text-xs text-slate-600" data-v-482b3a1c${_scopeId}><span class="${ssrRenderClass(consent.general_attendance ? "text-emerald-600" : "text-rose-500")}" data-v-482b3a1c${_scopeId}>Weekly</span><span class="${ssrRenderClass(consent.offsite_events ? "text-emerald-600" : "text-rose-500")}" data-v-482b3a1c${_scopeId}>Offsite</span><span class="${ssrRenderClass(consent.media_consent ? "text-emerald-600" : "text-rose-500")}" data-v-482b3a1c${_scopeId}>Media</span></div></div>`);
            });
            _push2(`<!--]-->`);
            if (!__props.youth.consents.length) {
              _push2(`<p class="text-sm text-slate-500" data-v-482b3a1c${_scopeId}>Awaiting guardian consent.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4" data-v-482b3a1c${_scopeId}><p class="text-xs uppercase tracking-wide text-slate-500" data-v-482b3a1c${_scopeId}>Tokens</p><p class="text-3xl font-semibold text-slate-900" data-v-482b3a1c${_scopeId}>${ssrInterpolate(__props.youth.token_account?.balance ?? 0)}</p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.tokens.index"),
              class: "mt-2 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Token console `);
                  _push3(ssrRenderComponent(Icons.ArrowUpRight, { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Token console "),
                    createVNode(Icons.ArrowUpRight, { class: "h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></section></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: props.youth.first_name
              }, null, 8, ["title"]),
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "flex flex-wrap items-center justify-between gap-4" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-xs uppercase tracking-wide text-slate-500" }, "Young person"),
                    createVNode("h1", { class: "text-2xl font-semibold text-slate-900" }, toDisplayString(props.youth.first_name) + " " + toDisplayString(props.youth.last_name), 1),
                    createVNode("p", { class: "text-sm text-slate-500" }, "Preferred name: " + toDisplayString(props.youth.preferred_name || "—"), 1)
                  ]),
                  createVNode(unref(Link), {
                    href: _ctx.route("admin.youth.index"),
                    class: "rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" ← Back to directory ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("section", { class: "grid gap-6 lg:grid-cols-3" }, [
                  createVNode("div", { class: "panel p-6 lg:col-span-2" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Profile & status"),
                        createVNode("p", { class: "text-xs text-slate-500" }, "Update status or preferred name")
                      ]),
                      createVNode("span", {
                        class: ["rounded-full px-3 py-1 text-xs font-semibold", props.youth.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"]
                      }, toDisplayString(props.youth.status), 3)
                    ]),
                    createVNode("form", {
                      class: "mt-6 grid gap-4 md:grid-cols-2",
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "First name"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).first_name = $event,
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).first_name]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Last name"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).last_name]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Preferred name"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).preferred_name = $event,
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).preferred_name]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Status"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).status = $event,
                          class: "form-input"
                        }, [
                          createVNode("option", { value: "pending" }, "Pending"),
                          createVNode("option", { value: "active" }, "Active"),
                          createVNode("option", { value: "inactive" }, "Inactive")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).status]
                        ])
                      ]),
                      createVNode("label", { class: "flex items-center gap-2 text-sm text-slate-600" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).active = $event,
                          type: "checkbox",
                          class: "rounded"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).active]
                        ]),
                        createTextVNode(" Active on register ")
                      ]),
                      createVNode("label", { class: "flex items-center gap-2 text-sm text-slate-600" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).photo_consent = $event,
                          type: "checkbox",
                          class: "rounded"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).photo_consent]
                        ]),
                        createTextVNode(" Photo consent ")
                      ]),
                      createVNode("div", { class: "md:col-span-2 flex justify-end gap-3 pt-4" }, [
                        createVNode("button", {
                          type: "submit",
                          class: "rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white",
                          disabled: unref(form).processing
                        }, " Save changes ", 8, ["disabled"])
                      ])
                    ], 32)
                  ]),
                  createVNode("div", { class: "panel p-6" }, [
                    createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Guardians"),
                    createVNode("p", { class: "text-xs text-slate-500" }, "Primary contacts"),
                    createVNode("div", { class: "mt-4 space-y-3" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.youth.guardians, (guardian) => {
                        return openBlock(), createBlock("div", {
                          key: guardian.id,
                          class: "rounded-2xl border border-slate-100 bg-slate-50 p-4"
                        }, [
                          createVNode("p", { class: "text-sm font-semibold text-slate-900" }, toDisplayString(guardian.first_name) + " " + toDisplayString(guardian.last_name), 1),
                          createVNode("p", { class: "text-xs text-slate-500" }, toDisplayString(guardian.relationship), 1),
                          createVNode("p", { class: "text-sm text-slate-600" }, toDisplayString(guardian.primary_phone), 1)
                        ]);
                      }), 128)),
                      !__props.youth.guardians.length ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-slate-500"
                      }, "No guardians linked yet.")) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                createVNode("section", { class: "grid gap-6 lg:grid-cols-3" }, [
                  createVNode("div", { class: "panel p-6 lg:col-span-2" }, [
                    createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Recent attendance"),
                    createVNode("ul", { class: "mt-4 divide-y divide-slate-100" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.youth.attendance_records, (record) => {
                        return openBlock(), createBlock("li", {
                          key: record.id,
                          class: "flex items-center justify-between py-3 text-sm"
                        }, [
                          createVNode("span", { class: "text-slate-600" }, toDisplayString(new Date(record.session.session_date).toLocaleDateString()), 1),
                          createVNode("span", { class: "text-sm font-semibold text-slate-900" }, toDisplayString(record.status), 1)
                        ]);
                      }), 128)),
                      !__props.youth.attendance_records?.length ? (openBlock(), createBlock("li", {
                        key: 0,
                        class: "py-4 text-sm text-slate-500"
                      }, "No attendance yet.")) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "panel p-6" }, [
                    createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Consents"),
                    createVNode("div", { class: "mt-4 space-y-3" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.youth.consents, (consent) => {
                        return openBlock(), createBlock("div", {
                          key: consent.id,
                          class: "rounded-2xl border border-slate-100 p-3 text-sm"
                        }, [
                          createVNode("p", { class: "font-semibold text-slate-900" }, "Signed " + toDisplayString(new Date(consent.signed_at).toLocaleDateString()), 1),
                          createVNode("div", { class: "mt-2 flex flex-wrap gap-2 text-xs text-slate-600" }, [
                            createVNode("span", {
                              class: consent.general_attendance ? "text-emerald-600" : "text-rose-500"
                            }, "Weekly", 2),
                            createVNode("span", {
                              class: consent.offsite_events ? "text-emerald-600" : "text-rose-500"
                            }, "Offsite", 2),
                            createVNode("span", {
                              class: consent.media_consent ? "text-emerald-600" : "text-rose-500"
                            }, "Media", 2)
                          ])
                        ]);
                      }), 128)),
                      !__props.youth.consents.length ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-slate-500"
                      }, "Awaiting guardian consent.")) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4" }, [
                      createVNode("p", { class: "text-xs uppercase tracking-wide text-slate-500" }, "Tokens"),
                      createVNode("p", { class: "text-3xl font-semibold text-slate-900" }, toDisplayString(__props.youth.token_account?.balance ?? 0), 1),
                      createVNode(unref(Link), {
                        href: _ctx.route("admin.tokens.index"),
                        class: "mt-2 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Token console "),
                          createVNode(Icons.ArrowUpRight, { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Youth/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-482b3a1c"]]);
export {
  Show as default
};
