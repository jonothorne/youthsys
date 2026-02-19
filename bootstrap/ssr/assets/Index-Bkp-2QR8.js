import { ref, watch, withCtx, unref, createTextVNode, createVNode, toDisplayString, withDirectives, vModelText, openBlock, createBlock, Fragment, renderList, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-XQF9hSWa.js";
import { router, useForm, Head, Link } from "@inertiajs/vue3";
import * as Icons from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "clsx";
import "axios";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    youth: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const search = ref(props.filters?.search ?? "");
    watch(search, (value) => {
      router.get(route("admin.youth.index"), { search: value }, { preserveState: true, replace: true });
    });
    const createForm = useForm({
      first_name: "",
      last_name: "",
      preferred_name: "",
      date_of_birth: "",
      gender: ""
    });
    const showDrawer = ref(false);
    const submit = () => {
      createForm.post(route("admin.youth.store"), {
        onSuccess: () => {
          createForm.reset();
          showDrawer.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Young People" }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-6" data-v-1bf84ec5${_scopeId}><section class="panel" data-v-1bf84ec5${_scopeId}><div class="toolbar" data-v-1bf84ec5${_scopeId}><div data-v-1bf84ec5${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-1bf84ec5${_scopeId}>Directory</p><p class="text-xs text-slate-500" data-v-1bf84ec5${_scopeId}>${ssrInterpolate(__props.youth.total)} records</p></div><div class="flex flex-wrap items-center gap-3" data-v-1bf84ec5${_scopeId}><div class="relative flex items-center rounded-2xl border border-border/80 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm" data-v-1bf84ec5${_scopeId}>`);
            _push2(ssrRenderComponent(Icons.Search, { class: "mr-2 h-4 w-4 text-slate-400" }, null, _parent2, _scopeId));
            _push2(`<input${ssrRenderAttr("value", search.value)} class="w-40 bg-transparent text-sm focus:outline-none" placeholder="Search by name" data-v-1bf84ec5${_scopeId}></div><button class="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white" data-v-1bf84ec5${_scopeId}> Add young person </button></div></div><div class="overflow-x-auto" data-v-1bf84ec5${_scopeId}><table class="min-w-full divide-y divide-border/80 text-sm" data-v-1bf84ec5${_scopeId}><thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500" data-v-1bf84ec5${_scopeId}><tr data-v-1bf84ec5${_scopeId}><th class="px-4 py-3" data-v-1bf84ec5${_scopeId}>Name</th><th class="px-4 py-3" data-v-1bf84ec5${_scopeId}>Status</th><th class="px-4 py-3" data-v-1bf84ec5${_scopeId}>Tokens</th><th class="px-4 py-3" data-v-1bf84ec5${_scopeId}>Guardians</th><th class="px-4 py-3 text-right" data-v-1bf84ec5${_scopeId}>Actions</th></tr></thead><tbody class="divide-y divide-slate-100 bg-white" data-v-1bf84ec5${_scopeId}><!--[-->`);
            ssrRenderList(__props.youth.data, (person) => {
              _push2(`<tr class="hover:bg-slate-50" data-v-1bf84ec5${_scopeId}><td class="px-4 py-4" data-v-1bf84ec5${_scopeId}><p class="font-semibold text-slate-900" data-v-1bf84ec5${_scopeId}>${ssrInterpolate(person.first_name)} ${ssrInterpolate(person.last_name)}</p>`);
              if (person.preferred_name) {
                _push2(`<p class="text-xs text-slate-500" data-v-1bf84ec5${_scopeId}>Prefers ${ssrInterpolate(person.preferred_name)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-4 py-4" data-v-1bf84ec5${_scopeId}><span class="${ssrRenderClass([person.status === "active" ? "bg-emerald-100 text-emerald-700" : person.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600", "rounded-full px-3 py-1 text-xs font-semibold"])}" data-v-1bf84ec5${_scopeId}>${ssrInterpolate(person.status)}</span></td><td class="px-4 py-4 font-semibold text-slate-800" data-v-1bf84ec5${_scopeId}>${ssrInterpolate(person.token_account?.balance ?? 0)}</td><td class="px-4 py-4 text-slate-600" data-v-1bf84ec5${_scopeId}><!--[-->`);
              ssrRenderList(person.guardians, (guardian) => {
                _push2(`<p data-v-1bf84ec5${_scopeId}>${ssrInterpolate(guardian.first_name)} ${ssrInterpolate(guardian.last_name)}</p>`);
              });
              _push2(`<!--]--></td><td class="px-4 py-4 text-right" data-v-1bf84ec5${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin.youth.show", person.id),
                class: "text-sm font-semibold text-indigo-600"
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
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="border-t border-border/60 px-4 py-3 text-sm text-slate-500" data-v-1bf84ec5${_scopeId}> Showing ${ssrInterpolate(__props.youth.from)}-${ssrInterpolate(__props.youth.to)} of ${ssrInterpolate(__props.youth.total)} people </div></section></div>`);
            if (showDrawer.value) {
              _push2(`<div class="fixed inset-0 z-40 flex" data-v-1bf84ec5${_scopeId}><div class="w-full flex-1" data-v-1bf84ec5${_scopeId}></div><div class="h-full w-full max-w-md bg-white shadow-2xl" data-v-1bf84ec5${_scopeId}><div class="flex items-center justify-between border-b border-border px-6 py-4" data-v-1bf84ec5${_scopeId}><div data-v-1bf84ec5${_scopeId}><p class="text-lg font-semibold text-slate-900" data-v-1bf84ec5${_scopeId}>Add young person</p><p class="text-xs text-slate-500" data-v-1bf84ec5${_scopeId}>Capture their preferred name and DOB</p></div><button class="rounded-full border border-slate-200 p-2" data-v-1bf84ec5${_scopeId}>`);
              _push2(ssrRenderComponent(Icons.X, { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`</button></div><form class="space-y-4 px-6 py-6" data-v-1bf84ec5${_scopeId}><div data-v-1bf84ec5${_scopeId}><label class="form-label" data-v-1bf84ec5${_scopeId}>First name</label><input${ssrRenderAttr("value", unref(createForm).first_name)} class="form-input" data-v-1bf84ec5${_scopeId}>`);
              if (unref(createForm).errors.first_name) {
                _push2(`<p class="form-error" data-v-1bf84ec5${_scopeId}>${ssrInterpolate(unref(createForm).errors.first_name)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div data-v-1bf84ec5${_scopeId}><label class="form-label" data-v-1bf84ec5${_scopeId}>Last name</label><input${ssrRenderAttr("value", unref(createForm).last_name)} class="form-input" data-v-1bf84ec5${_scopeId}>`);
              if (unref(createForm).errors.last_name) {
                _push2(`<p class="form-error" data-v-1bf84ec5${_scopeId}>${ssrInterpolate(unref(createForm).errors.last_name)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div data-v-1bf84ec5${_scopeId}><label class="form-label" data-v-1bf84ec5${_scopeId}>Preferred name</label><input${ssrRenderAttr("value", unref(createForm).preferred_name)} class="form-input" data-v-1bf84ec5${_scopeId}></div><div data-v-1bf84ec5${_scopeId}><label class="form-label" data-v-1bf84ec5${_scopeId}>Date of birth</label><input${ssrRenderAttr("value", unref(createForm).date_of_birth)} type="date" class="form-input" data-v-1bf84ec5${_scopeId}></div><div data-v-1bf84ec5${_scopeId}><label class="form-label" data-v-1bf84ec5${_scopeId}>Gender</label><input${ssrRenderAttr("value", unref(createForm).gender)} class="form-input" data-v-1bf84ec5${_scopeId}></div><div class="flex justify-end gap-3 pt-4" data-v-1bf84ec5${_scopeId}><button type="button" class="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold" data-v-1bf84ec5${_scopeId}> Cancel </button><button type="submit" class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"${ssrIncludeBooleanAttr(unref(createForm).processing) ? " disabled" : ""} data-v-1bf84ec5${_scopeId}> Save </button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "Young People" }),
              createVNode("div", { class: "space-y-6" }, [
                createVNode("section", { class: "panel" }, [
                  createVNode("div", { class: "toolbar" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Directory"),
                      createVNode("p", { class: "text-xs text-slate-500" }, toDisplayString(__props.youth.total) + " records", 1)
                    ]),
                    createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
                      createVNode("div", { class: "relative flex items-center rounded-2xl border border-border/80 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm" }, [
                        createVNode(Icons.Search, { class: "mr-2 h-4 w-4 text-slate-400" }),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => search.value = $event,
                          class: "w-40 bg-transparent text-sm focus:outline-none",
                          placeholder: "Search by name"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, search.value]
                        ])
                      ]),
                      createVNode("button", {
                        class: "rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white",
                        onClick: ($event) => showDrawer.value = true
                      }, " Add young person ", 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "min-w-full divide-y divide-border/80 text-sm" }, [
                      createVNode("thead", { class: "bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-4 py-3" }, "Name"),
                          createVNode("th", { class: "px-4 py-3" }, "Status"),
                          createVNode("th", { class: "px-4 py-3" }, "Tokens"),
                          createVNode("th", { class: "px-4 py-3" }, "Guardians"),
                          createVNode("th", { class: "px-4 py-3 text-right" }, "Actions")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-slate-100 bg-white" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.youth.data, (person) => {
                          return openBlock(), createBlock("tr", {
                            key: person.id,
                            class: "hover:bg-slate-50"
                          }, [
                            createVNode("td", { class: "px-4 py-4" }, [
                              createVNode("p", { class: "font-semibold text-slate-900" }, toDisplayString(person.first_name) + " " + toDisplayString(person.last_name), 1),
                              person.preferred_name ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs text-slate-500"
                              }, "Prefers " + toDisplayString(person.preferred_name), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("td", { class: "px-4 py-4" }, [
                              createVNode("span", {
                                class: ["rounded-full px-3 py-1 text-xs font-semibold", person.status === "active" ? "bg-emerald-100 text-emerald-700" : person.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"]
                              }, toDisplayString(person.status), 3)
                            ]),
                            createVNode("td", { class: "px-4 py-4 font-semibold text-slate-800" }, toDisplayString(person.token_account?.balance ?? 0), 1),
                            createVNode("td", { class: "px-4 py-4 text-slate-600" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(person.guardians, (guardian) => {
                                return openBlock(), createBlock("p", {
                                  key: guardian.id
                                }, toDisplayString(guardian.first_name) + " " + toDisplayString(guardian.last_name), 1);
                              }), 128))
                            ]),
                            createVNode("td", { class: "px-4 py-4 text-right" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("admin.youth.show", person.id),
                                class: "text-sm font-semibold text-indigo-600"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Open")
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "border-t border-border/60 px-4 py-3 text-sm text-slate-500" }, " Showing " + toDisplayString(__props.youth.from) + "-" + toDisplayString(__props.youth.to) + " of " + toDisplayString(__props.youth.total) + " people ", 1)
                ])
              ]),
              showDrawer.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 z-40 flex"
              }, [
                createVNode("div", {
                  class: "w-full flex-1",
                  onClick: ($event) => showDrawer.value = false
                }, null, 8, ["onClick"]),
                createVNode("div", { class: "h-full w-full max-w-md bg-white shadow-2xl" }, [
                  createVNode("div", { class: "flex items-center justify-between border-b border-border px-6 py-4" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-lg font-semibold text-slate-900" }, "Add young person"),
                      createVNode("p", { class: "text-xs text-slate-500" }, "Capture their preferred name and DOB")
                    ]),
                    createVNode("button", {
                      class: "rounded-full border border-slate-200 p-2",
                      onClick: ($event) => showDrawer.value = false
                    }, [
                      createVNode(Icons.X, { class: "h-4 w-4" })
                    ], 8, ["onClick"])
                  ]),
                  createVNode("form", {
                    class: "space-y-4 px-6 py-6",
                    onSubmit: withModifiers(submit, ["prevent"])
                  }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "form-label" }, "First name"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(createForm).first_name = $event,
                        class: "form-input"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(createForm).first_name]
                      ]),
                      unref(createForm).errors.first_name ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "form-error"
                      }, toDisplayString(unref(createForm).errors.first_name), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "form-label" }, "Last name"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(createForm).last_name = $event,
                        class: "form-input"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(createForm).last_name]
                      ]),
                      unref(createForm).errors.last_name ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "form-error"
                      }, toDisplayString(unref(createForm).errors.last_name), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "form-label" }, "Preferred name"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(createForm).preferred_name = $event,
                        class: "form-input"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(createForm).preferred_name]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "form-label" }, "Date of birth"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(createForm).date_of_birth = $event,
                        type: "date",
                        class: "form-input"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(createForm).date_of_birth]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "form-label" }, "Gender"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(createForm).gender = $event,
                        class: "form-input"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(createForm).gender]
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end gap-3 pt-4" }, [
                      createVNode("button", {
                        type: "button",
                        class: "rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold",
                        onClick: ($event) => showDrawer.value = false
                      }, " Cancel ", 8, ["onClick"]),
                      createVNode("button", {
                        type: "submit",
                        class: "rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white",
                        disabled: unref(createForm).processing
                      }, " Save ", 8, ["disabled"])
                    ])
                  ], 32)
                ])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Youth/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1bf84ec5"]]);
export {
  Index as default
};
