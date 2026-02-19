import { withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-BcAfAWCX.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "lucide-vue-next";
import "clsx";
import "axios";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    session: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      records: props.session.records.map((record) => ({
        id: record.id,
        status: record.status,
        notes: record.notes ?? "",
        young_person: record.young_person
      }))
    });
    const statuses = ["present", "late", "absent", "excused"];
    const submit = () => {
      form.patch(route("admin.attendance.records.update", props.session.id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Attendance" }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-6"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-4"${_scopeId}><div${_scopeId}><p class="text-xs uppercase tracking-wide text-slate-500"${_scopeId}>Register</p><h1 class="text-2xl font-semibold text-slate-900"${_scopeId}>${ssrInterpolate(props.session.name)}</h1><p class="text-sm text-slate-500"${_scopeId}>${ssrInterpolate(new Date(props.session.session_date).toLocaleDateString())}</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.attendance.index"),
              class: "rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ← All sessions `);
                } else {
                  return [
                    createTextVNode(" ← All sessions ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><section class="panel p-0"${_scopeId}><div class="toolbar flex-col gap-3 sm:flex-row"${_scopeId}><div${_scopeId}><p class="text-sm font-semibold text-slate-900"${_scopeId}>Mark attendance</p><p class="text-xs text-slate-500"${_scopeId}>Tap a status to toggle quickly</p></div><button class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}> Save attendance </button></div><div class="divide-y divide-slate-100"${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).records, (record) => {
              _push2(`<div class="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"${_scopeId}><div${_scopeId}><p class="text-base font-semibold text-slate-900"${_scopeId}>${ssrInterpolate(record.young_person.first_name)} ${ssrInterpolate(record.young_person.last_name)}</p><p class="text-xs text-slate-500"${_scopeId}>${ssrInterpolate(record.young_person.guardians?.map((g) => g.first_name).join(", "))}</p></div><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(statuses, (status) => {
                _push2(`<button type="button" class="${ssrRenderClass([record.status === status ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "bg-slate-100 text-slate-600", "rounded-full px-3 py-1 text-xs font-semibold capitalize"])}"${_scopeId}>${ssrInterpolate(status)}</button>`);
              });
              _push2(`<!--]--></div><textarea class="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-600" rows="1" placeholder="Notes (optional)"${_scopeId}>${ssrInterpolate(record.notes)}</textarea></div>`);
            });
            _push2(`<!--]--></div></section></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Attendance" }),
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "flex flex-wrap items-center justify-between gap-4" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-xs uppercase tracking-wide text-slate-500" }, "Register"),
                    createVNode("h1", { class: "text-2xl font-semibold text-slate-900" }, toDisplayString(props.session.name), 1),
                    createVNode("p", { class: "text-sm text-slate-500" }, toDisplayString(new Date(props.session.session_date).toLocaleDateString()), 1)
                  ]),
                  createVNode(unref(Link), {
                    href: _ctx.route("admin.attendance.index"),
                    class: "rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" ← All sessions ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("section", { class: "panel p-0" }, [
                  createVNode("div", { class: "toolbar flex-col gap-3 sm:flex-row" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Mark attendance"),
                      createVNode("p", { class: "text-xs text-slate-500" }, "Tap a status to toggle quickly")
                    ]),
                    createVNode("button", {
                      class: "rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white",
                      onClick: submit,
                      disabled: unref(form).processing
                    }, " Save attendance ", 8, ["disabled"])
                  ]),
                  createVNode("div", { class: "divide-y divide-slate-100" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(form).records, (record) => {
                      return openBlock(), createBlock("div", {
                        key: record.id,
                        class: "flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"
                      }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-base font-semibold text-slate-900" }, toDisplayString(record.young_person.first_name) + " " + toDisplayString(record.young_person.last_name), 1),
                          createVNode("p", { class: "text-xs text-slate-500" }, toDisplayString(record.young_person.guardians?.map((g) => g.first_name).join(", ")), 1)
                        ]),
                        createVNode("div", { class: "flex flex-wrap gap-2" }, [
                          (openBlock(), createBlock(Fragment, null, renderList(statuses, (status) => {
                            return createVNode("button", {
                              key: status,
                              type: "button",
                              class: ["rounded-full px-3 py-1 text-xs font-semibold capitalize", record.status === status ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "bg-slate-100 text-slate-600"],
                              onClick: ($event) => record.status = status
                            }, toDisplayString(status), 11, ["onClick"]);
                          }), 64))
                        ]),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => record.notes = $event,
                          class: "w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-600",
                          rows: "1",
                          placeholder: "Notes (optional)"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, record.notes]
                        ])
                      ]);
                    }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Attendance/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
