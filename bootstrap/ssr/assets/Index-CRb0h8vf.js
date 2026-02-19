import { ref, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-7_VVwp8m.js";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "lucide-vue-next";
import "clsx";
import "axios";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    accounts: Array,
    recentTransactions: Array
  },
  setup(__props) {
    const selected = ref([]);
    const form = useForm({
      young_person_ids: [],
      amount: 1,
      reason: "Reward earned"
    });
    const toggleSelect = (id) => {
      if (selected.value.includes(id)) {
        selected.value = selected.value.filter((item) => item !== id);
      } else {
        selected.value.push(id);
      }
    };
    const adjust = (amount, id = null) => {
      form.amount = amount;
      form.young_person_ids = id ? [id] : [...selected.value];
      if (!form.young_person_ids.length) return;
      form.post(route("admin.tokens.adjust"), {
        preserveScroll: true,
        onSuccess: () => {
          selected.value = [];
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Tokens" }, null, _parent2, _scopeId));
            _push2(`<div class="grid gap-6 lg:grid-cols-3" data-v-07bb7661${_scopeId}><section class="panel p-6 lg:col-span-2" data-v-07bb7661${_scopeId}><div class="flex flex-wrap items-center justify-between gap-3" data-v-07bb7661${_scopeId}><div data-v-07bb7661${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-07bb7661${_scopeId}>Token balances</p><p class="text-xs text-slate-500" data-v-07bb7661${_scopeId}>Select multiple and apply actions</p></div><div class="flex flex-wrap items-center gap-2 text-xs" data-v-07bb7661${_scopeId}><button class="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600" data-v-07bb7661${_scopeId}>Clear</button><button class="rounded-full bg-emerald-600 px-3 py-1 font-semibold text-white" data-v-07bb7661${_scopeId}>+1 selected</button><button class="rounded-full bg-emerald-700 px-3 py-1 font-semibold text-white" data-v-07bb7661${_scopeId}>+5 selected</button><button class="rounded-full bg-rose-500 px-3 py-1 font-semibold text-white" data-v-07bb7661${_scopeId}>-5 selected</button></div></div><div class="mt-4 overflow-x-auto" data-v-07bb7661${_scopeId}><table class="min-w-full divide-y divide-border text-sm" data-v-07bb7661${_scopeId}><thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500" data-v-07bb7661${_scopeId}><tr data-v-07bb7661${_scopeId}><th class="px-4 py-3" data-v-07bb7661${_scopeId}></th><th class="px-4 py-3" data-v-07bb7661${_scopeId}>Name</th><th class="px-4 py-3" data-v-07bb7661${_scopeId}>Balance</th><th class="px-4 py-3 text-right" data-v-07bb7661${_scopeId}>Actions</th></tr></thead><tbody class="divide-y divide-slate-100 bg-white" data-v-07bb7661${_scopeId}><!--[-->`);
            ssrRenderList(__props.accounts, (account) => {
              _push2(`<tr class="hover:bg-slate-50" data-v-07bb7661${_scopeId}><td class="px-4 py-3" data-v-07bb7661${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(selected.value.includes(account.id)) ? " checked" : ""} data-v-07bb7661${_scopeId}></td><td class="px-4 py-3" data-v-07bb7661${_scopeId}><p class="font-semibold text-slate-900" data-v-07bb7661${_scopeId}>${ssrInterpolate(account.first_name)} ${ssrInterpolate(account.last_name)}</p><p class="text-xs text-slate-500" data-v-07bb7661${_scopeId}>${ssrInterpolate(account.preferred_name)}</p></td><td class="px-4 py-3 text-lg font-semibold text-emerald-600" data-v-07bb7661${_scopeId}>${ssrInterpolate(account.token_account?.balance ?? 0)}</td><td class="px-4 py-3 text-right" data-v-07bb7661${_scopeId}><div class="space-x-2" data-v-07bb7661${_scopeId}><button class="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white" data-v-07bb7661${_scopeId}>+1</button><button class="rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white" data-v-07bb7661${_scopeId}>+5</button><button class="rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white" data-v-07bb7661${_scopeId}>-5</button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></section><section class="panel flex flex-col gap-6 p-6" data-v-07bb7661${_scopeId}><div data-v-07bb7661${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-07bb7661${_scopeId}>Recent activity</p><ul class="mt-4 space-y-3 text-sm" data-v-07bb7661${_scopeId}><!--[-->`);
            ssrRenderList(__props.recentTransactions, (transaction) => {
              _push2(`<li class="flex items-center justify-between rounded-2xl border border-slate-100 px-3 py-2" data-v-07bb7661${_scopeId}><div data-v-07bb7661${_scopeId}><p class="font-semibold text-slate-900" data-v-07bb7661${_scopeId}>${ssrInterpolate(transaction.young_person.first_name)}</p><p class="text-xs text-slate-500" data-v-07bb7661${_scopeId}>${ssrInterpolate(transaction.reason ?? transaction.type)}</p></div><span class="${ssrRenderClass([transaction.amount > 0 ? "text-emerald-600" : "text-rose-500", "font-semibold"])}" data-v-07bb7661${_scopeId}>${ssrInterpolate(transaction.amount > 0 ? "+" : "")}${ssrInterpolate(transaction.amount)}</span></li>`);
            });
            _push2(`<!--]-->`);
            if (!__props.recentTransactions.length) {
              _push2(`<li class="text-sm text-slate-500" data-v-07bb7661${_scopeId}>No token movements yet.</li>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</ul></div><div data-v-07bb7661${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-07bb7661${_scopeId}>Reason</p><input${ssrRenderAttr("value", unref(form).reason)} class="form-input mt-2" placeholder="eg. Worship team" data-v-07bb7661${_scopeId}></div><div class="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600" data-v-07bb7661${_scopeId}><p class="font-semibold text-slate-900" data-v-07bb7661${_scopeId}>Tips</p><ul class="mt-2 list-disc space-y-1 pl-5" data-v-07bb7661${_scopeId}><li data-v-07bb7661${_scopeId}>Select multiple youth for group rewards.</li><li data-v-07bb7661${_scopeId}>Use negative values to redeem in the shop.</li><li data-v-07bb7661${_scopeId}>Tie reasons to events for better reporting.</li></ul></div></section></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Tokens" }),
              createVNode("div", { class: "grid gap-6 lg:grid-cols-3" }, [
                createVNode("section", { class: "panel p-6 lg:col-span-2" }, [
                  createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Token balances"),
                      createVNode("p", { class: "text-xs text-slate-500" }, "Select multiple and apply actions")
                    ]),
                    createVNode("div", { class: "flex flex-wrap items-center gap-2 text-xs" }, [
                      createVNode("button", {
                        class: "rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600",
                        onClick: ($event) => selected.value = []
                      }, "Clear", 8, ["onClick"]),
                      createVNode("button", {
                        class: "rounded-full bg-emerald-600 px-3 py-1 font-semibold text-white",
                        onClick: ($event) => adjust(1)
                      }, "+1 selected", 8, ["onClick"]),
                      createVNode("button", {
                        class: "rounded-full bg-emerald-700 px-3 py-1 font-semibold text-white",
                        onClick: ($event) => adjust(5)
                      }, "+5 selected", 8, ["onClick"]),
                      createVNode("button", {
                        class: "rounded-full bg-rose-500 px-3 py-1 font-semibold text-white",
                        onClick: ($event) => adjust(-5)
                      }, "-5 selected", 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "mt-4 overflow-x-auto" }, [
                    createVNode("table", { class: "min-w-full divide-y divide-border text-sm" }, [
                      createVNode("thead", { class: "bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-4 py-3" }),
                          createVNode("th", { class: "px-4 py-3" }, "Name"),
                          createVNode("th", { class: "px-4 py-3" }, "Balance"),
                          createVNode("th", { class: "px-4 py-3 text-right" }, "Actions")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-slate-100 bg-white" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.accounts, (account) => {
                          return openBlock(), createBlock("tr", {
                            key: account.id,
                            class: "hover:bg-slate-50"
                          }, [
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("input", {
                                type: "checkbox",
                                checked: selected.value.includes(account.id),
                                onChange: ($event) => toggleSelect(account.id)
                              }, null, 40, ["checked", "onChange"])
                            ]),
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("p", { class: "font-semibold text-slate-900" }, toDisplayString(account.first_name) + " " + toDisplayString(account.last_name), 1),
                              createVNode("p", { class: "text-xs text-slate-500" }, toDisplayString(account.preferred_name), 1)
                            ]),
                            createVNode("td", { class: "px-4 py-3 text-lg font-semibold text-emerald-600" }, toDisplayString(account.token_account?.balance ?? 0), 1),
                            createVNode("td", { class: "px-4 py-3 text-right" }, [
                              createVNode("div", { class: "space-x-2" }, [
                                createVNode("button", {
                                  class: "rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white",
                                  onClick: ($event) => adjust(1, account.id)
                                }, "+1", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white",
                                  onClick: ($event) => adjust(5, account.id)
                                }, "+5", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white",
                                  onClick: ($event) => adjust(-5, account.id)
                                }, "-5", 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
                ]),
                createVNode("section", { class: "panel flex flex-col gap-6 p-6" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Recent activity"),
                    createVNode("ul", { class: "mt-4 space-y-3 text-sm" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recentTransactions, (transaction) => {
                        return openBlock(), createBlock("li", {
                          key: transaction.id,
                          class: "flex items-center justify-between rounded-2xl border border-slate-100 px-3 py-2"
                        }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "font-semibold text-slate-900" }, toDisplayString(transaction.young_person.first_name), 1),
                            createVNode("p", { class: "text-xs text-slate-500" }, toDisplayString(transaction.reason ?? transaction.type), 1)
                          ]),
                          createVNode("span", {
                            class: [transaction.amount > 0 ? "text-emerald-600" : "text-rose-500", "font-semibold"]
                          }, toDisplayString(transaction.amount > 0 ? "+" : "") + toDisplayString(transaction.amount), 3)
                        ]);
                      }), 128)),
                      !__props.recentTransactions.length ? (openBlock(), createBlock("li", {
                        key: 0,
                        class: "text-sm text-slate-500"
                      }, "No token movements yet.")) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Reason"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(form).reason = $event,
                      class: "form-input mt-2",
                      placeholder: "eg. Worship team"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).reason]
                    ])
                  ]),
                  createVNode("div", { class: "rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600" }, [
                    createVNode("p", { class: "font-semibold text-slate-900" }, "Tips"),
                    createVNode("ul", { class: "mt-2 list-disc space-y-1 pl-5" }, [
                      createVNode("li", null, "Select multiple youth for group rewards."),
                      createVNode("li", null, "Use negative values to redeem in the shop."),
                      createVNode("li", null, "Tie reasons to events for better reporting.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Tokens/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-07bb7661"]]);
export {
  Index as default
};
