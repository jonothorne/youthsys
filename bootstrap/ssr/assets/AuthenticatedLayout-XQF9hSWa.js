import { ref, watch, mergeProps, useSSRContext, computed, unref, withCtx, createTextVNode, createVNode, resolveDynamicComponent, openBlock, createBlock, toDisplayString, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderVNode, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import * as Icons from "lucide-vue-next";
import "clsx";
import axios from "axios";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const navigationItems = [
  {
    label: "Overview",
    route: "dashboard",
    icon: "LayoutDashboard",
    permissions: ["view analytics", "manage attendance", "manage youth", "manage tokens", "operate tokens"],
    description: "Metrics and quick actions"
  },
  {
    label: "Young People",
    route: "admin.youth.index",
    icon: "Users",
    permissions: ["manage youth"],
    description: "Profiles, guardians, and medical info"
  },
  {
    label: "Attendance",
    route: "admin.attendance.index",
    icon: "CalendarCheck2",
    permissions: ["manage attendance"],
    description: "Registers and attendance stats"
  },
  {
    label: "Tokens",
    route: "admin.tokens.index",
    icon: "Coins",
    permissions: ["manage tokens", "operate tokens"],
    description: "Rewards console for leaders"
  },
  {
    label: "Team",
    route: "admin.users.index",
    icon: "Shield",
    permissions: ["manage users"],
    description: "Manage leader accounts and access"
  }
];
const _sfc_main$1 = {
  __name: "CommandPalette",
  __ssrInlineRender: true,
  props: {
    show: Boolean
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const query = ref("");
    const results = ref([]);
    const loading = ref(false);
    const highlightIndex = ref(0);
    let timeoutId;
    watch(query, (value) => {
      clearTimeout(timeoutId);
      if (!value) {
        results.value = [];
        return;
      }
      timeoutId = setTimeout(async () => {
        loading.value = true;
        try {
          const response = await axios.get(route("admin.search"), {
            params: { query: value }
          });
          results.value = response.data.results;
          highlightIndex.value = 0;
        } catch (error) {
          console.error(error);
        } finally {
          loading.value = false;
        }
      }, 250);
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 backdrop-blur" }, _attrs))} data-v-047a15ed><div class="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900/90 p-4 text-white shadow-2xl" data-v-047a15ed><div class="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-4 py-2" data-v-047a15ed>`);
        _push(ssrRenderComponent(Icons.Search, { class: "h-4 w-4 text-white/70" }, null, _parent));
        _push(`<input${ssrRenderAttr("value", query.value)} autofocus type="text" placeholder="Search youth, sessions, tokens" class="flex-1 bg-transparent text-sm placeholder:text-white/60 focus:outline-none" data-v-047a15ed><span class="text-xs text-white/60" data-v-047a15ed>Enter ↵</span></div><div class="mt-4 max-h-80 overflow-y-auto rounded-2xl border border-white/10 bg-white/5" data-v-047a15ed>`);
        if (loading.value) {
          _push(`<p class="p-4 text-sm text-white/80" data-v-047a15ed>Searching…</p>`);
        } else {
          _push(`<ul data-v-047a15ed><!--[-->`);
          ssrRenderList(results.value, (item, index) => {
            _push(`<li class="${ssrRenderClass([index === highlightIndex.value ? "bg-white/10" : "bg-transparent", "flex cursor-pointer items-center justify-between px-4 py-3"])}" data-v-047a15ed><div data-v-047a15ed><p class="text-sm font-semibold" data-v-047a15ed>${ssrInterpolate(item.label)}</p><p class="text-xs text-white/70" data-v-047a15ed>${ssrInterpolate(item.subtitle)} · ${ssrInterpolate(item.type)}</p></div>`);
            _push(ssrRenderComponent(Icons.ArrowUpRight, { class: "h-4 w-4 text-white/60" }, null, _parent));
            _push(`</li>`);
          });
          _push(`<!--]-->`);
          if (!results.value.length) {
            _push(`<li class="px-4 py-4 text-xs text-white/70" data-v-047a15ed>Start typing to find records.</li>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</ul>`);
        }
        _push(`</div><div class="mt-3 flex items-center justify-between text-xs text-white/60" data-v-047a15ed><span data-v-047a15ed>Esc to close</span><span data-v-047a15ed>Cmd/Ctrl + K</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ui/CommandPalette.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CommandPalette = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-047a15ed"]]);
const _sfc_main = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const showUserMenu = ref(false);
    const showMobileNav = ref(false);
    const showCommand = ref(false);
    document.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        showCommand.value = true;
      }
      if (event.key === "Escape") {
        showCommand.value = false;
      }
    });
    const abilities = computed(() => page.props.auth?.abilities ?? []);
    const filteredNavigation = computed(
      () => navigationItems.filter((item) => {
        if (!item.permissions || !item.permissions.length) {
          return true;
        }
        return item.permissions.some((permission) => abilities.value.includes(permission));
      })
    );
    const isRouteActive = (routeName) => route().current(routeName);
    const currentNav = computed(
      () => filteredNavigation.value.find((item) => isRouteActive(item.route))
    );
    const initials = computed(() => {
      const name = page.props.auth?.user?.name ?? "Alive Youth";
      return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
    });
    const quickLinks = [
      { label: "New register", route: "admin.attendance.index" },
      { label: "Add youth", route: "admin.youth.index" },
      { label: "Token console", route: "admin.tokens.index" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen bg-slate-950 text-foreground" }, _attrs))}><aside class="hidden w-72 flex-shrink-0 border-r border-slate-800/70 bg-slate-900 px-5 py-8 shadow-xl shadow-black/30 lg:flex lg:flex-col"><div class="flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: "text-2xl font-bold text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Alive Youth `);
          } else {
            return [
              createTextVNode(" Alive Youth ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="mt-10 space-y-2"><p class="px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Navigate</p><!--[-->`);
      ssrRenderList(filteredNavigation.value, (nav) => {
        _push(ssrRenderComponent(unref(Link), {
          key: nav.route,
          href: _ctx.route(nav.route),
          class: ["flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition", isRouteActive(nav.route) ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-600/40" : "text-slate-400 hover:bg-slate-800 hover:text-white"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(Icons[nav.icon] ?? Icons.Circle), {
                class: ["h-4 w-4", isRouteActive(nav.route) ? "text-white" : "text-slate-500"]
              }, null), _parent2, _scopeId);
              _push2(`<div class="flex flex-col"${_scopeId}><span${_scopeId}>${ssrInterpolate(nav.label)}</span>`);
              if (nav.description && !isRouteActive(nav.route)) {
                _push2(`<span class="text-xs font-normal text-slate-500"${_scopeId}>${ssrInterpolate(nav.description)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(Icons[nav.icon] ?? Icons.Circle), {
                  class: ["h-4 w-4", isRouteActive(nav.route) ? "text-white" : "text-slate-500"]
                }, null, 8, ["class"])),
                createVNode("div", { class: "flex flex-col" }, [
                  createVNode("span", null, toDisplayString(nav.label), 1),
                  nav.description && !isRouteActive(nav.route) ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-xs font-normal text-slate-500"
                  }, toDisplayString(nav.description), 1)) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="mt-auto rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 shadow-inner shadow-black/40"><p class="text-sm font-semibold text-white">Quick links</p><div class="mt-3 space-y-2"><!--[-->`);
      ssrRenderList(quickLinks, (link) => {
        _push(ssrRenderComponent(unref(Link), {
          key: link.label,
          href: _ctx.route(link.route),
          class: "flex items-center justify-between rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:border-rose-300 hover:text-white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)} `);
              _push2(ssrRenderComponent(Icons.ArrowUpRight, { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode(toDisplayString(link.label) + " ", 1),
                createVNode(Icons.ArrowUpRight, { class: "h-4 w-4" })
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></aside><div class="flex w-full flex-col lg:pl-0"><header class="sticky top-0 z-30 border-b border-white/15 bg-gradient-to-r from-[#eb008b] via-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30"><div class="flex items-center justify-between px-4 py-4 sm:px-8"><div class="flex items-center gap-3"><button class="rounded-xl border border-white/30 p-2 lg:hidden">`);
      _push(ssrRenderComponent(Icons.Menu, { class: "h-5 w-5 text-white" }, null, _parent));
      _push(`</button><div class="hidden lg:block"><p class="text-xs uppercase tracking-wide text-white/75">Currently viewing</p><h1 class="text-lg font-semibold text-white">${ssrInterpolate(currentNav.value?.label ?? "Overview")}</h1>`);
      if (currentNav.value?.description) {
        _push(`<p class="text-xs text-white/70">${ssrInterpolate(currentNav.value.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex flex-1 items-center justify-end gap-3"><div class="relative hidden max-w-sm flex-1 items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-3 py-2 text-sm text-white sm:flex">`);
      _push(ssrRenderComponent(Icons.Search, { class: "h-4 w-4 text-white/70" }, null, _parent));
      _push(`<input class="w-full bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none" placeholder="Search people, events, tokens" readonly><span class="rounded-lg border border-white/25 px-1.5 py-0.5 text-xs text-white/70">⌘K</span></div>`);
      _push(ssrRenderComponent(unref(Link), {
        class: "hidden rounded-2xl border border-white/25 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-black/30 hover:bg-white/10 sm:inline-flex",
        href: _ctx.route("enrolment.form"),
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Share parent form `);
          } else {
            return [
              createTextVNode(" Share parent form ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-sm font-semibold uppercase tracking-wide">${ssrInterpolate(initials.value)}</button>`);
      if (showUserMenu.value) {
        _push(`<div class="absolute right-4 top-16 w-64 rounded-2xl border border-white/20 bg-slate-900/95 p-4 text-white shadow-2xl"><p class="text-sm font-semibold text-white">${ssrInterpolate(unref(page).props.auth.user?.name)}</p><p class="text-xs text-white/70">${ssrInterpolate(unref(page).props.auth.user?.email)}</p><div class="mt-4 space-y-2 text-sm">`);
        _push(ssrRenderComponent(unref(Link), {
          class: "block rounded-xl px-3 py-2 text-white/90 hover:bg-white/10",
          href: _ctx.route("profile.edit")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Profile &amp; security `);
            } else {
              return [
                createTextVNode(" Profile & security ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          class: "block rounded-xl px-3 py-2 text-rose-400 hover:bg-rose-500/20",
          href: _ctx.route("logout"),
          method: "post",
          as: "button"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Log out `);
            } else {
              return [
                createTextVNode(" Log out ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></header><main class="flex-1 bg-slate-950/70 px-4 py-6 sm:px-8">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
      if (showMobileNav.value) {
        _push(`<div class="fixed inset-0 z-40 bg-slate-900/70 backdrop-blur"><div class="absolute left-0 top-0 h-full w-72 bg-slate-900 p-6 shadow-2xl"><div class="flex items-center justify-between"><div class="flex items-center">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("dashboard"),
          class: "text-xl font-bold text-white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Alive Youth `);
            } else {
              return [
                createTextVNode(" Alive Youth ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><button class="rounded-full border border-white/20 p-2 text-white">`);
        _push(ssrRenderComponent(Icons.X, { class: "h-4 w-4" }, null, _parent));
        _push(`</button></div><nav class="mt-6 space-y-2"><!--[-->`);
        ssrRenderList(filteredNavigation.value, (nav) => {
          _push(ssrRenderComponent(unref(Link), {
            key: `mobile-${nav.route}`,
            href: _ctx.route(nav.route),
            class: ["flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold", isRouteActive(nav.route) ? "bg-rose-500 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"],
            onClick: ($event) => showMobileNav.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(Icons[nav.icon] ?? Icons.Circle), { class: "h-4 w-4" }, null), _parent2, _scopeId);
                _push2(` ${ssrInterpolate(nav.label)}`);
              } else {
                return [
                  (openBlock(), createBlock(resolveDynamicComponent(Icons[nav.icon] ?? Icons.Circle), { class: "h-4 w-4" })),
                  createTextVNode(" " + toDisplayString(nav.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></nav></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(CommandPalette, {
        show: showCommand.value,
        onClose: ($event) => showCommand.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
