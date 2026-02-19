import { withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, withDirectives, vModelSelect, vModelText, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-BcAfAWCX.js";
import { useForm, Head, router } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "lucide-vue-next";
import "clsx";
import "axios";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    users: Array,
    roles: Array
  },
  setup(__props) {
    const props = __props;
    const createForm = useForm({
      name: "",
      email: "",
      password: "",
      role: "token_operator"
    });
    const updateForms = props.users.reduce((acc, user) => {
      acc[user.id] = useForm({
        name: user.name,
        role: user.roles[0]?.name ?? "token_operator",
        password: ""
      });
      return acc;
    }, {});
    const store = () => {
      createForm.post(route("admin.users.store"), {
        onSuccess: () => createForm.reset("name", "email", "password")
      });
    };
    const updateUser = (userId) => {
      updateForms[userId].put(route("admin.users.update", userId), {
        preserveScroll: true,
        onSuccess: () => updateForms[userId].reset("password")
      });
    };
    const removeUser = (userId) => {
      if (!confirm("Remove this team member?")) return;
      router.delete(route("admin.users.destroy", userId));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Team" }, null, _parent2, _scopeId));
            _push2(`<div class="grid gap-6 py-4 lg:grid-cols-3" data-v-f127d16b${_scopeId}><section class="panel p-6 lg:col-span-2" data-v-f127d16b${_scopeId}><h3 class="text-lg font-semibold text-slate-900" data-v-f127d16b${_scopeId}>Current team</h3><p class="text-sm text-slate-500" data-v-f127d16b${_scopeId}>Promote or reset passwords.</p><div class="mt-4 divide-y divide-slate-100" data-v-f127d16b${_scopeId}><!--[-->`);
            ssrRenderList(__props.users, (user) => {
              _push2(`<div class="py-4" data-v-f127d16b${_scopeId}><div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between" data-v-f127d16b${_scopeId}><div data-v-f127d16b${_scopeId}><p class="text-base font-semibold text-slate-900" data-v-f127d16b${_scopeId}>${ssrInterpolate(user.name)}</p><p class="text-sm text-slate-500" data-v-f127d16b${_scopeId}>${ssrInterpolate(user.email)}</p></div><div class="flex flex-col gap-2 md:flex-row md:items-center" data-v-f127d16b${_scopeId}><select class="rounded-lg border border-slate-200 px-3 py-2 text-sm" data-v-f127d16b${_scopeId}><!--[-->`);
              ssrRenderList(__props.roles, (role) => {
                _push2(`<option${ssrRenderAttr("value", role)} data-v-f127d16b${ssrIncludeBooleanAttr(Array.isArray(unref(updateForms)[user.id].role) ? ssrLooseContain(unref(updateForms)[user.id].role, role) : ssrLooseEqual(unref(updateForms)[user.id].role, role)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(role)}</option>`);
              });
              _push2(`<!--]--></select><input${ssrRenderAttr("value", unref(updateForms)[user.id].password)} type="password" placeholder="New password (optional)" class="rounded-lg border border-slate-200 px-3 py-2 text-sm" data-v-f127d16b${_scopeId}><button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"${ssrIncludeBooleanAttr(unref(updateForms)[user.id].processing) ? " disabled" : ""} data-v-f127d16b${_scopeId}> Save </button><button class="rounded-lg border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600"${ssrIncludeBooleanAttr(user.id === _ctx.$page.props.auth.user.id) ? " disabled" : ""} data-v-f127d16b${_scopeId}> Remove </button></div></div>`);
              if (unref(updateForms)[user.id].errors.role) {
                _push2(`<p class="text-sm text-rose-600" data-v-f127d16b${_scopeId}>${ssrInterpolate(unref(updateForms)[user.id].errors.role)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            if (!__props.users.length) {
              _push2(`<p class="py-4 text-sm text-slate-500" data-v-f127d16b${_scopeId}>No team members yet.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></section><section class="panel p-6" data-v-f127d16b${_scopeId}><h3 class="text-lg font-semibold text-slate-900" data-v-f127d16b${_scopeId}>Invite leader</h3><form class="mt-4 space-y-4" data-v-f127d16b${_scopeId}><div data-v-f127d16b${_scopeId}><label class="form-label" data-v-f127d16b${_scopeId}>Name</label><input${ssrRenderAttr("value", unref(createForm).name)} class="form-input" data-v-f127d16b${_scopeId}>`);
            if (unref(createForm).errors.name) {
              _push2(`<p class="form-error" data-v-f127d16b${_scopeId}>${ssrInterpolate(unref(createForm).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-f127d16b${_scopeId}><label class="form-label" data-v-f127d16b${_scopeId}>Email</label><input${ssrRenderAttr("value", unref(createForm).email)} type="email" class="form-input" data-v-f127d16b${_scopeId}>`);
            if (unref(createForm).errors.email) {
              _push2(`<p class="form-error" data-v-f127d16b${_scopeId}>${ssrInterpolate(unref(createForm).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-f127d16b${_scopeId}><label class="form-label" data-v-f127d16b${_scopeId}>Temporary password</label><input${ssrRenderAttr("value", unref(createForm).password)} type="password" class="form-input" data-v-f127d16b${_scopeId}>`);
            if (unref(createForm).errors.password) {
              _push2(`<p class="form-error" data-v-f127d16b${_scopeId}>${ssrInterpolate(unref(createForm).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-f127d16b${_scopeId}><label class="form-label" data-v-f127d16b${_scopeId}>Role</label><select class="form-input" data-v-f127d16b${_scopeId}><!--[-->`);
            ssrRenderList(__props.roles, (role) => {
              _push2(`<option${ssrRenderAttr("value", role)} data-v-f127d16b${ssrIncludeBooleanAttr(Array.isArray(unref(createForm).role) ? ssrLooseContain(unref(createForm).role, role) : ssrLooseEqual(unref(createForm).role, role)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(role)}</option>`);
            });
            _push2(`<!--]--></select></div><button type="submit" class="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"${ssrIncludeBooleanAttr(unref(createForm).processing) ? " disabled" : ""} data-v-f127d16b${_scopeId}> Add team member </button></form></section></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Team" }),
              createVNode("div", { class: "grid gap-6 py-4 lg:grid-cols-3" }, [
                createVNode("section", { class: "panel p-6 lg:col-span-2" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-slate-900" }, "Current team"),
                  createVNode("p", { class: "text-sm text-slate-500" }, "Promote or reset passwords."),
                  createVNode("div", { class: "mt-4 divide-y divide-slate-100" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.users, (user) => {
                      return openBlock(), createBlock("div", {
                        key: user.id,
                        class: "py-4"
                      }, [
                        createVNode("div", { class: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-base font-semibold text-slate-900" }, toDisplayString(user.name), 1),
                            createVNode("p", { class: "text-sm text-slate-500" }, toDisplayString(user.email), 1)
                          ]),
                          createVNode("div", { class: "flex flex-col gap-2 md:flex-row md:items-center" }, [
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(updateForms)[user.id].role = $event,
                              class: "rounded-lg border border-slate-200 px-3 py-2 text-sm"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.roles, (role) => {
                                return openBlock(), createBlock("option", {
                                  key: role,
                                  value: role
                                }, toDisplayString(role), 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(updateForms)[user.id].role]
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(updateForms)[user.id].password = $event,
                              type: "password",
                              placeholder: "New password (optional)",
                              class: "rounded-lg border border-slate-200 px-3 py-2 text-sm"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(updateForms)[user.id].password]
                            ]),
                            createVNode("button", {
                              class: "rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white",
                              onClick: ($event) => updateUser(user.id),
                              disabled: unref(updateForms)[user.id].processing
                            }, " Save ", 8, ["onClick", "disabled"]),
                            createVNode("button", {
                              class: "rounded-lg border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600",
                              onClick: ($event) => removeUser(user.id),
                              disabled: user.id === _ctx.$page.props.auth.user.id
                            }, " Remove ", 8, ["onClick", "disabled"])
                          ])
                        ]),
                        unref(updateForms)[user.id].errors.role ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-rose-600"
                        }, toDisplayString(unref(updateForms)[user.id].errors.role), 1)) : createCommentVNode("", true)
                      ]);
                    }), 128)),
                    !__props.users.length ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "py-4 text-sm text-slate-500"
                    }, "No team members yet.")) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("section", { class: "panel p-6" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-slate-900" }, "Invite leader"),
                  createVNode("form", {
                    class: "mt-4 space-y-4",
                    onSubmit: withModifiers(store, ["prevent"])
                  }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "form-label" }, "Name"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
                        class: "form-input"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(createForm).name]
                      ]),
                      unref(createForm).errors.name ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "form-error"
                      }, toDisplayString(unref(createForm).errors.name), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "form-label" }, "Email"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(createForm).email = $event,
                        type: "email",
                        class: "form-input"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(createForm).email]
                      ]),
                      unref(createForm).errors.email ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "form-error"
                      }, toDisplayString(unref(createForm).errors.email), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "form-label" }, "Temporary password"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(createForm).password = $event,
                        type: "password",
                        class: "form-input"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(createForm).password]
                      ]),
                      unref(createForm).errors.password ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "form-error"
                      }, toDisplayString(unref(createForm).errors.password), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "form-label" }, "Role"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(createForm).role = $event,
                        class: "form-input"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.roles, (role) => {
                          return openBlock(), createBlock("option", {
                            key: role,
                            value: role
                          }, toDisplayString(role), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(createForm).role]
                      ])
                    ]),
                    createVNode("button", {
                      type: "submit",
                      class: "w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white",
                      disabled: unref(createForm).processing
                    }, " Add team member ", 8, ["disabled"])
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Users/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f127d16b"]]);
export {
  Index as default
};
