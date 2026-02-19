import { resolveComponent, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "ThankYou",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_center = resolveComponent("center");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Thank You" }, null, _parent));
      _push(`<div class="flex min-h-screen items-center justify-center bg-slate-100 p-6"><div class="max-w-xl rounded-2xl bg-white p-10 text-center shadow"><div class="text-6xl">🎉</div>`);
      _push(ssrRenderComponent(_component_center, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="/build/assets/logo.png" alt="Alive Youth" width="350px"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: "/build/assets/logo.png",
                alt: "Alive Youth",
                width: "350px"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="mt-4 text-3xl font-bold text-slate-900">Thanks for signing up!</h1><p class="mt-3 text-slate-600"> Our team has received your submission. We will review the details and confirm once everything is approved. </p><p class="mt-2 text-slate-500"> In the meantime feel free to reach out to us at <a href="mailto:youth@alive.church" class="text-blue-600">youth@alive.church</a> if anything changes. </p>`);
      _push(ssrRenderComponent(unref(Link), {
        class: "mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow hover:bg-blue-500",
        href: _ctx.route("enrolment.form")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Submit another young person `);
          } else {
            return [
              createTextVNode(" Submit another young person ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Enrolment/ThankYou.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
